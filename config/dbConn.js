const mongoose = require('mongoose')


const dbConn = async () => {
    await mongoose.connect(
        process.env.DATABASE_URI,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    )
}

module.exports = dbConn