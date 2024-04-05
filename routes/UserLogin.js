const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const userController = require("../controllers/userSign");
router.post("/login", userController.userLogin);
router.get("/userInfo", userController.userInfo);
router.post("/createUser", userController.userCreate);
router.post("/addUserAddress", userController.addAddress);
router.get("/getUserAddress/:id", userController.getAddress);

module.exports = router;
