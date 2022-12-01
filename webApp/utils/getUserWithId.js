




const getUserWithId = (userID, con,callback) => {
    connection.query("SELECT * FROM user WHERE id = '" + userID + "';" , (err, result) => {
        if (err)
            return null
        if (callback) 
            callback(result)
        else
            return result
    })
}

module.exports = getUserWithId