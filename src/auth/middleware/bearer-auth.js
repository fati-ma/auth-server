'use-strict';

const users = require('../models/users/users-collection.js');

module.exports = (req, res, next) => {

  if (!req.headers.authorization) {
    next('Invalid Login');
    return;
  } 
  else {
    const token = req.headers.authorization.split(' ').pop();
    console.log('__Bearer_TOKEN__', token);
    console.log('__Bearer_Auth__');
    users.authenticateToken(token).then((validUser) => {
      console.log('__Valid User__', validUser);
      req.user = validUser;
      next();
    })
      .catch(err => next(`Invalid Token !! -- ${err}`));

  }
};