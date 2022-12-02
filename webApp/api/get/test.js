const utils = require("../../utils")

const test = (req, res) => {
    try {
        res.status(418).send({msg : "bad refresh token"})

    } catch (e) {
        res.status(500).json({ msg: "Internal server error" });
    }
}

module.exports = test