const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { MongoMemoryReplSet } = require("mongodb-memory-server");

process.env.JWT_SECRET = "integration-test-secret";

const app = require("../app");

const { FundsModel } = require("../model/FundsModel");
const { HoldingsModel } = require("../model/HoldingsModel");
const { OrdersModel } = require("../model/OrdersModel");

describe("New Order API - MongoDB Integration Tests", () => {
  let mongo;
  let userId;
  let token;

  beforeAll(async () => {
    mongo = await MongoMemoryReplSet.create({
      replSet: {
        count: 1,
        storageEngine: "wiredTiger",
      },
    });

    await mongoose.connect(mongo.getUri(), {
      runtimeAdapters: {
        os: require("os"),
      },
    });

    userId = new mongoose.Types.ObjectId();

    token = jwt.sign({ userId: userId.toString() }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }, 120000);

  beforeEach(async () => {
    await Promise.all([
      FundsModel.deleteMany({}),
      HoldingsModel.deleteMany({}),
      OrdersModel.deleteMany({}),
    ]);
  });

  afterAll(async () => {
    await mongoose.disconnect();

    if (mongo) {
      await mongo.stop();
    }
  }, 120000);

  test("BUY saves updated funds, holding, and order in MongoDB", async () => {
    await FundsModel.create({
      userId,
      availableBalance: 100000,
    });

    const response = await request(app)
      .post("/neworder")
      .set("Cookie", `token=${token}`)
      .send({
        name: "TCS",
        qty: 2,
        price: 500,
        mode: "BUY",
      });

    expect(response.status).toBe(201);

    const savedFunds = await FundsModel.findOne({ userId }).lean();
    const savedHolding = await HoldingsModel.findOne({
      userId,
      name: "TCS",
    }).lean();
    const savedOrders = await OrdersModel.find({ userId }).lean();

    expect(savedFunds.availableBalance).toBe(99000);

    expect(savedHolding).toEqual(
      expect.objectContaining({
        name: "TCS",
        qty: 2,
        avg: 500,
        price: 500,
      }),
    );

    expect(savedOrders).toHaveLength(1);
    expect(savedOrders[0]).toEqual(
      expect.objectContaining({
        name: "TCS",
        qty: 2,
        price: 500,
        mode: "BUY",
      }),
    );
  });

  test("SELL saves updated funds, holding, and order in MongoDB", async () => {
    await FundsModel.create({
      userId,
      availableBalance: 99000,
    });

    await HoldingsModel.create({
      userId,
      name: "TCS",
      qty: 2,
      avg: 500,
      price: 500,
      net: "0%",
      day: "0%",
    });

    const response = await request(app)
      .post("/neworder")
      .set("Cookie", `token=${token}`)
      .send({
        name: "TCS",
        qty: 1,
        price: 600,
        mode: "SELL",
      });

    expect(response.status).toBe(201);

    const savedFunds = await FundsModel.findOne({ userId }).lean();
    const savedHolding = await HoldingsModel.findOne({
      userId,
      name: "TCS",
    }).lean();
    const savedOrders = await OrdersModel.find({ userId }).lean();

    expect(savedFunds.availableBalance).toBe(99600);

    expect(savedHolding).toEqual(
      expect.objectContaining({
        name: "TCS",
        qty: 1,
      }),
    );

    expect(savedOrders).toHaveLength(1);
    expect(savedOrders[0]).toEqual(
      expect.objectContaining({
        name: "TCS",
        qty: 1,
        price: 600,
        mode: "SELL",
      }),
    );
  });
});
