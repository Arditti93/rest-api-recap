// LIBARYS FOR REST API 
//npm init -y 
//npm i sequelize
//nmp i express
//npm i dotenv

//PASSWORD HASHING LIBARY
// npm i bcrypt 

//LIBARY FOR GENERATING JWT TOKENS
//npm i jsonwebtoken

//SEVER START COMMAND
//node src/server.js

// ---------------------- \\


require("dotenv").config()
const express = require("express")
// either set the port from the envrioment varibles OR use 5002
const port = process.env.PORT || 5002  

//Server has access to our endpoints in our userRoutes file so it can handle requests appropriately
const userRouter = require("./users/routes")

const User = require("./users/model")

//call and define express so we can call server operations
const app = express() 
//Server is expecting everything in JSON in the req.body and will return response's as JSON
app.use(express.json()) 

// sync our model
const syncTables = () => {
    User.sync()
} 

//Server has access to our endpoints in our userRoutes file so it can handle requests appropriately
app.use(userRouter)

//endpoint to check if our REST API server is working once its deployed
app.get("/health", (req, res) => {
    res.status(200).json({message: "api is working"})
}) 

//Server is running on port 5002
app.listen(port, () => {
    syncTables()
    console.log(`Server is running on port ${port}`)
})