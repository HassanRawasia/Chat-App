const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

app.get('/', (req, res) => {
    res.send('Hello world');
  });

// Socket events
io.on("connection", (socket) => {
    console.log('a user connected');
    socket.emit("user id", socket.id);
    socket.on("message sent", (body) => {
        io.emit("message", (body))
    });
});

// Server runs on local host
server.listen(8000, () => console.log("Server running on port 8000"));