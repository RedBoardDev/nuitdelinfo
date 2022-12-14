const jwt = require('jsonwebtoken');

module.exports = class utils {
    init(con)
    {
        this.con = con
    }

    checkAccessToken(accessToken, callback)
    {
        const obj = jwt.verify(accessToken, process.env.TOKEN_SECRET)
        if (!obj)
            callback (null)
        if (obj.timeout <= this.currentTimestamp())
            callback (null)
        if (obj.type != "access")
            callback (null)
        this.getUserWithId(obj.userId ,(res) => {
            if (res && obj.userName == res[0].username && obj.email == res[0].email)
                callback(obj)
            else
                callback(null)
        })
    }

    checkRefreshToken(refreshToken, callback)
    {
        const obj = jwt.verify(refreshToken, process.env.TOKEN_SECRET)

        if (!obj) {
            callback (null)
            return
        } if (obj.timeout <= this.currentTimestamp()) {
            callback (null)
            return
        } if (obj.type != "refresh") {
            callback (null)
            return
        }

        this.getUserWithId(obj.userId ,(res) => {
            if (res) {
                callback(obj)
                return
            } else {
                callback(null)
                return
            }
        })
    }


    CreateAccessToken(refreshToken, callback)
    {
        this.checkRefreshToken(refreshToken, (tokObj) => {
            if (!tokObj) {
                callback(null)
                return
            }

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

            callback (token)
            return
        })

    }

    CreateRefreshToken(login, password, callback)
    {
        this.getUserWithLogins(login, password, (user) => {
            if (user.length == 0) {
                callback(null)
                return
            }
            let obj = { "timestamp" : this.currentTimestamp(),
                        "timeout" : this.currentTimestamp() + 1209600,
                        "type" : "refresh",
                        "userId" : user[0].id
                        }

            const token = jwt.sign(obj , process.env.TOKEN_SECRET)
            this.UpadateUserRefreshToken(token, user[0].id, (res) => {
                if (!res) {
                    callback(null)
                    return
                } else {
                    callback(token)
                    return
                }
            })
        })
    }

    revokeRefreshToken(refreshToken, callback)
    {
        this.checkRefreshToken(refreshToken, (obj) => {
            this.UpadateUserRefreshToken("0", obj.userId, (res) => {
                callback(res)
            })
        })
    }

    currentTimestamp()
    {
        return Math.floor(Date.now() / 1000)
    }

    UpadateUserRefreshToken(refreshToken, userId, callback) {
        this.con.query(`UPDATE user SET refresh_token = "${refreshToken}" WHERE id = ${userId}`, (err, result) => {
            if (err)
                callback(null)
            if (result)
                callback(result)
        })
    }

    getUserWithId(userID, callback)
    {
        this.con.query("SELECT * FROM user WHERE id = '" + userID + "';" , (err, result) => {
            if (err) {
                callback(null)
                return
            } if (callback) {
                callback(result)
                return
            }
        })
    }

    getUserWithLogins(login, password, callback)
    {
        this.con.query(`SELECT * FROM user WHERE email = "${login}" AND password = "${password}";`, (err, result) => {
            if (err) {
                callback (null)
                return
            } if (callback) {
                callback(result)
                return
            }
        })
    }

    random(max)
    {
        return Math.floor(Math.random() * max);
    }

    getUserWithEmail(email, callback)
    {
        this.con.query(`SELECT * FROM user WHERE email = "${email}";`, (err, result) => {
            if (err)
                return err
            if (callback)
                callback(err, result)
        })
    }

    postRegister(email, hash, username, callback)
    {
        this.con.query(`INSERT INTO user(email, password, username) VALUES("${email}", "${hash}", '${username}')`, (err, result) => {
            if (err)
                return err
            if (callback)
                callback(err, result)
        })
    }
}
