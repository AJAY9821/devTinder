const express = require("express")
const database = require("./config/db") 
const  cookieparser = require("cookie-parser")
const app = express();
const Cors = require("cors")


require('dotenv').config() 



app.use(express.json())
app.use(cookieparser())
app.use(Cors({
    origin:"http://localhost:5173",
    credentials:true
}))

const authRoutes = require("./routes/auth")
const profileRoutes = require("./routes/profile")
const requestRouter =  require("./routes/request")
const userRouter = require("./routes/user")

app.use("/" ,authRoutes)
app.use("/" ,profileRoutes)
app.use("/" ,requestRouter)
app.use("/" ,userRouter)

console.log("Hey")

database()
.then(() =>{
    console.log("Databse connected succefully")
    app.listen(3000, () => {
    console.log("Server is running on port 3000...")
})
})
.catch((err) =>{
    console.log("database cannot be connected")
})



