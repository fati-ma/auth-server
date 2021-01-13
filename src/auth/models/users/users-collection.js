'use strict';

const jwt = require('jsonwebtoken');
const schema = require('../users/users-schema.js');
const bcrypt = require('bcrypt');
const Model = require('../mongo-model.js');
const SECRET = process.env.SECRET;

class User extends Model {
  constructor() {
    super(schema);
  }
  async save(record) {
    let userObj = await this.get({ username: record.username });
    console.log('__User Object__ ', userObj);
    console.log('Record >>>>', record);

    if (userObj.length == 0) {
      record.password = await bcrypt.hash(record.password, 5);
      console.log('Record >>>>', record);

      await this.create(record);
      return record;
    } else {
      console.log('This username exists');
      return Promise.reject();
    }
  }

  async authenticateBasic(user, password) {
    let userObj = await this.get({ username: user });
    console.log('__User Object__ ', userObj);
    const valid = await bcrypt.compare(password, userObj[0].password);
    console.log('Is valid? >>>>', valid);
    return valid ? userObj[0] : Promise.reject();
  }

  //send the capabilities
  generateToken(user) {
    const token = jwt.sign({ username: user.username, capabilities: this.capabilities(user) }, SECRET);
    console.log('Capabilities >>', this.capabilities(user));
    return token;
  }

  async authenticateToken(token) {
    try {
      const tokenObject = jwt.verify(token, SECRET);
      console.log('__TOKEN OBJECT__', tokenObject);
      if (tokenObject.username) {
        console.log('Authentic user');
        return Promise.resolve(tokenObject);
      } else {
        return Promise.reject();
      }
    } catch (e) {
      console.log('Invalid user');
      return Promise.reject(e);
    }
  }

  capabilities(user) {
    console.log('capabilities executed');
    if (user.role === 'admin') {
      return ['read', 'create', 'update', 'delete'];
    }
    if (user.role === 'user') {
      return ['read'];
    }
    if (user.role === 'writer') {
      return ['read', 'create'];
    }
    if (user.role === 'editor') {
      return ['read', 'create', 'update'];
    }
  }

}

module.exports = new User();