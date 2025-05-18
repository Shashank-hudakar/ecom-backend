const User = require("../models/User");
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already present",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    res.status(201).json({
      message: "Registration done",
      user: { id: newUser._id, email: newUser.email },
    });
  } catch (error) {
    console.log("Error in creating user", error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 360000,
    });

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log("Login error", error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      message: "Logout successful"
    });
  } catch (error) {
    console.log("Logout error", error.message);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};

module.exports = { registerUser, login, logout };
