const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 7000

const initial =["Select 1 to Place an order", "Select 99 to checkout order", "Select 98 to see order history", "Select 97 to see current order", "Select 0 to cancel order"]

const menu = ["Select 2 to order a burger", "Select 3 to order Shawarma", "Select 4 to order Meat Pie", "Select 5 to order Pizza", "Select 6 to order our special fries"]

const invalidSelection = ["Invalid Selection"]

const burgerOrder = ["Burger added to cart", "Select 90 to return to the main menu", "Select 99 to checkout order"]

const shawarmaOrder = ["Shawarma added to cart", "Select 90 to return to the main menu", "Select 99 to checkout order"]

const meatPierOrder = ["MeatPie added to cart", "Select 90 to return to the main menu", "Select 99 to checkout order"]

const pizzaOrder = ["Pizza added to cart", "Select 90 to return to the main menu", "Select 99 to checkout order"]

const friesOrder = ["Fries added to cart", "Select 90 to return to the main menu", "Select 99 to checkout order"]

//Setting static folder
app.use(express.static(path.join(__dirname, "public")));

let order =  {};
let cart = 
  {
    burger: {
      quantity: 0,
      price: 20,
      cost: 0
    },
    shawarma: {
      quantity: 0,
      price: 0,
      cost: 0
    },
    meatPie: {
      quantity: 0,
      price: 0,
      cost: 0
    },
    pizza: {
      quantity: 0,
      price: 0,
      cost: 0
    },
    fries: {
      quantity: 0,
      price: 0,
      cost: 0
    },
  }

  // let checkout = ["Cart Summary", `${cart.burger.quantity} bBurger ordered || cost ${cart.burger.cost} ` ]

let checkout = ["Cart Summary"]; 

const cartUpdate = (quantity, cost) => {
  let checkoutUpdate = `${quantity} bBurger ordered || cost ${cost} `
  return checkoutUpdate;
}

//When client connects
io.on("connection", socket => {
  

  //send intial instructions on connection
  socket.emit("message", initial)

  socket.on("disconnected", message => {
    console.log(message);
  })

  //Receive chat Messages from the client 
  socket.on("chatMessage", message => {
    const spacesRemoved = message.replaceAll(' ', '');
    if (spacesRemoved === "1") {
      socket.emit("message", menu)
    }else if(spacesRemoved === "2") {
      socket.emit("message", burgerOrder)
      cart.burger.quantity += 1
      cart.burger.cost += cart.burger.price
      checkout[1] = cartUpdate(cart.burger.quantity, cart.burger.cost)
    }
    else if(spacesRemoved === "3") {
      socket.emit("message", shawarmaOrder)
    }
    else if(spacesRemoved === "4") {
      socket.emit("message", meatPierOrder)
    }
    else if(spacesRemoved === "5") {
      socket.emit("message", pizzaOrder)
    }
    else if(spacesRemoved === "6") {
      socket.emit("message", friesOrder)
    }else if(spacesRemoved === "99") {
      socket.emit("message", checkout)
      console.log(cart);
    } else {
      socket.emit("message", invalidSelection)
    }
  })
})

server.listen(PORT, () => console.log(`server running on port ${PORT}`))