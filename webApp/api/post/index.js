const express = require('express');


var post_route = express.Router()

post_route.post("/", require("./ListPost"));

module.exports = post_route