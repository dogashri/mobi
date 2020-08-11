const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Transaction = require('../../models/Transaction');
const User = require('../../models/User');
const { check, validationResult } = require("express-validator/check");
const request=require('request');
const config=require('config');


// route     GET api/transaction
// disc      get all transaction
// ascess    public

router.get('/',async(req,res)=>{
    try {
        const transaction = await Transaction.find().populate('user',['linkSendTime','ethAddress','btcAddress','count','forgottenPasswordTime','forgotPasswordOtp','createdAt'])
        res.json(transaction)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
        
    }
})

module.exports=router