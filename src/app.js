const express = require("express")
const database = require("./config/db") 
const  cookieparser = require("cookie-parser")
const app = express();



app.use(express.json())
app.use(cookieparser())

const authRoutes = require("./routes/auth")
const profileRoutes = require("./routes/profile")
const requestRouter =  require("./routes/request")

app.use("/" ,authRoutes)
app.use("/" ,profileRoutes)
app.use("/" ,requestRouter)

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



