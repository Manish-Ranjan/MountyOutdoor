require("dotenv").config({})
const mongoose = require('mongoose')

module.exports = async () => {
    try {
        const conn = await mongoose.connect(process.env.mongoDevelopment, {
            useFindAndModify: false,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })

        console.log(`MongoDB connect ${conn.connection.host}`)

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

