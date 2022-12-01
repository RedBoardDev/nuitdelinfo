




const getUserWithId = (userID, con, callback) => {
    con.query("SELECT * FROM user WHERE id = '" + userID + "';" , (err, result) => {
        console.log(err)
        if (err)
            return null
        
        if (callback) 
            callback(result)
        else
            return result
    })
}

module.exports = getUserWithId