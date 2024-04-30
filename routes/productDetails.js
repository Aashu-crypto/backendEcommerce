const express = require("express");
const {
  productsDetailsController,
  productsController,
  productsEdit,
  getProductController,
  addTocart,
  getCartItems,
  deleteCartItem,
  searchProduct,filterProduct
} = require("../controllers/productsDetailsController");
const { orderedItems,getOrderedItems } = require("../controllers/orderedProductsController");
const router = express.Router();

router.get("/details", productsDetailsController);
router.post("/addProduct", productsController);
router.put("/editProduct/:id", productsEdit);
router.get("/getProduct/:id", getProductController);
router.post("/addCart", addTocart);
router.get("/cartItems/:id", getCartItems);
router.put("/deleteCartItem", deleteCartItem);
router.post("/orderedItems", orderedItems);
router.get("/getOrderedItems/:id", getOrderedItems);
router.get("/searchProduct",searchProduct)
router.get("/filteredProduct",filterProduct)
module.exports = router;
