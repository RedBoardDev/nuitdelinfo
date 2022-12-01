const express = require('express');

module.exports = (con) => {
    var get_route = express.Router()

    get_route.get("/", require("./ListGet"));
    get_route.get("/register", require("./register"));

    return get_route
}