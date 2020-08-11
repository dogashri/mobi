const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config')
const {check,validationResult} = require('express-validator');
const User = require('../../models/User');
const Jwt = require('jsonwebtoken');

// Route    POST api/users
// disc     Register user
// Ascess   Public

router.post('/',[
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password of more than 6 characters').isLength({min:6})
],
async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email,password} = req.body

    try {
        // see if user already exist
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({errors:[{msg:'User already exist'}]})
        }
        user = new User({
            email,
            password
        })
        // encrypt the password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password,salt)
        await user.save()

        // reurn jsonwebtoken
        const payload = {
            user:{
                id:user.id
            }
        }
        Jwt.sign(payload,config.get('jwtToken'),
        {expiresIn:360000},
        (err,token)=>{
            if(err)throw err;
            res.json({token})})

        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
        
    }

    
    console.log(req.body)
    })


module.exports = router