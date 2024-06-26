const { product, User, cart, address } = require("../db"); // Import your product model

// Controller for fetching all products
const productsDetailsController = async (req, res) => {
  try {
    const products = await product.find(); // Fetch all products from the database
    res.json({ products }); // Send products as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" }); // Handle database errors
  }
};

// Controller for creating a new product
const productsController = async (req, res) => {
  try {
    // Destructure data from request body
    const {
      name,
      price,
      brandName,
      description,
      starrating,
      stock,
      categories,
      imageUrl,
      gender,
      access,
    } = req.body;
    console.log(req.body);
    console.log(name);
    // Basic validation with improved checks
    if (!name || !price || !categories || !imageUrl) {
      return res.status(400).json({
        error: "Please provide name, price, categories, and imageUrl",
      });
    }

    if (typeof price !== "number" || price < 0) {
      return res.status(400).json({
        error: "Price must be a positive number",
      });
    }

    // Import validator library for URL check
    const validator = require("validator");

    if (!validator.isURL(imageUrl)) {
      return res.status(400).json({
        error: "Please provide a valid image URL",
      });
    }

    // Create a new product object (assuming 'product' is your model)
    const newProduct = new product({
      name,
      price,
      brandName,
      description,
      starrating,
      stock,
      categories,
      imageUrl,
      access,
      gender,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    // Send the saved product as a response with 201 (Created) status code
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product" }); // Handle errors
  }
};

const productsEdit = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    // Find the document by id and update it with the values provided in the request body
    const updateProduct = await product.findOneAndUpdate(
      { _id: id }, // Filter by id
      updates, // Apply updates from request body
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure the update respects schema validations
      }
    );

    if (!updateInstructor) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    res.json({
      message: "Products Updated Successfully",
      data: updateInstructor,
    });
  } catch (error) {
    // Handle possible errors, such as validation errors or MongoDB operation errors
    res
      .status(400)
      .json({ message: "Error updating Product", error: error.message });
  }
};

const getProductController = async (req, res) => {
  const { id } = req.params;
  try {
    const productItem = await product.findById(id);
    if (!productItem) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(productItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed" });
  }
};

const addTocart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    console.log(userId + productId);
    const user = await User.findById(userId);
    const productDetail = await product.findById(productId);
    const name = productDetail.name;
    const price = productDetail.price;
    const imageUrl = productDetail.imageUrl;
    console.log("product", name + price + imageUrl);

    let cartsaved;
    if (!user) {
      return res.status(500).json({ error: "No user Found" });
    }
    const cartItem = await cart.findOne({
      userId,
    });
    console.log(cartItem);
    if (cartItem) {
      const itemIndex = cartItem.item.findIndex(
        (p) => p.productId.toString() == productId
      );
      if (itemIndex > -1) {
        // Increase existing quantity
        let productItem = cartItem.item[itemIndex];
        productItem.quantity += Number(quantity);
        cartsaved = await cartItem.save();
      } else {
        // Add new item
        cartItem.item.push({ productId, quantity, name, price, imageUrl });
        cartsaved = await cartItem.save();
      }
      return res.status(200).json(cartsaved);
    } else {
      // New cart
      const newCart = await cart.create({
        userId,
        item: [{ productId, quantity, name, price, imageUrl }],
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

const getCartItems = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findById(id);
    console.log(user);

    const cartItems = await cart.find({ userId: id });
    console.log(cartItems);
    if (cartItems.length == 0) {
      return res.status(200).json({ message: "Cart is Empty" });
    } else {
      return res.status(200).json(cartItems);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Some Error " });
  }
};
const deleteCartItem = async (req, res) => {
  const { userId, productId } = req.body;
  console.log(req.body);

  try {
    const Cart = await cart.findOneAndUpdate(
      { userId }, // Find the correct cart
      { $pull: { item: { productId } } }, // Remove the item
      { new: true } // Return the updated document
    );
    console.log("deleted Item", Cart);

    return res.status(200).json({ sucess: Cart });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
const searchProduct = async (req, res) => {
  console.log("working");
  const text = req.query.text;
  const productDetail = await product.find({
    name: {
      $regex: new RegExp(text, "i"),
    },
  });
  console.log(productDetail);
  res.json({
    product: productDetail.map((item) => ({
      name: item.name,
      id: item._id,
    })),
  });
};
const filterProduct = async (req, res) => {
  const text = req.query.text;
  const productDetail = await product.find({
    name: {
      $regex: new RegExp(text, "i"),
    },
  });
  console.log(productDetail);
  res.json({
    productDetail,
  });
};

const getEarlyDeals = async (req, res) => {
  try {
    const productsDetails = await product.find({ access: "early" });
    console.log(productsDetails);
    res.send(productsDetails);
  } catch (error) {
    console.log(error);
    res.status(500).send("error")
  }
};
module.exports = {
  productsDetailsController,
  productsController,
  productsEdit,
  getProductController,
  addTocart,
  getCartItems,
  deleteCartItem,
  searchProduct,
  filterProduct,
  getEarlyDeals,
};
