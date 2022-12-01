const con = require("../index")


const getUserWithLogins = (login, password, callback) => {
    let encryptedPassword = password
    con.query("SELECT * FROM user WHERE login = '" + login + "', password = '" + encryptedPassword + "';" , (err, result) => {
        if (err)
            return null
        if (callback) 
            callback(result)
    })
}

module.exports = getUserWithLogins