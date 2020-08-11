const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){
    // get token from the header
    const token = req.header('x-auth-token')

    // check for token
    if(!token){
        return res.status(401).json({msg:'no-token authorization denied'})
    }

    // verify the token
    try {
        const decoded  = jwt.verify(token,config.get('jwtToken'))
        req.user = decoded.user
        console.log(req.user)
        console.log('this is req.user')
        next()
        
    } catch (err) {
        res.status(401).json({msg:'token is not valid'})
        
    }
}