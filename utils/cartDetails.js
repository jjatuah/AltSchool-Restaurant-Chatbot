let cart = 
  {
    burger: {
      quantity: 0,
      price: 20,
      cost: 0
    },
    shawarma: {
      quantity: 0,
      price: 40,
      cost: 0
    },
    meatPie: {
      quantity: 0,
      price: 10,
      cost: 0
    },
    pizza: {
      quantity: 0,
      price: 100,
      cost: 0
    },
    fries: {
      quantity: 0,
      price: 50,
      cost: 0
    },
  }

let checkout = ["Order History","0 Burger ordered || cost 0","0 Shawarma ordered || cost 0","0 Meat Pie ordered || cost 0","0 Pizza ordered || cost 0","0 Fries ordered || cost 0"]; 

let curOrder = ["Current Order", "No Order Available"];

const cartUpdate = (quantity, cost, product) => {
  let checkoutUpdate = `${quantity} ${product} ordered || cost $${cost} `
  return checkoutUpdate;
}

module.exports = {cart, checkout, curOrder, cartUpdate}