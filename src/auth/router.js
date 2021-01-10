'use strict';

const express = require('express');

const router = express.Router();
const users = require('../auth/models/users/users-collection.js');
const basicAuth = require('./middleware/basic-auth-middleware.js');

router.post('/signup', (req, res) => {
  console.log(req.body);
  users.save(req.body).then((user) => {
    res.json(user);
  //  users.generateToken(user).then(result=> {
  //           res.status(200).send(result);
  //       });
    }).catch(e=> res.status(403).send(e));
  });
// });

router.post('/signin', basicAuth, (req, res) => {
  // users.authenticate(req.data[0], req.data[1]).then(record => {
  //   res.json({ token: req.token, user: record });
  res.json({ token: req.token });
});
// });

router.get('/users', (req, res) => {
  users.get().then((results) => {
    console.log(results);
    res.json({ results: results });
  });
});


module.exports = router;