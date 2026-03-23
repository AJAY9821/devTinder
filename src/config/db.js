const mongoose = require("mongoose")

const database = async () => {
    try {
        await mongoose.connect("mongodb+srv://learnNode:Rp6sKUBq6YJNcVqD@learnnode.6eepgzc.mongodb.net/tinder")
 

    } catch (err) {
        console.log("MongoDB connection error:", err.message)
        throw err;
    }
}

module.exports = database