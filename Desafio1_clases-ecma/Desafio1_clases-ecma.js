class ProductManager {
  constructor() {
    this.products = [];
  }

  //METHODS
  addProduct = (title, description, price, thumbnail, code, stock) => {
    console.log("Init addProduct");
    let findProduct = this.products.find((p) => p.code === code);
    if (!findProduct) {
      let product = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        id: this.products.length + 1,
      };
      this.products.push(product);
    } else {
      return console.log("Product not found");
    }
  };

  getProduct() {
    return this.products;
  }

  getProductById(id) {
    let findById = this.products.find((p) => p.id === id);
    !findById ? console.log("Product not found") : console.log("Product found");
  }
}

// MANAGER
let manager = new ProductManager();

manager.getProduct();

// FIRTS PRODUCT
manager.addProduct(
  "Producto",
  "Descripcion de Producto",
  200,
  "Sin Imagen",
  "ABC123",
  25
);
//Test
manager.getProduct();

// SECOND PRODUCT
manager.addProduct(
  "Producto",
  "Descripcion de Producto",
  200,
  "Sin Imagen",
  "ABC",
  25
);
//Test
manager.getProduct();

//BYID
manager.getProductById(2);
