'use strict';

const jwt = require('jsonwebtoken');
const userModel = require('../users/users-schema.js');
const bcrypt = require('bcrypt');
const Model = require('../mongo-model.js');
const SECRET = process.env.SECRET;

class User extends Model {
  constructor() {
    super(userModel);
  }
  async save(record) {
    let userObj = await this.get({ username: record.username });
    console.log('The user object >>>>', userObj);
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
    console.log('The user object >>>>', userObj);
    const valid = await bcrypt.compare(password, userObj[0].password);
    console.log('Is valid >>>>', valid);
    return valid ? userObj[0] : Promise.reject();
  }

  generateToken(user) {
    const token = jwt.sign({ username: user.username }, SECRET);
    return token;
  }
}

module.exports = new User();