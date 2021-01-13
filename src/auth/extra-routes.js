const express = require('express');

const router = express.Router();
const bearerMiddleware = require('./middleware/bearer-auth.js');
const permissions = require('./middleware/authorize.js');

router.get('/secret', bearerMiddleware, (req, res) => {
  res.json(req.user);
});

router.get('/read', bearerMiddleware, permissions('read'), (req, res) => {
  res.status(200).send('ACCESSED!: you can access this route if you have the READ capability!! /read worked');
});
router.post('/add', bearerMiddleware, permissions('create'), (req, res) => {
  res.status(200).send('ACCESSED!: you can access this route if you have the CREATE capability!! /create worked');
});
router.put('/change', bearerMiddleware, permissions('update'), (req, res) => {
  res.status(200).send('ACCESSED!: you can access this route if you have the UPDATE capability!! /update worked');
});
router.delete('/remove', bearerMiddleware, permissions('delete'), (req, res) => {
  res.status(200).send('ACCESSED!: you can access this route if you have the DELETE capability!! /delete worked');
});

module.exports = router;