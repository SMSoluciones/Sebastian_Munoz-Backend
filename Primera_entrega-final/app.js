// Express Import
const express = require("express");
const app = express();

// ProductManager Import
const { ProductManager } = require("./src/ProductManager");
const manager = new ProductManager("./products.json");

const PORT = 8080;

// Get Products & limit
app.get("/products", (req, res) => {
  const products = manager.getProduct();
  const limit = req.query.limit;

  limit ? res.send(products.slice(0, limit)) : res.send(products);

  res.send(products);
});

// Get by ID
app.get("/products/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  let response = await manager.getProductById(pid);

  console.log(response);
  res.json(response || { Error: "Producto no encontrado" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
