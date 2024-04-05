const mongoose = require("mongoose");
const User = require("./models/usersModel");
const product = require("./models/products");
const cart = require("./models/cartModel");
const address = require("./models/addressModel");
require("dotenv").config(); // Load environment variables from .env file
const mongodbURI = process.env.MONGODB_URI;
mongoose.connect(mongodbURI);

module.exports = {
  User,
  product,
  cart,
  address,
};
