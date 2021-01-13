'use strict';

module.exports = (capability) => {
    // capability = create | update | delete | read (this will be from the route)
  
    return (req, res, next) => {

      try {
        console.log('req.user', req.user);
        if (req.user.capabilities.includes(capability)) {
          next();
        } else {
          res.status(403).send('Access Denied!');
        }
      } catch (e) {
        res.status(403).send('error',e);
      }
    };
  };
  