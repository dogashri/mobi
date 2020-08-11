const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const adminAscess = require('../middleware/adminAuth');
const Transaction = require('../../models/Transaction');



// route     GET api/transaction
// disc      get all transaction
// ascess    public

router.get('/alltransaction', async(req,res)=>{
    try {
        const transaction = await Transaction.find().populate('user',['linkSendTime','ethAddress','btcAddress','count','forgottenPasswordTime','forgotPasswordOtp','createdAt'])
        res.json(transaction)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
        
    }
})

module.exports=router