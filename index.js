const express = require("express");
const http = require('http');
const app = express();

const server = http.createServer(app);

app.get('/', (req, res, next) => {
    res.send("Hello");
});

server.listen(3000, () => {
    console.log("Server started!");
})