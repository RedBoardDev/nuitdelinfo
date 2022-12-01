const random = require("./random")
const jwt = require('jsonwebtoken');
const currentTimestamp = require("./currentTimestamp")
const checkRefreshToken = require("./checkRefreshToken")

const CreateAccessToken = (refreshToken) => {
    let tokObj = checkRefreshToken(refreshToken)
    if (!tokObj)
        return null
    
    let userId = 1
    let userName = "fabrice"
    let email = "fabrice.dupont@gmail.com"

    let obj = {
        "timestamp" : currentTimestamp(),
        "timeout" : currentTimestamp() + 3600 + random(1800),
        "type" : "access",
        "userId" : userId,
        "userName" : userName,
        "email" : email
    }

    const token = jwt.sign(obj , process.env.TOKEN_SECRET)

    return token
}

module.exports = CreateAccessToken