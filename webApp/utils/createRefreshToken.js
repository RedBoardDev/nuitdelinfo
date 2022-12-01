const jwt = require('jsonwebtoken');
const currentTimestamp = require("./currentTimestamp");
const revokeRefreshToken = require('./revokeRefreshToken');

require('dotenv').config()

const CreateRefreshToken = (login, password) => {
    //search data in DB with login / password

    let find = true
    let userId = 1
    let oldRefreshToken = "abcdefgh"
    if (!find)
        return null

    

    let obj = { "timestamp" : currentTimestamp(),
                "timeout" : currentTimestamp() + 1209600,
                "type" : "refresh",
                "userId" : userId
                }

    const token = jwt.sign(obj , process.env.TOKEN_SECRET)
    
    //set token in db for the user with userId 
    return token;
}