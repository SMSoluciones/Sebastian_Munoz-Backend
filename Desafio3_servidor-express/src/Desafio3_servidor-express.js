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
  "Finos blancos. 1/kg",
  "Spaghetti al huevo.",
  700,
  "No image",
  "PR01",
  25
);
manager.addProduct(
  "Cintas. 1/kg",
  "Spaghetti en cintas al huevo.",
  700,
  "No image",
  "PR02",
  25
);
manager.addProduct(
  "Ñoquis 1/kg",
  "Ñoquis de papa.",
  200,
  "No image",
  "PR03",
  25
);
manager.addProduct(
  "Canelones de C&V. x1",
  "Rellenos de carne y verdura.",
  200,
  "No image",
  "PR04",
  25
);

manager.addProduct(
  "Ravioles de C&V. 1/kg",
  "Rellenos de carne y verdura.",
  200,
  "No image",
  "PR05",
  25
);

manager.addProduct(
  "Tarta de J&Q.",
  "Rellena de jamon y queso.",
  200,
  "No image",
  "PR06",
  25
);

manager.addProduct(
  "Empanada de CS. x1.",
  "Rellena de carne salada.",
  200,
  "No image",
  "PR07",
  25
);
manager.addProduct(
  "Empanada de Pollo. x1",
  "Rellena de pollo.",
  200,
  "No image",
  "PR08",
  25
);

manager.addProduct(
  "Salsa bolognesa. x1",
  "Salsa bolognesa de la casa.",
  200,
  "No image",
  "PR09",
  25
);

manager.addProduct(
  "Salsa filetto. x1",
  "Salsa filetto de la casa.",
  200,
  "No image",
  "PR10",
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

// Export
module.exports = { ProductManager };
