const jwt = require('jsonwebtoken');
const currentTimestamp = require("./currentTimestamp")

const checkRefreshToken = (refreshToken) => {
    const obj = jwt.verify(refreshToken, process.env.TOKEN_SECRET)

    if (!obj)
        return null
    if (obj.timeout <= currentTimestamp()) 
        return null
    if (obj.type != "refresh")
        return null

    //check if token and userId are good in db

    return obj;
}

module.exports = checkRefreshToken