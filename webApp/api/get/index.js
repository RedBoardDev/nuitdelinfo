const express = require('express');


var get_route = express.Router()

get_route.get("/", require("./ListGet"));
get_route.get("/login", require("./login"));
get_route.get("/AccessToken", require("./getAccessToken"))
get_route.get("/getScenario/:id", require("./getScenario"))

module.exports = get_route
