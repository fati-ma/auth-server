'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema({
  username: { type: String, required: true},
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['user', 'writer', 'admin', 'editor']}
});
module.exports = mongoose.model('schema', schema);