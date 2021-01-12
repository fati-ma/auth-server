'use strict';

const jwt = require('jsonwebtoken');
const schema = require('../users/users-schema.js');
const bcrypt = require('bcrypt');
const Model = require('../mongo-model.js');
const SECRET = process.env.SECRET || 'thisisasecret';

class User extends Model {
  constructor() {
    super(schema);
  }
  async save(record) {
    let userObj = await this.get({ username: record.username });
    console.log('User object >>>>', userObj);
    console.log('Record >>>>', record);

    if (userObj.length == 0) {
      record.password = await bcrypt.hash(record.password, 5);
      console.log('Record >>>>', record);

      await this.create(record);
      return record;
    } else {
      console.log('Username already exists :D');
      return Promise.reject();
    }
  }

  async authenticateBasic(user, password) {
    let record= await this.get({username:user});
     if (record){
         await bcrypt.compare(password,record[0].password);
         return record[0];
     }
     return Promise.reject();
    }
  
 
  async generateToken(user) {
    const token = await jwt.sign({ username: user.username }, SECRET);
    return token;
  }
}
module.exports = new User();