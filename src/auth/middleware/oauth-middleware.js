'use strict';

require('dotenv').config();
const superagent = require('superagent');
const users = require('../models/users/users-collection.js');

// 2. Users are redirected back to your site by GitHub
// POST https://github.com/login/oauth/access_token

// we got it from docs, it's used to exchange the code for a token
const tokenServerUrl = 'https://github.com/login/oauth/access_token';

// we got it from docs, it's used to get the user info by passing the token from the tokenserver
const remoteAPI = 'https://api.github.com/user';

// we get them from the oauth app we created on GH
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_SERVER = process.env.API_SERVER; // mylink/outh (redirect url)

module.exports = async (req, res, next) => {
    // 1. get the code from the query 
    const code = req.query.code;
    console.log('1. CODE', code);
    // 2. get token 
    const access_token = await exchangeCodeForToken(code);
    console.log('2. TOKEN', access_token);
    // 3. get user object by the token
    const remoteUser = await getRemoteUserInfo(access_token);
    console.log('3. REMOTE USER \n', remoteUser);

    const [user, token] = await getUser(remoteUser);
    console.log('4. USER & TOKEN', user, token);
    req.user = user;
    req.token = token;
    next();
};

// Send the code to GH for Token
async function exchangeCodeForToken(code) {
    // tokenUrl
    const tokenResponse = await superagent.post(tokenServerUrl).send({
        code: code, 
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: API_SERVER,
    });
    return tokenResponse.body.access_token; 
}
// we will get user info from GH by providing the access_token
async function getRemoteUserInfo(token) {
    const userResponse = await superagent
        .get(remoteAPI)
        .set('Authorization', `token ${token}`)
        .set('user-agent', 'express-app');

    return userResponse.body; 
}
// save the remote user to the database
async function getUser(remoteUser) {
    const record = {
        username: remoteUser.login,
        password: 'thisisthepassword', //we can write here anything because it will be hashed
    };
    const check = await users.get({ username: record.username });
    if (check.length > 0) {
        console.log('Already existing username');
        const user = check;
        const token = users.generateToken(user);
        return [user, token];
    } else {
        console.log('save new user');
        const user = await users.save(record);
        const token = users.generateToken(user);
        return [user, token];
    }
}