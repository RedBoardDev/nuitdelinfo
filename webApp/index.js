const express = require('express');
const app = express()
// const utils = require("./utils")
const mysql = require('mysql2');
const utils = require("./utils")
require('dotenv').config()

console.log(process.env.MYSQL_USER)

const con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "websiteNI"
});




utils.init(con)



const post_route = require("./api/post/index")
const get_route = require("./api/get/index")


app.use(express.json())
app.use("/", post_route)
app.use("/", get_route)

app.use(express.static('static'));

app.listen(8080, () => {
    console.log('Serveur à l écoute')
})