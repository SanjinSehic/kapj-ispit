const express = require("express");
const http = require('http');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');

const server = http.createServer(app);
const port = process.env.PORT || '3000';

var io = require('socket.io')(server);

var messages = [];
var markers = [];

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.send("Hello");
});

app.get('/markers', (req, res) => {
    res.send({ markers: markers });
})

app.post('/markers', (req,res) => {
    let long = req.body.longitude;
    let lat = req.body.latitude;

    var marker = {
        longitude: long,
        latitude: lat,
    }
    console.log(marker)
    markers.push(marker);
    res.status(201);
})

app.get('/messages', (req,res) => {

    console.log("Dosao zahtjev");
    res.send({ messages: messages });
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