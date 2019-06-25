const express = require("express");
const http = require('http');
const app = express();

const server = http.createServer(app);
const port = process.env.PORT || '3000';

var io = require('socket.io')(http);

var messages = [];
var markers = ["nesto"];

app.get('/', (req, res, next) => {
    res.send("Hello");
});

app.get('/markers', (req, res) => {
    res.send(markers).status(200);
})

app.post('/markers', (req,res) => {

})

app.get('/messages', (req,res) => {
    res.send(messages).status(200);
})

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on("send", function(msg) {
        messages.push(msg);
        io.emit("message", msg);
    })
});

server.listen(port, () => {
    console.log("Server started!");
})