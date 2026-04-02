const User = require("../model/user");
const jwt = require("jsonwebtoken")

const userAuth = async(req,res,next) => {
    try{
         const {token } = req.cookies;

         if(!token){
           return res.status(401).send("Please Login")
         }

    const verifytoken = await jwt.verify(token,process.env.JWT_SECRET)

    const { _id } = verifytoken

     const user = await User.findById(_id) 

     if(!user){
        throw new Error("User not FOund")
     }
     req.user = user

     next()

    } catch (err){
        res.status(400).send("message : " + err.message)
    }
   

    }


    module.exports = {
        userAuth
    }



    
