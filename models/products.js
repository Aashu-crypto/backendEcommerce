const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Remove leading/trailing whitespace
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensure the price is never negative
  },
  brandName: {
    type: String,
  },
  description: {
    type: String,
  },
  starrating: {
    type: Number,
  },

  stock: {
    type: Number,
    default: 0, // Set initial stock to 0
  },
  categories: {
    type: [String], // Array for multiple categories
    enum: ["Phone", "Computers", "Smart Watch", "Headphone", "Gaming"], // Limit to specific categories
  },
  imageUrl: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", "both"],
  },
  access:{
    type:String,
    enum:['new','early']
  }
});

const product = mongoose.model("product", productSchema);

module.exports = product;
