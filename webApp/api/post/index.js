const express = require('express');

const post_route = express.Router()
post_route.get("/", require("./ListPost"));


module.exports = post_route;