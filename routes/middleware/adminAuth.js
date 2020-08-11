module.exports = function(req,res,next){
    if(req.user.email === 'abc3@gmail.com'){
        next()
    }else{
        res.status(500).send('ascess denied')
    }
}