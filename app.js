const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);
var session = require('cookie-session');
const {initial, menu, invalidSelection, burgerOrder, shawarmaOrder, meatPierOrder, pizzaOrder, friesOrder} = require("./utils/instructions");
const {cart, checkout, curOrder, cartUpdate} = require("./utils/cartDetails")

const PORT = process.env.PORT || 7000


//setting cookie-session middleware
const sessionMiddleware = session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  maxAge: 1000 * 60 * 15,
  sameSite: 'strict',
  cookie:{
    secure: true
       }
});

io.engine.use(sessionMiddleware)

//Setting static folder
app.use(express.static(path.join(__dirname, "public")));


//When client connects
io.on("connection", socket => {
  

  //send intial instructions on connection
  socket.emit("message", initial)

  socket.on("disconnected", message => {
    console.log(message);
  })

  //Receive chat Messages from the client 
  socket.on("chatMessage", message => {
    const spacesRemoved = message.trim();
    if (spacesRemoved === "1") {
      socket.emit("message", menu)
    }else if(spacesRemoved === "2") {
      socket.emit("message", burgerOrder)
      cart.burger.quantity += 1
      cart.burger.cost += cart.burger.price
      checkout[1] = cartUpdate(cart.burger.quantity, cart.burger.cost, "burger")
      curOrder[1] = cartUpdate(1, 20, "burger")
    }
    else if(spacesRemoved === "3") {
      socket.emit("message", shawarmaOrder)
      cart.shawarma.quantity += 1
      cart.shawarma.cost += cart.shawarma.price
      checkout[2] = cartUpdate(cart.shawarma.quantity, cart.shawarma.cost, "Shawarma")
      curOrder[1] = cartUpdate(1, 40, "Shawarma")      
    }
    else if(spacesRemoved === "4") {
      socket.emit("message", meatPierOrder)
      cart.meatPie.quantity += 1
      cart.meatPie.cost += cart.meatPie.price
      checkout[3] = cartUpdate(cart.meatPie.quantity, cart.meatPie.cost, "MeatPie")
      curOrder[1] = cartUpdate(1, 10, "MeatPie")
    }
    else if(spacesRemoved === "5") {
      socket.emit("message", pizzaOrder)
      cart.pizza.quantity += 1
      cart.pizza.cost += cart.pizza.price
      checkout[4] = cartUpdate(cart.pizza.quantity, cart.pizza.cost, "Pizza")
      curOrder[1] = cartUpdate(1, 100, "Pizza")
    }
    else if(spacesRemoved === "6") {
      socket.emit("message", friesOrder)
      cart.fries.quantity += 1
      cart.fries.cost += cart.fries.price
      checkout[5] = cartUpdate(cart.fries.quantity, cart.fries.cost, "Fries")
      curOrder[1] = cartUpdate(1, 50, "Fries")
    }else if(spacesRemoved === "98") {
      socket.emit("message", checkout)
    }else if(spacesRemoved === "97") {
      socket.emit("message", curOrder)
    }else if(spacesRemoved === "90") {
      socket.emit("message", initial)
    }
    else if(spacesRemoved === "0") {
      if(curOrder[1] === "No Order Available") { 
        socket.emit("message", ["You're yet to make an order"])
      } else {
        curOrder[1] = "Order Cancelled"
        socket.emit("message", curOrder)
      }
    } else {
      socket.emit("message", invalidSelection)
    }
    
  })
})

server.listen(PORT, () => console.log(`server running on port ${PORT}`))