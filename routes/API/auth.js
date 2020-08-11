
const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth')
const User = require('../../models/User');
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')
const crypto = require('crypto');
const admin = require('./admin')


// admin ascess
router.use('/admin',auth,adminAuth,admin)

// Route    POST api/users
// disc     Register user
// Ascess   Public

router.post('/register',[
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
        jwt.sign(payload,config.get('jwtToken'),
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

// Route   GET api/auth
// disc    test roue
// ascess  public

router.get('/',auth,async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
        
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
        
    }
})

// Route    POST api/auth
// disc     authenticate the admin and get the token
// Ascess   Private

router.post('/login',[
    check('email','Please include a valid email').isEmail(),
    check('password','Password is required').exists()
],
async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email,password} = req.body

    try {
    
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({errors:[{msg:'invalid credentials'}]})
        }
        
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({errors:[{msg:'invalid credentials'}]})
        }

        // reurn jsonwebtoken
        const payload = {
            user:{
                id:user.id,
                email:user.email,
                random:crypto.randomBytes(20).toString('hex')
            }
        }
        console.log(payload)
        jwt.sign(payload,config.get('jwtToken'),
        {expiresIn:360000},
        (err,token)=>{
            if(err)throw err;
            res.json({token})
        }
    )

        
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
        
    }

    
    console.log(req.body)
    })

module.exports = router