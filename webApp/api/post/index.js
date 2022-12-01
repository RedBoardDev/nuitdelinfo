const express = require('express');

module.exports = (con) => {
    var post_route = express.Router()

    post_route.post("/", require("./ListPost"));
    
    return post_route
}