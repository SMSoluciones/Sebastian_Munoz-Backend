const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;

    if (fs.existsSync(this.path)) {
      this.products = JSON.parse(fs.readFileSync(this.path, "utf-8", "\t"));
    } else {
      this.products = [];
    }
  }

  //METHODS
  addProduct = (title, description, price, thumbnail, code, stock) => {
    console.log("Init addProduct");

    // FIND PRODUCT
    let findProduct = this.products.some((p) => p.code === code);

    let product = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };

    // FIND ID
    if (this.products.length === 0) {
      product["id"] = 1;
    } else {
      product["id"] = this.products[this.products.length - 1]["id"] + 1;
    }

    if (findProduct) {
      console.log("You are entering a duplicate product.");
    } else {
      this.products.push(product);
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t")); // << WRITE
      console.log("Product added");
    }
  };

  // GET PRODUCTS
  getProduct() {
    return console.log(this.products);
  }

  // GET PRODUCTS BY ID
  getProductById(id) {
    let findById = this.products.find((p) => p.id === id);
    !findById ? console.log("Product not found") : console.log("Product found");
    console.log(`Product ${id}:`, findById);
  }

  // UPDATE PRODUCTS BY ID
  updateProduct(id, value, newValue) {
    let findIndex = this.products.findIndex((e) => e.id === id);
    let validKeys = Object.keys(this.products[findIndex]).some(
      (e) => e === value
    );

    if (value === "id") {
      console.log("The ID value cannot be modified");
    } else if (!validKeys) {
      console.log("Select a valid key");
    } else {
      this.products[findIndex][value] = newValue;
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
    }
  }

  // DELETE PRODUCTS BY ID
  deleteProduct(id) {
    let searchToDelete = this.products.some((p) => p.id === id);
    if (searchToDelete) {
      this.products = this.products.filter((e) => e.id !== id);
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
      console.log("Product successfully found and removed");
    } else {
      console.error("Product not found");
    }
  }
}

// MANAGER
const manager = new ProductManager("./products.json");

// TEST PRODUCTS
manager.addProduct(
  "Product",
  "Product description",
  200,
  "No image",
  "PR01",
  25
);
manager.addProduct(
  "Product2",
  "Product description",
  200,
  "No image",
  "PR02",
  25
);
manager.addProduct(
  "Product3",
  "Product description",
  200,
  "No image",
  "PR03",
  25
);
manager.addProduct(
  "Product4",
  "Product description",
  200,
  "No image",
  "PR04",
  25
);

// // GET PRODUCTS
// manager.getProduct();

// // GET PRODUCTS BY ID
// manager.getProductById(2);

// UPDATE BY ID
// manager.updateProduct(3, "price", 500);

// FIND AND DELETE
// manager.deleteProduct(4);
// manager.getProduct(); //<< TEST
