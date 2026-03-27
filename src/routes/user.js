const express = require("express")
const { model } = require("mongoose")

const { userAuth } = require("../middleware/auth")
const ConnectionRqst = require("../model/connectionrqst")
const User = require("../model/user")

const userRouter = express.Router()

userRouter.get("/user/request/receive", userAuth , async(req,res) => {
    try{

    
    const loggedInuser = req.user;

    const connectionRqst = await ConnectionRqst.find({
        toUserId:loggedInuser._id,
        status:"interested"
    }).populate(
        "fromUserid",
        "firstName lastName age skills gender about"
    )

    res.json({
        message:"data fetch succefully",
        data:connectionRqst 
    })

    } catch(e){
        res.status(400).json({
        message: "Something went wrong",
        error: e.message
    })
    }  
})
userRouter.get("/user/connection", userAuth , async(req,res) => {
    try{
         const loggedInuser = req.user;

    const connectionRqst = await ConnectionRqst.find({

        $or:[
            {fromUserid:loggedInuser._id,status:"accepted"},
            {toUserId:loggedInuser._id,status:"accepted"}
        ]
    }).populate("fromUserid", "firstName lastName age gender about photoUrl Skills")
      .populate("toUserId", "firstName lastName age gender about photoUrl Skills")

    const data = connectionRqst.map((row) => {
        if(row.fromUserid._id.toString() === loggedInuser._id.toString()){
           return row.toUserId
        }
        return row.fromUserid
    })
        

    res.json({data})

    }catch(e){
        res.status(400).send("Something wentwrong:" + e.message)
    }
})


userRouter.get("/user/feed", userAuth, async (req,res) => {

    try{

    const loggedInuser = req.user
    const page = parseInt(req.query.page)|| 1 //suppose user not give page.no we assume 1
    let limit= parseInt(req.query.limit) || 10 //suppose user not give limit we assume 10
    limit = limit>50?50 : limit
    const skip = (page-1)*limit


    const connectionRqst = await ConnectionRqst.find({
        $or:[{fromUserid:loggedInuser._id},
             {toUserId:loggedInuser._id}
        ]
    }).select("fromUserid toUserId")

    const hiddenUserFromFeed = new Set();

    connectionRqst.forEach(req => {
        hiddenUserFromFeed.add(req.fromUserid.toString()),
        hiddenUserFromFeed.add(req.toUserId.toString())
    })

    const user = await User.find({
        $and:[
            {_id:{$nin:Array.from(hiddenUserFromFeed)}},
            {_id:{$ne:loggedInuser._id}}
        ]
    }).select("firstName lastName age gender about photoUrl Skills" ).skip(skip).limit(limit)
     
    res.send(user)
   }catch(e){
    res.status(400).json({
        message:"something went Wrong: " + e.message
    })
   }
})
    
    

module.exports= userRouter