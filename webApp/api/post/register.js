const utils = require("../../utils")
const bcrypt = require('bcryptjs');


const register = (req, res) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body['password'], salt);
    utils.getIDWithEmail(req.body.email, (err, rows) => {
        if (err) res.status(500).json({ msg: "Internal server error" })
        if (rows[0] != undefined) {
            res.status(418).json({msg: "Account already exists"});
        } else {
            utils.postRegister(req.body["email"], hash, req.body["username"], (err2, rows) => {
                if (err2) res.status(500).json({ msg: "Internal server error" })
            });
            utils.getIDWithEmail(req.body.email, (err3, rows) => {
                if (err3) res.status(500).json({ msg: "Internal server error" });
                if (rows != undefined && rows[0] != undefined) {
                    res.status(201).json({ id: rows[0].id});
                } else
                    res.status(400);
            });
        }
    });
}

module.exports = register;
