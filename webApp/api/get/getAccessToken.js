const utils = require("../../utils")

const getAccessToken = (req, res) => {
    try {
        if (!req.body.refreshToken) {
            res.status(400).send({msg : "bad request"})
            return
        }

        utils.CreateAccessToken(req.body.refreshToken, (token) => {
            if (!token)
                res.status(400).send({msg : "bad refresh token"})
            else
                res.status(200).send({accessToken : token})
        })


    } catch (e) {
        res.status(500).json({ msg: "Internal server error" });
    }
}

module.exports = getAccessToken