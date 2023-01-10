const { Router } = require("express");
const ProductManager = require("../src/ProductManager.js");

const router = Router();

// Product List
router.get("/", (req, res) => {
  let limit = parseInt(req.query.limit);

  try {
    if (limit === 0 || !limit) {
      res.status(200).json(ProductManager.getProduct());
    } else {
      const originalProduct = ProductManager.getProduct();
      let limitProducts = originalProduct.slice(0, limit);
      res.status(202).json(limitProducts);
    }
  } catch (error) {
    res.status(400).json({ info: "Error found", error });
  }
});

router.get("/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  let response = await ProductManager.getProductById(pid);
  res.json(response || { error: "Product not found" });
});

module.exports = router;
