// import out model so we can use sequilize methods to interact with our database
const  User = require ("./model") 

// EXAMPLE REQUEST BODY FOR REGISTERING A USER
// {
//     "username" : "Alex",
//     "email": "alex@email.com",
//     "password": "password123"
//  }
const registerUser = async (req, res) => {
    try { 

        // const user = await User.create({
        //     username: req.body.username,
        //     email: req.body.email,
        //     password: req.body.password
        // });
        await User.create(req.body) // create new user in our database using the credentials passed in the body of the request

        // send a response with the new users information that has been stored on the database
        res.status(201).json({
            message: "success",
            user: {username: req.body.username, email: req.body.email, password: req.body.password}
        })
    } catch (error) {
        // sends a response with any errors that might have occurred in the try block
        res.status(501).json({errorMessage: error.message, error: error})
    }
}


const login = async (req, res) => {
    try {
        // req.user is passed from the comparePass middleware function
        // send response with credentials of the user who Logged in
        res.status(200).json({
            message: "success",
            user: {
                username: req.user.username,
                email: req.user.email
            }
        })
    } catch (error) {
        // sends a response with any errors that might have occurred in the try block
        res.status(501).json({ errorMessage: error.message, error: error });
    }
}

// export controllers so they can be called in the routes.js file
module.exports = {
    registerUser,
    login
}