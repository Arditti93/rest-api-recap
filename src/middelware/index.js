// import the bcrypt libary
const bcrypt = require("bcrypt")

// import out model so we can use sequilize methods to interact with our database
const User = require("../users/model")

const hashPass = async (req, res, next) => {
    try {
        // the password thats passed in the body of the request is hashed using the bcrypt .hash method
        // .hash takes two aurguments the plain text password and the number of salt rounds
        // salt rounds is how complex the hash of the password is
        // it's a trade off between secuirty and useabilty

        //update the password in the body with the hashed version using the .hash method
        console.log(req.body.password) 
        req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS))
        next() // Middlware needs to be told to move on to the next step. so we call the next function once everything has 
        // been completed successfully in the try block
    } catch (error) {
        // sends a response with any errors that might have occurred in the try block
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

const comparePass = async (req, res, next) => {
    try {
        console.log(req.body)
        // create a new object called user to store the users credentails that are retreaved from the database using the .findOne() method
        // we add the user object to the request object so we can access it in the controller
        req.user = await User.findOne({where: {username: req.body.username}})
        // Create a new error if no user has been found and throw it to the catch block
        if (req.user === null) {
            throw new Error ("User doesn't exist")
        }
        // req.body.password = plain text password
        // req.user.password = hashed password loaded from the database in line 20
        const comparePassword = await bcrypt.compare(req.body.password, req.user.password)
        if (!comparePassword) { // if the .compare() method returnes false - the passwords don't mactch and create an error and throw
            // it to the catch block
            throw new Error ("sorry your password or username is incorrect")
        } 

        next() // Middlware needs to be told to move on to the next step. so we call the next function once everything has 
        // been completed successfully in the try block
    } catch (error) {
        // sends a response with any errors that might have occurred in the try block
        res.status(501).json({errorMessage: error.message, error: error})
    }
}

// export middleare functions 
module.exports = {
    hashPass,
    comparePass
}