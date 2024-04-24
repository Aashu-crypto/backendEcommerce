const { User, product, Order } = require("../db");

const orderedItems = async (req, res) => {
  try {
    const orderItems = req.body;
    console.log(req.body);
    const updatedOrders = [];
    for (const item of orderItems) {
      const { userId, productId, quantity } = item;

      // Optionally fetch product if needed:
      // const product = await Product.findById(productId);

      const updatedOrder = await Order.findOneAndUpdate(
        { userId },
        { $push: { item: { productId, quantity } } },
        { new: true, upsert: true }
      );
      updatedOrders.push(updatedOrder);
    }
    console.log(updatedOrders);
    res.json(updatedOrders);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getOrderedItems = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = User.findById(userId);
    if (!user) {
      return res.status(500).send("No user Exist");
    }
    console.log(userId);
    const orderedItems =await Order.find({ userId: userId }).lean();
    console.log(orderedItems);
    return res.json({ orderedItems });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
module.exports = {
  orderedItems,
  getOrderedItems,
};
