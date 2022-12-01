const jwt = require('jsonwebtoken');

module.exports = class utils {
    init(con)
    {
        this.con = con
    }

    checkAccessToken(accessToken)
    {
        const obj = jwt.verify(accessToken, process.env.TOKEN_SECRET)

        if (!obj)
            return null
        if (obj.timeout <= this.currentTimestamp()) 
            return null
        if (obj.type != "access")
            return null
        //check if userName, email and userId are good in DB
    
        return obj
    }

    checkRefreshToken(refreshToken)
    {
        const obj = jwt.verify(refreshToken, process.env.TOKEN_SECRET)

        if (!obj)
            return null
        if (obj.timeout <= this.currentTimestamp()) 
            return null
        if (obj.type != "refresh")
            return null

        //check if token and userId are good in db

        return obj;
    }


    CreateAccessToken(refreshToken)
    {
        let tokObj = this.checkRefreshToken(refreshToken)
        if (!tokObj)
            return null
        
        let userId = 1
        let userName = "fabrice"
        let email = "fabrice.dupont@gmail.com"

        let obj = {
            "timestamp" : this.currentTimestamp(),
            "timeout" : this.currentTimestamp() + 3600 + this.random(1800),
            "type" : "access",
            "userId" : userId,
            "userName" : userName,
            "email" : email
        }

        const token = jwt.sign(obj , process.env.TOKEN_SECRET)

        return token
    }

    CreateRefreshToken(login, password)
    {
        let user = null
        this.getUserWithLogins(login, password, (res) => {
            user = res
        })
    
        if (!user)
            return null
    
        let obj = { "timestamp" : this.currentTimestamp(),
                    "timeout" : this.currentTimestamp() + 1209600,
                    "type" : "refresh",
                    "userId" : user.id
                    }
    
        const token = jwt.sign(obj , process.env.TOKEN_SECRET)
        
        //set token in db for the user with userId 
        return token;
    }

    currentTimestamp()
    {
        return Math.floor(Date.now() / 1000)
    }

    getUserWithId(userID, callback)
    {
        this.con.query("SELECT * FROM user WHERE id = '" + userID + "';" , (err, result) => {
            if (err)
                return null
            if (callback) 
                callback(result)
        })
    }

    getUserWithLogins(login, password, callback)
    {
        let encryptedPassword = password
        this.con.query("SELECT * FROM user WHERE login = '" + login + "', password = '" + encryptedPassword + "';" , (err, result) => {
            if (err)
                return null
            if (callback) 
                callback(result)
        })
    }

    random(max)
    {
        return Math.floor(Math.random() * max);
    }

    revokeRefreshToken(refreshToken)
    {
        let old = checkRefreshToken(refreshToken)
    }





}
