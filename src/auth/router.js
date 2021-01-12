'use strict';

const express = require('express');

const router = express.Router();
const users = require('../auth/models/users/users-collection.js');
const basicAuth = require('./middleware/basic-auth-middleware.js');

router.post('/signup', (req, res) => {
  console.log('Username >>>',req.body.username,' Password >>>',req.body.password)
    users.save(req.body)
    .then(user=>{
        users.generateToken(user).then(result=>{
            console.log('TOKEN >>>',result);
            res.status(200).send(result);
        }).catch(err=>next('Invalid Signup'))
    }).catch(err=>res.status(403).send('Creating user error!!'));
});


router.post('/signin', basicAuth, (req, res) => {
  res.set('auth',req.token);
    res.cookie('token',req.token);
    res.status(200).send({token:req.token,user:req.user});
});


router.get('/users', (req, res) => {
  users.get().then((results) => {
    console.log(results);
    res.json({ results: results });
  });
});


module.exports = router;