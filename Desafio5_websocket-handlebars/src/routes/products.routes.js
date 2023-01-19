const { Router } = require("express");
const ProductManager = require("../ProductManager");

const router = Router();

// Product List & Optional Limit
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

// Product by ID
router.get("/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  let response = await ProductManager.getProductById(pid);
  res.json(response || { error: "Product not found" });
});

// Add Product
router.post("/", async (req, res) => {
  const { title, description, category, price, thumbnail, code, stock } =
    req.body;

  const addPost = await ProductManager.addProduct(
    title,
    description,
    category,
    price,
    thumbnail,
    code,
    stock
  );

  addPost
    ? res.status(201).json({ info: "Product added" })
    : res.status(406).json({ info: "Product already present in list" });
});

// Update Product
router.put("/", async (req, res) => {
  const { id, value, newValue } = req.body;
  (await ProductManager.updateProduct(id, value, newValue))
    ? res.status(201).json({ info: "Product updated" })
    : res.status(406).json({ info: "Product not found" });
});

// Delete Product
router.delete("/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  let response = await ProductManager.deleteProduct(pid);
  response
    ? res.status(200).json({ info: "Product deleted" })
    : res.status(404).json({ info: "Product not found" });
});

module.exports = router;
