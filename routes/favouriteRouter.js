const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {
  addToFavourite,
  getFavourites,
  removeFavourite,
} = require("../controllers/favouriteController");

const favouritesRoutes = express.Router();

favouritesRoutes.post("/", protect, addToFavourite);
favouritesRoutes.get("/", protect, getFavourites);
favouritesRoutes.delete("/:id", protect, removeFavourite);

module.exports = favouritesRoutes;
