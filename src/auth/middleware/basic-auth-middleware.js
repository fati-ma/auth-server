const base64 = require('base-64');
const users = require('../models/users/users-collection.js');

module.exports = (req, res, next) => {

  if (!req.headers.authorization) {
    next('Invalid Login');
    return;
  }
  console.log("REQ HEADERS >>>", req.headers)
  let basicAuthHeader = req.headers.authorization.split(" ");
  if (basicAuthHeader[0] != "Basic") {
    return next('Invalid Login :(');

  }
  let basic = basicAuthHeader.pop();
  let [user, password] = base64.decode(basic).split(":");

  users.authenticateBasic(user, password).then(verified => {
    console.log('Verified >>>', verified)
    req.users = verified
    users.generateToken(verified).then(generatedToken => {
      req.token = generatedToken;
      next();
    })
    .catch(err => next('Invalid Token!'));
  })
  .catch(err => next("Invalid Login :("));
}