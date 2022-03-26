// require() are imports
const express = require("express")
const cors = require("cors") // middleware to prevents malicious frontend software (ex. API) to access backend
const {v4} = require("uuid")
const bodyParser = require("body-parser")

const app = express() // want to create an express app
app.use(cors()) // want to use cors, no parameters: allow any frontend to use access backend
app.use(bodyParser.json()) // for data formatting. 
// Ex: have data as jpeg images, but file is png, bodyParser.json() takes file read as jpeg so iphone can read it

app.get("/", (req, res) => { // just to check if backend is running
    return res.send("Backend Running")
})

app.post("/nicole", async(req, res) => {
    const {name} = req.body
    return res.send(name)
})


















// function on high level does nothing but is necessary because does things in low level
app.listen(3000,() => { //3000 would be the port we're using
    console.log("Running on port 3000")
})