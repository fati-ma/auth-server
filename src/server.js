'use strict';
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const router = require('../src/auth/router.js');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(router);


module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Listening on ${PORT}`);
        })
    }
};