'use-strict';

const users = require('../models/users/users-collection.js');
module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login');
  } else {

    try {
      const token = req.headers.authorization.split(' ').pop();
      console.log('__TOKEN__', token);
      const validUser = await users.authenticateToken(token);
      req.user = validUser;
      next();
    } catch (error) {
      next('Invalid Login');
    }
  }
};