require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { FundsModel } = require("./model/FundsModel");

const stockPrices = require("./data/stockPrices");

const authMiddleware = require("./middleware/authMiddleware");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  process.env.DASHBOARD_URL || "http://localhost:3001",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/auth", require("./routes/auth"));

app.get("/api/funds", authMiddleware, async (req, res) => {
  try {
    const funds = await FundsModel.findOneAndUpdate(
      { userId: req.userId },
      {
        $setOnInsert: {
          availableBalance: 100000,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    return res.status(200).json({
      availableBalance: funds.availableBalance,
    });
  } catch (error) {
    console.error("Funds fetch error:", error.message);

    return res.status(500).json({
      message: "Unable to fetch funds.",
    });
  }
});

app.get("/allHoldings", authMiddleware, async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({
      userId: req.userId,
    });

    const updatedHoldings = allHoldings.map((stock) => {
      const marketPrice = stockPrices[stock.name] ?? stock.price;

      const netChange =
        stock.avg > 0 ? ((marketPrice - stock.avg) / stock.avg) * 100 : 0;

      return {
        ...stock.toObject(),
        price: marketPrice,
        net: `${netChange >= 0 ? "+" : ""}${netChange.toFixed(2)}%`,
      };
    });

    return res.json(updatedHoldings);
  } catch (error) {
    console.error("Fetch holdings error:", error.message);

    return res.status(500).json({
      message: "Unable to fetch holdings.",
    });
  }
});

app.get("/allOrders", authMiddleware, async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    return res.json(allOrders);
  } catch (error) {
    console.error("Fetch orders error:", error.message);

    return res.status(500).json({
      message: "Unable to fetch orders.",
    });
  }
});

app.get("/allPositions", authMiddleware, async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({
      userId: req.userId,
    });

    return res.json(allPositions);
  } catch (error) {
    console.error("Fetch positions error:", error.message);

    return res.status(500).json({
      message: "Unable to fetch positions.",
    });
  }
});

app.post("/neworder", authMiddleware, async (req, res) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({
      message: "Invalid request body.",
    });
  }
  
  const { name, qty, price, mode } = req.body;
  const stockName = typeof name === "string" ? name.trim() : "";
  const quantity = Number(qty);
  const stockPrice = Number(price);

  if (
    !stockName ||
    !Object.prototype.hasOwnProperty.call(stockPrices, stockName) ||
    !Number.isInteger(quantity) ||
    quantity <= 0 ||
    !Number.isFinite(stockPrice) ||
    stockPrice <= 0 ||
    !["BUY", "SELL"].includes(mode)
  ) {
    return res.status(400).json({
      message: "Please provide a valid stock, quantity, price, and mode.",
    });
  }

  const totalValue = quantity * stockPrice;

  if (!Number.isFinite(totalValue)) {
    return res.status(400).json({
      message: "Invalid order value.",
    });
  }

  const createOrderError = (message) => {
    const error = new Error(message);
    error.statusCode = 400;
    return error;
  };

  let session;

  try {
    session = await mongoose.startSession();

    let result;

    await session.withTransaction(async () => {
      let funds = await FundsModel.findOne({
        userId: req.userId,
      }).session(session);

      if (!funds) {
        [funds] = await FundsModel.create(
          [
            {
              userId: req.userId,
              availableBalance: 100000,
            },
          ],
          { session },
        );
      }

      if (mode === "BUY") {
        if (funds.availableBalance < totalValue) {
          throw createOrderError("Insufficient funds.");
        }

        const existingHolding = await HoldingsModel.findOne({
          userId: req.userId,
          name: stockName,
        }).session(session);

        funds.availableBalance -= totalValue;
        await funds.save({ session });

        if (existingHolding) {
          const oldQuantity = existingHolding.qty;
          const newQuantity = oldQuantity + quantity;

          existingHolding.avg =
            (existingHolding.avg * oldQuantity + totalValue) / newQuantity;

          existingHolding.qty = newQuantity;
          existingHolding.price = stockPrice;

          await existingHolding.save({ session });
        } else {
          await HoldingsModel.create(
            [
              {
                userId: req.userId,
                name: stockName,
                qty: quantity,
                avg: stockPrice,
                price: stockPrice,
                net: "0%",
                day: "0%",
              },
            ],
            { session },
          );
        }

        await OrdersModel.create(
          [
            {
              userId: req.userId,
              name: stockName,
              qty: quantity,
              price: stockPrice,
              mode: "BUY",
            },
          ],
          { session },
        );

        result = {
          message: "Buy order placed successfully.",
          totalCost: totalValue,
          availableBalance: funds.availableBalance,
        };
      } else {
        const existingHolding = await HoldingsModel.findOne({
          userId: req.userId,
          name: stockName,
        }).session(session);

        if (!existingHolding || existingHolding.qty < quantity) {
          throw createOrderError("Insufficient shares to sell.");
        }

        existingHolding.qty -= quantity;

        if (existingHolding.qty === 0) {
          await HoldingsModel.deleteOne({
            _id: existingHolding._id,
            userId: req.userId,
          }).session(session);
        } else {
          await existingHolding.save({ session });
        }

        funds.availableBalance += totalValue;
        await funds.save({ session });

        await OrdersModel.create(
          [
            {
              userId: req.userId,
              name: stockName,
              qty: quantity,
              price: stockPrice,
              mode: "SELL",
            },
          ],
          { session },
        );

        result = {
          message: "Sell order placed successfully.",
          totalValue,
          availableBalance: funds.availableBalance,
        };
      }
    });

    return res.status(201).json(result);
  } catch (error) {
    if (error.statusCode === 400) {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error("Order error:", error);

    return res.status(500).json({
      message: "Unable to place order.",
    });
  } finally {
    if (session) {
      await session.endSession();
    }
  }
});

module.exports = app;
