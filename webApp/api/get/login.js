const utils = require("../../utils")
const bcrypt = require('bcryptjs');

const login = (req, res) => {
    utils.getIDWithEmail(req.body.email, (err, rows) => {
        if (err) res.status(500).json({ msg: "Internal server error" });
        if (rows[0] === undefined) {
            res.status(400).json({ msg: "Invalid Credentials" });
        } else {
            if (bcrypt.compareSync(req.body.password, rows[0].password)) {
                res.status(201).json({id: rows[0].id});
            } else
                res.status(400).json({ msg: "Invalid Credentials" });
        }
    });
}

module.exports = login;
