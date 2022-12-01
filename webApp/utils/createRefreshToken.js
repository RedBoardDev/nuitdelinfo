const jwt = require('jsonwebtoken');
const currentTimestamp = require("./currentTimestamp");
const revokeRefreshToken = require('./revokeRefreshToken');
const getUserWithLogins = require("./getUserWithLogins")

require('dotenv').config()

const CreateRefreshToken = (login, password) => {
    let user = null
    getUserWithLogins(login, password, (res) => {
        user = res
    })

    if (!user)
        return null

    let obj = { "timestamp" : currentTimestamp(),
                "timeout" : currentTimestamp() + 1209600,
                "type" : "refresh",
                "userId" : user.id
                }

    const token = jwt.sign(obj , process.env.TOKEN_SECRET)
    
    //set token in db for the user with userId 
    return token;
}