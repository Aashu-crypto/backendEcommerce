const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    addressType: {
      // Optional: Home, work, etc.
      type: String,
      enum: ["Home", "Work", "Other"],
    },
  });

  const Address = mongoose.model("address", addressSchema);

  module.exports =  Address