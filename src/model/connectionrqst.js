const mongoose = require("mongoose")

const connectionRqstSchema = new mongoose.Schema ({
    fromUserid:{
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },

    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },

    status:{
        type: String,
        enum:{
            values:["ignore","interested","accepted","rejected"],
            message: `{valuses} is incorrect type`

        },
        required:true
    }



},{timestamps:true})

const connectionRqst = new mongoose.model("connectionRequest",connectionRqstSchema)

module.exports = connectionRqst