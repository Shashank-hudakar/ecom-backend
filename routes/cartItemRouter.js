const express = require("express");
const protect = require("../middlewares/authMiddleware");

const {
  addToCart,
  getCart,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cartItemController");

const cartItemRoutes = express.Router();

cartItemRoutes.post("/", protect, addToCart);
cartItemRoutes.get("/", protect, getCart);
cartItemRoutes.put("/:id", protect, updateCartItem);
cartItemRoutes.delete("/:id", protect, deleteCartItem);

module.exports = cartItemRoutes;
