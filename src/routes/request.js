const express  = require("express")
const { userAuth } = require("../middleware/auth")
const requestRouter = express.Router()
const ConnectionRqst = require("../model/connectionrqst") 
const User = require("../model/user")


requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res) =>{
    try{
    const fromUserid = req.user._id
    const toUserId = req.params.toUserId.trim()
    const status = req.params.status

    const isAllowedRqst =  ["interested", "ignore"]

    if(!isAllowedRqst.includes(status)){
        return res.status(400).json({
            message: "invalid status Type"
        })
    }

    const toUser = await User.findById(toUserId)
    
    if(!toUser){
        return res.status(400).json({
            message: " User not found Whom you want to send Rqst"
        })
    }

    const existingConnectionRqst = await ConnectionRqst.findOne({
        $or:[
            {fromUserid,toUserId},
            {fromUserid:toUserId,toUserId:fromUserid}
        ]
    })

    if(existingConnectionRqst){
        return res.status(400).json({
            message:"connection request already exist"
        })
    }

    const connectionRqst = new ConnectionRqst ({
        fromUserid,
        toUserId,
        status
    })

    const data = await connectionRqst.save()
    res.json({
        message:"connection rqst sent successfully",
        data,
    })
    }catch(e){
        res.status(400).send("something went wrong: " + e.message)
    }
    



   
})

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req,res) =>{
    try{
    const loggedInuser = req.user
    const {status , requestId} = req.params

    const isAllowedRqst  = ["accepted","rejected"]

    if(!isAllowedRqst.includes(status)){
        return res.status(400).json({
            message:"not Allowed that request"
        })
    }

    const connectionRqst = await ConnectionRqst.findOne({
        _id : requestId,
        toUserId:loggedInuser._id,
        status: "interested"
    })

    if(!connectionRqst){
        return res.status(400).json({
            message: "Connection request not found"
        })
    }

    connectionRqst.status = status

    const data = await connectionRqst.save()

    res.json({message: "Request " + status,data});

}catch(e){
    res.status(400).json({
        message: "Something went wrong",
        error: e.message
    })
}



})


module.exports = requestRouter