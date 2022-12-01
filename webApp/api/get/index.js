const express = require('express');


var get_route = express.Router()

get_route.get("/", require("./ListGet"));

module.exports = get_route
    
