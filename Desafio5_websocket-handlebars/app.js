const express = require("express");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const ProductManager = require("./src/ProductManager");
const homeRouter = require("./src/routes/home.routes");

const ProductsRouter = require("./src/routes/products.routes");
const CartRouter = require("./src/routes/carts.routes");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", ProductsRouter);
app.use("/api/carts", CartRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

// Handlebars configuration
const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/src/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "./src/public"));
app.use("/", homeRouter);

// Handlebars routes

app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

let productsInList = ProductManager.getProduct();

io.on("connection", (socket) => {
  // Send products list
  socket.emit("arrayProductos", productsInList);

  // Add new product
  socket.on("newProduct", (data) => {
    ProductManager.addProduct(data);
    io.sockets.emit("arrayProductos", productsInList);
  });
  // Delete product
  socket.on("deleteProduct", (id) => {
    ProductManager.deleteProduct(id);
    io.sockets.emit("arrayProductos", productsInList);
  });
});
