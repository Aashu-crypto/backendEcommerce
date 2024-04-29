const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderedItemsSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  item: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      name: String,
      price: Number,
      imageUrl: String,

      quantity: { type: Number },
      status: {
        type: String,
        enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
        default: "pending",
      },
    },
  ],

  createdDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderedItemsSchema);

module.exports = Order;
