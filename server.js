const express = require('express');
const connectDB = require('./config/db')

const App = express()

// connecting to the database

connectDB()

// init middlewere
App.use(express.json({exended:false}))
App.get('/',(req,res)=>res.send('API is Running here'))

// define routes
App.use('/api/users',require('./routes/API/users'))
App.use('/api/auth',require('./routes/API/auth'))
App.use('/api/transaction',require('./routes/API/transaction'))

const PORT = process.env.PORT || 5000

App.listen(PORT,()=>console.log(`Server started on port: ${PORT}`))