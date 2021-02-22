//Import JWT Middleware
const jwt = require('jsonwebtoken');

//Generate Token
const generateToken = (objects, timeframe) => jwt.sign(objects, 'secret', { expiresIn: timeframe });

//Function to verify token
function verifyToken(req, res, next){
   const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader  !== 'undefined'){
          const bearerToken = bearerHeader.split(' ')[1];
          req.token = bearerToken.split('"')[0];
          next();
     }else{
         res.sendStatus(403);
     }
}

module.exports = {
    generateToken, verifyToken
}