'use strict';
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
// const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const router = require('../src/auth/router.js');
const router2 = require('../src/auth/extra-routes.js');
const errorHandler = require('./middleware/500.js');

app.use(express.static('./public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/', router);
app.use('/', router2);

app.get('/error', (req, res) => {
    throw new Error('a test error');
});

app.use(errorHandler);

module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Listening on ${PORT}`);
        })
    }
};