const express = require('express');


var get_route = express.Router()

get_route.get("/", require("./ListGet"));

module.exports = get_route
    
// =======
//     get_route.get("/", require("./ListGet"));
//     get_route.get("/register", require("./register"));

//     return get_route
// }
// >>>>>>> f36548bde3a4d07cc7fe9fb9ef93cefae94f4413
