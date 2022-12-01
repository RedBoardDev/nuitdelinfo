const utils = require("../../utils")

const ListPost = (req, res) => {

    try {
        out = {"data" : [
            "/"
        ]}

        res.status(200)
        res.send(out)
    } catch (e){
        console.log(e)
        res.status(500)
        res.json({"msg": "Internal server error"})
    }
}

module.exports = ListPost;