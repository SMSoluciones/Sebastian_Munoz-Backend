const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    fs.existsSync(this.path)
      ? (this.products = JSON.parse(fs.readFileSync(this.path, "utf-8")))
      : (this.products = []);
  }

  //METHODS
  async addProduct(
    title,
    category,
    description,
    price,
    thumbnail,
    code,
    stock
  ) {
    console.log("Init addProduct");

    // FIND PRODUCT
    let findProduct = this.products.some((p) => p.code === code);

    let product = {
      title: title,
      description: description,
      category: category,
      price: price,
      thumbnail: thumbnail,
      code: code,
      status: true,
      stock: stock,
    };

    // FIND ID
    if (this.products.length === 0) {
      product["id"] = 1;
    } else {
      product["id"] = this.products[this.products.length - 1]["id"] + 1;
    }

    if (findProduct) {
      return false;
    } else {
      this.products.push(product);
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
      return true;
    }
  }

  // GET PRODUCTS
  getProduct() {
    return this.products;
  }

  // GET PRODUCTS BY ID
  getProductById(id) {
    let findById = this.products.find((p) => p.id === id);
    !findById ? console.log("Product not found") : console.log("Product found");
    console.log(`Product ${id}:`, findById);
    return findById;
  }

  // UPDATE PRODUCTS BY ID
  async updateProduct(id, value, newValue) {
    let findIndex = this.products.findIndex((e) => e.id === id);
    let validKeys;
    findIndex === -1
      ? false
      : (validKeys = Object.keys(this.products[findIndex]).some(
          (e) => e === value
        ));

    if (value === "id" || !validKeys) {
      return false;
    } else {
      this.products[findIndex][value] = newValue;
      await fs.writeFileSync(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
      return true;
    }
  }

  // DELETE PRODUCTS BY ID
  deleteProduct(id) {
    let searchToDelete = this.products.some((p) => p.id === id);
    if (searchToDelete) {
      this.products = this.products.filter((e) => e.id !== id);
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
      return true;
    } else {
      return false;
    }
  }
}

module.exports = new ProductManager("./products.json");
