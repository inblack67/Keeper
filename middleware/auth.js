const jwt = require('jsonwebtoken');


module.exports = (req,res,next) => {

  const token = req.header('x-auth-jwt');

  // no token whatsoever
  if(!token)
  {
    return res.status(401).json({ success: false, msg: 'No token, access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;    // gives usersID from db
    next();
  } 
  
  catch (error) {
    return res.status(401).json({ success: false, msg:'Invalid Token'})
  }
}