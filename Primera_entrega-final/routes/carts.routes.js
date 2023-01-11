const { Router } = require("express");
const CartManager = require("../src/CartManager.js");
const ProductManager = require("../src/ProductManager.js");

const router = Router();

router.get("/:cid", (req, res) => {
  let cid = parseInt(req.params.cid);
  CartManager.getCart(cid)
    ? res.status(200).json(CartManager.getCart(cid))
    : res.status(404).json({ info: "Cart not found" });
});

router.post("/", async (req, res) => {
  CartManager.addCart();
  res.status(201).json({ info: "Cart added" });
});

router.post("/:cid/product/:pid", async (req, res) => {
  let cid = parseInt(req.params.cid);
  let pid = parseInt(req.params.pid);

  let quantity = parseInt(req.body.quantity);
  let product = CartManager.getCart(pid);

  if (product) {
    CartManager.addProductToCart(cid, pid, quantity);
    res.status(201).json({ info: "Product added to cart" });
  } else {
    res.status(404).json({ info: "Cart not found" });
  }
});

module.exports = router;
