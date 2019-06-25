const express = require("express");
const http = require('http');
const app = express();

const server = http.createServer(app);
const port = process.env.PORT || '3000';

var io = require('socket.io')(server);

var messages = [];
var markers = [];

app.get('/', (req, res, next) => {
    res.send("Hello");
});

app.get('/markers', (req, res) => {
    res.json(markers).status(200);
})

app.post('/markers', (req,res) => {

})

app.get('/messages', (req,res) => {
    res.json({ messages: messages }).status(200);
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