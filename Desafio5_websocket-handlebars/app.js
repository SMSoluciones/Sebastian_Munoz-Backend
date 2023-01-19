const express = require("express");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const ProductManager = require("./src/ProductManager");
const homeRouter = require("./src/routes/home.routes");
const ProductsRouter = require("./src/routes/products.routes");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", ProductsRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

// Handlebars configuration
const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/src/views/");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "./public"));
app.use("/", homeRouter);

// Handlebars routes
app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

let productsOnList = ProductManager.getProduct();

// Configuration socket.io
io.on("connection", (socket) => {
  console.log("Connection with socket:", socket.id);

  //Product list
  socket.emit("productList", productsOnList);

  // Add product
  socket.on("newProduct", (data) => {
    ProductManager.addProduct(data);
    io.emit("productList", productsOnList);
    console.log("Product added: ", data);
  });

  // Delete product
  socket.on("deleteProduct", (id) => {
    ProductManager.deleteProduct(id);
    io.emit("productList", productsOnList);
  });
});
