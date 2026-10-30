const { Schema } = require("mongoose");

const OrdersSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
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
    price: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: (value) => value > 0,
        message: "Price must be greater than zero.",
      },
    },
    mode: {
      type: String,
      required: true,
      enum: ["BUY", "SELL"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = { OrdersSchema };
