require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const server = express();

server.set('view engine',"ejs");
server.set("views", path.join(__dirname, "views"));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

const srvport = process.env.SERVER_PORT
server.listen(srvport, function () {
    console.log("started at port: " + srvport);
})

module.exports = server;
