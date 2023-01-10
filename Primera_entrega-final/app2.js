const express = require("express");
const ProductsRouter = require("./routes/products.routes");
// const CartRouter = require("./routes/cart.routes");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", ProductsRouter);
// app.use("/api/cart", CartRouter);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
