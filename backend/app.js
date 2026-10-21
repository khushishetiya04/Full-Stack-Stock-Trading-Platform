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
    let funds = await FundsModel.findOne({
      userId: req.userId,
    });

    if (!funds) {
      funds = await FundsModel.create({
        userId: req.userId,
        availableBalance: 100000,
      });
    }

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

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.day,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done!");
// });

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done!");
// });

app.get("/allHoldings", authMiddleware, async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({
      userId: req.userId,
    });

    return res.json(allHoldings);
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
  const { name, qty, price, mode } = req.body;

  const quantity = Number(qty);
  const stockPrice = Number(price);

  if (
    !name ||
    typeof name !== "string" ||
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

  const session = await mongoose.startSession();

  try {
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
          name,
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
                name,
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
              name,
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
          name,
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
              name,
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
    await session.endSession();
  }
});

module.exports = app;