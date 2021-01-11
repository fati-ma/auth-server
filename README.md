# OAuth

### Author: Fatima Atieh

## Setup

`npm i base-64 bcrypt cors dotenv express jsonwebtoken mongoose morgan`

Add `MONGODB_URI` `PORT` `CLIENT_ID` `CLIENT_SECRET` `API_SERVER` in `.env` file

Start mongodb using `sudo service mongod start` for windows

Start the server: `node index.js'


## Endpoints

`http://localhost:3000/`


## Test 

In the browser write ``http://localhost:3000/` the click `Login`, after that allow authorization.
Then you will get something similar to this: 
```
{
"userinfo": [
{
"_id": "5ffcd9XXXXXXXXXX",
"username": "fati-ma",
"password": "$2b$05$/2d2HMYmWezbl3yiv0PciOoaTQdY2.3CcXXXXXXXXXXX",
"__v": 0
}
],
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTA0MDcxNTd9.4luwu6AXXXXXXXXXXXXXXXXXXX"
}
```

