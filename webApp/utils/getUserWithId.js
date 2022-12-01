const con = require("../index")

console.log(con)


const getUserWithId = (userID, callback) => {
    con.query("SELECT * FROM user WHERE id = '" + userID + "';" , (err, result) => {
        if (err)
            return null
        if (callback) 
            callback(result)
    })
}

module.exports = getUserWithId