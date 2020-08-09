const express = require('express');

const App = express()

App.get('/',(req,res)=>res.send('API is Running'))

const PORT = process.env.PORT || 5000

App.listen(PORT,()=>console.log(`Server started on port: ${PORT}`))