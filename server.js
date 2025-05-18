const express = require("express");
const { config } = require("dotenv");
const cookieParser = require('cookie-parser');
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
    origin:`https://ecom-frontend-dun.vercel.app`
}));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
