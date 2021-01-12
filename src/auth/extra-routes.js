const express = require('express');

const router = express.Router();
// const users = require('../models/users/users-model.js');
const bearerMiddleware = require('./middleware/bearer-auth.js');

router.get('/secret', bearerMiddleware, (req, res) => {
  res.json(req.user);
});

module.exports = router;