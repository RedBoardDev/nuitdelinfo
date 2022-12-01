const jwt = require('jsonwebtoken');
const currentTimestamp = require("./currentTimestamp")

const checkAccessToken = (accessToken) => {
    const obj = jwt.verify(accessToken, process.env.TOKEN_SECRET)

    if (!obj)
        return null
    if (obj.timeout <= currentTimestamp()) 
        return null
    if (obj.type != "access")
        return null
    //check if userName, email and userId are good in DB

    return obj
}