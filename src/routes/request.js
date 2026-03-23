const express  = require("express")
const { userAuth } = require("../middleware/auth")
const requestRouter = express.Router()
const ConnectionRqst = require("../model/connectionrqst") 

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res) =>{
    try{
    const fromUserid = req.user._id
    const toUserId = req.params.toUserId
    const status = req.params.status

    const isAllowedRqst =  ["interested", "ignore"]

    if(!isAllowedRqst.includes(status)){
        return res.status(400).json({
            message: "invalid status Type"
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


module.exports = requestRouter