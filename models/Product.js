const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["men's clothing", "women's clothing", "electronics", "jewelery"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
  },
  { timestamps: true } 
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
