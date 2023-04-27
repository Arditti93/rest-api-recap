const { Router } = require("express")

const userRouter = Router()

//import controllers and middleware so we can call them in our endpoints defined below
const {registerUser, login } = require("./controllers") 
const {hashPass, comparePass} = require("../middelware")

//GET - On a GET method an endpoint should be returning static information or reading a database.
//POST - On a POST method, data should be sent in the http request to be used by the controller in some way (creating a database entry).
//PUT/PATCH - The PUT and PATCH methods handle update requests, for instance updating data in a database.
//DELETE - Fairly self-explanatory, data should be deleted on a DELETE method.

//dedfine our endpoints and set which http verb the endpoint is expecting when it recives at request 
userRouter.post("/users/register", hashPass, registerUser)

userRouter.post("/users/login", comparePass, login)




module.exports = userRouter