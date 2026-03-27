const mongoose = require("mongoose");
const User = require("../model/user")

const connectionRqstSchema = new mongoose.Schema ({
    fromUserid:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },

    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
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

connectionRqstSchema.pre("save", function (){

  const connectionRqst =  this;

  if(connectionRqst.fromUserid.equals(connectionRqst.toUserId)){
    throw new Error("Cannot send connection rqst to himself")
  }
    
})

const connectionRqst = new mongoose.model("connectionRequest",connectionRqstSchema)

module.exports = connectionRqst