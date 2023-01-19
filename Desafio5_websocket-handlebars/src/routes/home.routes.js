const { Router } = require("express");
const express = require("express");
const ProductManager = require("../ProductManager");
const router = express.Router();

// Product List
let productsInList = ProductManager.getProduct();

router.get("/", (req, res) => {
  res.render("home", { productsInList });
});

module.exports = router;
