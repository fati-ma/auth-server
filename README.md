# ACI

### Author: Fatima Atieh

## Setup

`npm i base-64 bcrypt cors dotenv express superagent jsonwebtoken mongoose morgan`

Add `MONGODB_URI` `PORT` `CLIENT_ID` `CLIENT_SECRET` `API_SERVER` in `.env` file

* `mongodb://localhost:27017/dbName`

Start mongodb using `sudo service mongod start` for windows

Start the server: `node index.js`


## Endpoints and Test

- GET: http://localhost:3000/users
- POST: http://localhost:3000/signup
- POST: http://localhost:3000/signin
- GET: http://localhost:3000/secret
- GET: http://localhost:3000/read
- POST: http://localhost:3000/add
- PUT: http://localhost:3000/change
- DELETE: http://localhost:3000/remove



## Basic  Authentication 

In `Postman` enter the following endpoint:

- GET: http://localhost:3000/users
to get all users in the DB

will response with the saved users in `results` array

Go to the `Body` and enter the JSON object containing `username` and `password`

- POST: http://localhost:3000/signup

then you will get a response with the `username` and hashed `password`

Then enter:

- POST: http://localhost:3000/signin

Go to `Authorization` and choose `Basic Auth`

and enter the username and password you signed up with

Then hit `send`


## Bearer  Authentication

In `Postman` enter the following endpoint:


- GET: http://localhost:3000/users
to get all users in the DB

will response with the saved users in `results` array

Go to the `Body` and enter the JSON object containing `username` and `password`

- POST: http://localhost:3000/signup

then you will get a response with the `username`, hashed `password` and a `token`

Then enter:

- POST: http://localhost:3000/signin

Go to `Authorization` and choose `Basic Auth`

and enter the username and password you signed up with

Then hit `send`

You will get a response with a new `token`

Copy this token and go to Authorization again

Choose `Bearer Token` and paste the token from the sign in process

- GET: http://localhost:3000/secret

will response with the `username` and `iat`


## ACL 

In `Postman` enter the following endpoint:

- GET: http://localhost:3000/users
to get all users in the DB

will response with the saved users in `results` array

Go to the `Body` and enter the JSON object containing `username`, `password` and `role`

- POST: http://localhost:3000/signup

then you will get a response with the `username`, hashed `password` and a `token`

Then enter:

- POST: http://localhost:3000/signin

Go to `Authorization` and choose `Basic Auth`

and enter the username and password you signed up with

Then hit `send`

You will get a response with a new `token`

Copy this token and go to Authorization again

Choose `Bearer Token` and paste the token from the sign in process

- GET: http://localhost:3000/secret

will response with the `username` and `iat` and `capabilities`

Supposing you entered the `"role":"user"` in the body, and this endpoint:
- POST: http://localhost:3000/add

you will get a response with `Access Denied!` as the user can not create/add the admin for example can do this

* You can find the roles and capabilities attached to them in `src/auth/models/users/users-collection.js`


