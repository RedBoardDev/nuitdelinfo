const express = require('express');


var get_route = express.Router()

get_route.get("/", require("./ListGet"));
get_route.get("/login", require("./login"));

module.exports = get_route
