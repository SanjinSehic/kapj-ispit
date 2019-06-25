const express = require("express");
const http = require('http');
const app = express();

const server = http.createServer(app);
const port = process.env.PORT || '3000';

app.get('/', (req, res, next) => {
    res.send("Hello");
});

server.listen(port, () => {
    console.log("Server started!");
})