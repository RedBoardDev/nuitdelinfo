const express = require('express');

module.exports = (con) => {
    var get_route = express.Router()

    get_route.get("/", require("./ListGet"));
    
    return get_route
}