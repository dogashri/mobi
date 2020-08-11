const mongoose = require('mongoose')

const config = require('config');

const db = config.get('mongoURI');

const connectDB = async()=>{
    try {
        await mongoose.connect(db,{ useNewUrlParser: true })

        console.log('mongoDB is connected now.........')
    } catch (err) {
        console.error(err.message)

        // exit with a failure case
        process.exit(1)
        
    }
}

module.exports = connectDB