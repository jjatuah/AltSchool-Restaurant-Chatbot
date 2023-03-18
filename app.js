const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 7000

const initial = "Select 1 to Place an order Select 99 to checkout order Select 98 to see order history Select 97 to see current order Select 0 to cancel order "

//Setting static folder
app.use(express.static(path.join(__dirname, "public")));

//When client connects
io.on("connection", socket => {
  console.log("Client connected");

  //send intial instructions on connection
  socket.emit("onConnection", initial)

  socket.on("disconnected", message => {
    console.log(message);
  })

  //Receive chat Messages from the client 
  socket.on("chatMessage", message => {
    console.log(message);
  })
})

server.listen(PORT, () => console.log(`server running on port ${PORT}`))