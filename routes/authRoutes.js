const express =require("express");
const { registerUser, login, logout } = require("../controllers/authController");

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);

module.exports = authRoutes;