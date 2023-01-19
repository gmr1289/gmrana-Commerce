const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  constructor() {
    this.products = [];
    this.price = 0;
  }

  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const index = cart.products.findIndex((prod) => prod.id === id);
      const product = cart.products[index];
      console.log(cart);
      if (product) cart.products[index].qty++;
      else cart.products = [...cart.products, { id: id, qty: 1 }];
      cart.totalPrice += +productPrice;
      console.log(cart);
      fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
    });
  }
};
