const fs = require("fs");

class CartManager {
  constructor(path) {
    this.path = path;
    fs.existsSync(this.path)
      ? (this.cart = JSON.parse(fs.readFileSync(this.path, "utf-8")))
      : (this.cart = []);
  }

  //METHODS

  // Create Cart
  async addCart() {
    let carts = {
      products: [],
    };

    if (this.cart.length === 0) {
      carts["id"] = 1;
    } else {
      carts["id"] = this.cart[this.cart.length - 1]["id"] + 1;
    }

    this.cart.push(carts);
    await fs.writeFileSync(this.path, JSON.stringify(this.cart, null, "\t"));
  }

  // Add Product to Cart
  async addProductToCart(id, product, quantity) {
    let index = this.cart.findIndex((carts) => carts === id);
    if (index === -1 || this.cart[index]["products"] === undefined)
      return false;
    let productIndex = this.cart[index]["products"].findIndex(
      (pid) => pid.productId === product
    );
    let productExist = this.cart[index]["products"].some(
      (pid) => pid.productId === product
    );

    if (productExist) {
      this.cart[index]["products"][productIndex]["quantity"] += quantity;
    } else {
      this.cart[index]["products"].push({
        productId: product,
        quantity: quantity,
      });
    }

    await fs.writeFile(this.path, JSON.stringify(this.cart, null, "\t"));
    return true;
  }

  // Get Cart
  getCart() {
    let carts = this.cart.find((c) => c.id === id);
    return carts || false;
  }
}

module.exports = new CartManager("./carts.json");
