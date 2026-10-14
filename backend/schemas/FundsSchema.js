const { Schema } = require("mongoose");

const FundsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    availableBalance: {
      type: Number,
      required: true,
      default: 100000,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = { FundsSchema };
