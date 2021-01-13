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
    console.log('__ Saved User Object__ ', userObj);
    console.log('Record >>>>', record);

    if (userObj.length == 0) {
      record.password = await bcrypt.hash(record.password, 5);
      console.log('Record >>>>', record);

      await this.create(record);
      return record;
    } else {
      console.log('This username already exists :D');
      return Promise.reject();
    }
  }

  async authenticateBasic(user, password) {
    let userObj = await this.get({ username: user });
    console.log('__User Object__ >>>>', userObj);
    const valid = await bcrypt.compare(password, userObj[0].password);
    console.log('Is valid? >>>>', valid);
    return valid ? userObj[0] : Promise.reject();
  }

  generateToken(user) {
    try{
      const token =  jwt.sign({ username: user.username }, SECRET);
      console.log('token in generateToken()',token);
      return token;
    }catch(err){
      console.log(err);
    }
  }

  async authenticateToken(token) {
    try {
      const tokenObject = jwt.verify(token, SECRET);
      console.log('__TOKEN OBJECT__', tokenObject);
      // const check = await this.get({ username: tokenObject.username });
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

}

module.exports = new User();