# Basic Autorization

### Author: Fatima Atieh


## Setup

Add `PORT` `SECRET` and `MONGODB_URL` in your `.env` file

Install these dependencies 
- base-64
- bcrypt
- express
- dotenv
- jsonwebtoken
- mongoose

Start the app using `node index.js`
Then on Postman enter the following endpoints:

- POST: http://localhost:4000/signup
- POST: http://localhost:4000/signin
- GET: http://localhost:4000/users