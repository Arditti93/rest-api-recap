
// The model defines the structure of our table

const { DataTypes } = require("sequelize")
// call connection file so the connection can be made to the database
const connection = require("../db/connection")

// create a tabel called Users in our database - sequelize will pluralize the table name for us
const User = connection.define("User", {
    // define the feilds / columns in our Users table
    username: {
        // the datatype will be a string for this feild
        type: DataTypes.STRING,
        // each  username in our table must NOT be null
        allowNull: false,
    },
    email: {
        // the datatype will be a string for this feild
        type: DataTypes.STRING,
        // each  email in our table must NOT be null
        allowNull: false,
    },
    password: {
        // the datatype will be a string for this feild
        type: DataTypes.STRING,
        // each  password in our table must NOT be null
        allowNull: false,
    }
},
// the username and email feilds must be unique in our Users table
{ indexes: [{ unique: true, fields: ["username", "email"] }]}
)

// export our model for use elsewhere in our API
module.exports = User