const utils = require("../../utils")
const bcrypt = require('bcryptjs');

const login = (req, res) => {
    try {
        utils.getUserWithEmail(req.body.email, (err, rows) => {
            if (err) res.status(500).json({ msg: "Internal server error" });
            if (rows[0] === undefined) {
                res.status(400).json({ msg: "Invalid Credentials" });
            } else {
                if (req.body.password && bcrypt.compareSync(req.body.password, rows[0].password)) {
                    utils.CreateRefreshToken(req.body.email, rows[0].password, (token)=>{
                        if (token)
                            res.status(200).json({refreshToken: token})
                        else
                            res.status(500).json({ msg: "Internal server error" })
                    });
                } else
                    res.status(400).json({ msg: "Invalid Credentials" });
            }
        });
    } catch (e){
        res.status(500).json({ msg: "Internal server error" })
    }
}

module.exports = login;
