const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        index: true
      },
      type: {
        type: String
      },
      toAddress: {
        type: String
      },
      amount: {
        type: String
      },
      amountActual: {
        type: String
      },
      txHash: {
        type: String,
        index: true
      },
      statusText: {
        type: String
      },
      status: {
        type: Number
      },
      blockNumber: {
        type: Number
      },
      lastBlockNumber: {
        type: Number
      },
      confirmation: {
        type: Number
      },
      mobiToken: {
        type: String
      },
      currency: {
        type: String
      },
      currentPrice: {
        type: String
      },
      tokenLockedUntil: {
        type: Date
      },
      stageName: {
        type: String
      },
      amountInUSD: {
        type: String
      },
      vout: {
        type: Number,
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
    
})

module.exports = Transaction = mongoose.model('transaction',TransactionSchema)
