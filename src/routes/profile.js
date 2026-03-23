const express = require("express")
const profileRoutes = express.Router()
const {userAuth} = require("../middleware/auth")
const {validateEditProfileData }= require("../util/validator")



profileRoutes.get("/profile/view", userAuth, async (req,res) =>{
    try{
    const user = req.user
     
    res.send(user)
    }catch(err){
        res.status(400).send("Error: " + err.message)

    }


})

profileRoutes.patch("/profile/edit" , userAuth, async(req,res) =>{
    try{
    const isvalid = validateEditProfileData(req)
    if(!isvalid){
        throw new Error("Invalid edit request")
    }
    const loggedInuser = req.user // this give me logged in user which i taken in auth.middleware through userauth
     Object.keys(req.body).forEach(key => {
            loggedInuser[key] = req.body[key];
        });

   // Object.keys(req.body).forEach(key => {loggedInuser[key] = req.body[key]})
    await loggedInuser.save()
    res.send(`${loggedInuser.firstName}, your profile edit successfully`)
    }catch(err){
        res.status(400).send("ERROR: " + err.message)

    }
    
})

module.exports = profileRoutes
