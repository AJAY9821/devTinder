const express = require("express")

const app = express()

app.use("/about",(req,res) =>{
    res.send("about page")
})

app.use("/home",(req,res) =>{
    res.send("home page")
})

app.use("/about",(req,res) =>{
    res.send("about page")
})


app.use((req,res) => {
    res.send("Hello from the server")

});


app.listen(3000, () => {
    console.log("Server is running on port 3000...")
})