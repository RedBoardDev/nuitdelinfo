const express = require('express');


var post_route = express.Router()

post_route.post("/", require("./ListPost"));
post_route.post("/register", require("./register"));

module.exports = post_route
