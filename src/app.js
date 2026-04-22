const express = require("express")
const database = require("./config/db") 
const  cookieparser = require("cookie-parser")
const app = express();
const Cors = require("cors")
const http = require("http")
const Chatrouter = require("./routes/chat")

const initaialSocket = require("./util/socket")



require('dotenv').config() 

//require("./util/cronJobs")




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
app.use("/", Chatrouter)


const server  = http.createServer(app)
initaialSocket(server)





database()
.then(() =>{
    console.log("Databse connected succefully")
    server.listen(3000, () => {
    console.log("Server is running on port 3000...")
})
})
.catch((err) =>{
    console.log("database cannot be connected")
})

require("./util/cronJobs")



