const { Schema } = require("mongoose");

const HoldingsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  qty: {
    type: Number,
    required: true,
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: "Quantity must be a positive integer.",
    },
  },
  avg: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: (value) => value > 0,
      message: "Average price must be greater than zero.",
    },
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: (value) => value > 0,
      message: "Price must be greater than zero.",
    },
  },
  net: String,
  day: String,
});

module.exports = { HoldingsSchema };
