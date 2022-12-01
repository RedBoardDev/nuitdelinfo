const express = require('express');
const app = express()
const utils = require("./utils")

const post_route = require("./api/post")
const get_route = require("./api/get")

app.use(express.json())
app.use("/", post_route)
app.use("/", get_route)

app.use(express.static('static'));

app.listen(8080, () => {
    console.log('Serveur à l écoute')
})