'use strict';

const express = require('express');

const router = express.Router();
const users = require('../auth/models/users/users-collection.js');
const basicAuth = require('./middleware/basic-auth-middleware.js');
const oauth = require('../auth/middleware/oauth-middleware.js');

router.post('/signup', (req, res) => {
  console.log(req.body);
  users.save(req.body).then((user) => {
    const token = users.generateToken(user);
    res.json({ token });
  });
});

router.get('/oauth', oauth, (req, res) => {
  res.json({ userinfo: req.user, token: req.token });
});

router.post('/signin', basicAuth, (req, res) => {
  res.json({ token: req.token });
});


router.get('/users', (req, res) => {
  users.get().then((results) => {
    console.log(results);
    res.json({ results: results });
  });
});


module.exports = router;