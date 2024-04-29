const { User, address } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
//This controller will be used for User to create there profile and login
const userLogin = async (req, res) => {
  const { body } = req;
  console.log("body", body);
  const user = await User.findOne({
    username: body.username,
    password: body.password,
  });
  console.log("user login", user);

  if (!user) {
    res.json("Incorrect Username/password");
  } else {
    // Success case
    res.json({
      message: "user logged In",
      userId: user._id,
      name: user.name,
      mail: user.username,
    });
  }
};
const userInfo = async (req, res) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
const userCreate = async (req, res) => {
  try {
    const { body } = req;
    console.log(body);
    const existingUser = await User.findOne({
      username: body.username,
    });
    console.log(existingUser);
    if (existingUser) {
      return res.status(411).json({
        message: "Email already taken/Incorrect inputs",
      });
    }

    const user = await User.create({
      username: body.username,
      name: body.name,
      password: body.password,
    });
    const userId = user._id;
    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );

    res.json({
      message: "User Created Successfully",
      userId: user._id,
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating instructor",
      error: error.message,
    });
  }
};
const addAddress = async (req, res) => {
  try {
    const newAddress = new address(req.body);
    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getAddress = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const AddressItem = await address.find({ userId: id });
    console.log(AddressItem);

    return res.status(200).json(AddressItem);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error occured .Please try again." });
  }
};
const getAllDetail = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
  res.send("Working");
};
module.exports = {
  userLogin,
  userCreate,
  userInfo,
  getAddress,
  addAddress,
  getAllDetail,
};
