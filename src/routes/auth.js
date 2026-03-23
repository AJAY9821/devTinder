const express = require("express")
const authRoutes = express.Router()
const bcrypt = require("bcrypt")
const validateSignUpAndDate = require("../util/validator")
const User = require("../model/user")


authRoutes.post("/signup", async (req,res) => {

    try{

        validateSignUpAndDate(req)

        const { password, firstName, lastName, emailId } = req.body

        const passwordHashing = await bcrypt.hash(password,10)

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHashing
        })

        await user.save()

        res.send("Data added successfully")

    }catch(error){
        res.status(400).json({
            message:"data not added",
            error: error.message
        })
    }
})


authRoutes.post("/login", async (req, res) => {
  try {
    // console.log("Hit");

    const { emailId , password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    // console.log(user);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (isPassValid) {
      const token = await user.getJWT();
      res.cookie("token", token);

      res.send("Login Success");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (e) {
    res.status(401).send("Something went wrong: " +  e.message);
  }
});

authRoutes.post("/logout", async(req,res) => {
    try{
         res.cookie("token" , null ,{
        expires: new Date(Date.now()) })

        res.send("logout successfully")
   
    }catch(err){
        throw new Error ("something went wrong " + err.message)
    }
   

})
module.exports = authRoutes