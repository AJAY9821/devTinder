const mongoose = require("mongoose")

console.log(process.env.DB_CONNECTION_STRING)

const database = async () => {
    try {
        console.log(process.env.DB_CONNECTION_STRING)
        await mongoose.connect(process.env.DB_CONNECTION_STRING)
 

    } catch (err) {
        console.log("MongoDB connection error:", err.message)
        throw err;
    }
}

module.exports = database