# ACI

### Author: Fatima Atieh

## Setup

`npm i base-64 bcrypt cors dotenv express superagent jsonwebtoken mongoose morgan`

Add `MONGODB_URI` `PORT` `CLIENT_ID` `CLIENT_SECRET` `API_SERVER` in `.env` file

* `mongodb://localhost:27017/dbName`

Start mongodb using `sudo service mongod start` for windows

Start the server: `node index.js`


## Endpoints

- POST: http://localhost:3000/signup
- POST: http://localhost:3000/signin
- GET: http://localhost:3000/secret
- GET: http://localhost:3000/read
- GET: http://localhost:3000/create
- GET: http://localhost:3000/update
- GET: http://localhost:3000/delete


## Test 

In `Postman` enter the following endpoints:

- POST: http://localhost:3000/signup
- POST: http://localhost:3000/signin
- GET: http://localhost:3000/users


