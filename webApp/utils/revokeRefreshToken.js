const jwt = require('jsonwebtoken');
const checkRefreshToken = require("./checkRefreshToken")

const revokeRefreshToken = (refreshToken) => {
    let old = checkRefreshToken(refreshToken)


    //find user With old.userId and set refreshtoken to null
}

module.exports = revokeRefreshToken