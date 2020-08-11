const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    linkSendTime: {
        type: String,
        default: new Date().getTime()
      },
      ethAddress: {
        type: String,
        unique: true
      },
      btcAddress: {
        type: String,
        unique: true
      },
      count: {
        type: Number
      },
      forgottenPasswordTime: {
        type: String,
        default: new Date().getTime()
      },
      forgotPasswordOtp: {
        type: Number
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
    
})

module.exports = User = mongoose.model('user',UserSchema)