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
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  let idExist = ProductManager.getProduct().some((p) => p.id === parseInt(pid));
  if (!idExist) {
    res.status(404).json({ info: "Product not found" });
  } else {
    (await CartManager.addProductToCart(Number(cid), Number(pid), quantity))
      ? res.status(201).json({ info: `Product added to cart ${Number(cid)}` })
      : res.status(404).json({ error: "Cart Add Fail" });
  }
});

module.exports = router;
