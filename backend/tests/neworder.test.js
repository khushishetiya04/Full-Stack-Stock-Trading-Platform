const request = require("supertest");
const jwt = require("jsonwebtoken");

jest.mock("../model/FundsModel", () => ({
  FundsModel: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("../model/HoldingsModel", () => ({
  HoldingsModel: {
    findOne: jest.fn(),
    create: jest.fn(),
    deleteOne: jest.fn(),
  },
}));

jest.mock("../model/OrdersModel", () => ({
  OrdersModel: {
    create: jest.fn(),
    find: jest.fn(),
  },
}));

jest.mock("mongoose", () => ({
  ...jest.requireActual("mongoose"),
  startSession: jest.fn(),
}));

const app = require("../app");
const { FundsModel } = require("../model/FundsModel");
const { HoldingsModel } = require("../model/HoldingsModel");
const { OrdersModel } = require("../model/OrdersModel");

describe("New Order API", () => {
  let token;
  const mongoose = require("mongoose");

  beforeEach(() => {
    jest.clearAllMocks();

    process.env.JWT_SECRET = "test-secret-key";

    token = jwt.sign({ userId: "user123" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const session = {
      withTransaction: jest.fn(async (callback) => {
        await callback();
      }),
      endSession: jest.fn().mockResolvedValue(undefined),
    };

    mongoose.startSession.mockResolvedValue(session);
  });

  const mockQuery = (value) => ({
    session: jest.fn().mockResolvedValue(value),
  });

  test("rejects an order without authentication", async () => {
    const response = await request(app).post("/neworder").send({
      name: "TCS",
      qty: 2,
      price: 100,
      mode: "BUY",
    });

    expect(response.status).toBe(401);
  });

  test("rejects an order with missing fields", async () => {
    const response = await request(app)
      .post("/neworder")
      .set("Cookie", `token=${token}`)
      .send({
        name: "TCS",
        qty: 2,
        mode: "BUY",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Please provide a valid stock, quantity, price, and mode.",
    });
  });

  test("rejects a non-positive quantity", async () => {
    const response = await request(app)
      .post("/neworder")
      .set("Cookie", `token=${token}`)
      .send({
        name: "TCS",
        qty: 0,
        price: 100,
        mode: "BUY",
      });

    expect(response.status).toBe(400);
  });

  test("rejects an invalid order mode", async () => {
    const response = await request(app)
      .post("/neworder")
      .set("Cookie", `token=${token}`)
      .send({
        name: "TCS",
        qty: 2,
        price: 100,
        mode: "INVALID",
      });

    expect(response.status).toBe(400);
  });

  test("rejects a negative quantity", async () => {
    const response = await request(app)
      .post("/neworder")
      .set("Cookie", `token=${token}`)
      .send({
        name: "TCS",
        qty: -2,
        price: 100,
        mode: "BUY",
      });

    expect(response.status).toBe(400);
  });

  test("rejects a decimal quantity", async () => {
    const response = await request(app)
      .post("/neworder")
      .set("Cookie", `token=${token}`)
      .send({
        name: "TCS",
        qty: 2.5,
        price: 100,
        mode: "BUY",
      });

    expect(response.status).toBe(400);
  });

  test("rejects a zero price", async () => {
    const response = await request(app)
      .post("/neworder")
      .set("Cookie", `token=${token}`)
      .send({
        name: "TCS",
        qty: 2,
        price: 0,
        mode: "BUY",
      });

    expect(response.status).toBe(400);
  });

  test("rejects a negative price", async () => {
    const response = await request(app)
      .post("/neworder")
      .set("Cookie", `token=${token}`)
      .send({
        name: "TCS",
        qty: 2,
        price: -100,
        mode: "BUY",
      });

    expect(response.status).toBe(400);
  });

  test("successfully places a BUY order", async () => {
    const funds = {
      userId: "user123",
      availableBalance: 100000,
      save: jest.fn().mockResolvedValue(true),
    };

    FundsModel.findOne.mockReturnValue(mockQuery(funds));
    HoldingsModel.findOne.mockReturnValue(mockQuery(null));

    FundsModel.create.mockResolvedValue([funds]);
    HoldingsModel.create.mockResolvedValue([{}]);
    OrdersModel.create.mockResolvedValue([{}]);

    const response = await request(app)
      .post("/neworder")
      .set("Cookie", `token=${token}`)
      .send({
        name: "TCS",
        qty: 2,
        price: 100,
        mode: "BUY",
      });

    expect(response.status).toBe(201);

    expect(response.body).toEqual({
      message: "Buy order placed successfully.",
      totalCost: 200,
      availableBalance: 99800,
    });

    expect(funds.availableBalance).toBe(99800);
    expect(funds.save).toHaveBeenCalled();

    expect(HoldingsModel.create).toHaveBeenCalledWith(
      [
        expect.objectContaining({
          userId: "user123",
          name: "TCS",
          qty: 2,
          avg: 100,
          price: 100,
        }),
      ],
      expect.objectContaining({ session: expect.any(Object) }),
    );

    expect(OrdersModel.create).toHaveBeenCalledWith(
      [
        expect.objectContaining({
          userId: "user123",
          name: "TCS",
          qty: 2,
          price: 100,
          mode: "BUY",
        }),
      ],
      expect.objectContaining({ session: expect.any(Object) }),
    );
  });

  test("updates an existing holding when buying the same stock again", async () => {
    const funds = {
      userId: "user123",
      availableBalance: 100000,
      save: jest.fn().mockResolvedValue(true),
    };

    const existingHolding = {
      userId: "user123",
      name: "TCS",
      qty: 2,
      avg: 100,
      price: 100,
      save: jest.fn().mockResolvedValue(true),
    };

    FundsModel.findOne.mockReturnValue(mockQuery(funds));
    HoldingsModel.findOne.mockReturnValue(mockQuery(existingHolding));
    OrdersModel.create.mockResolvedValue([{}]);

    const response = await request(app)
      .post("/neworder")
      .set("Cookie", `token=${token}`)
      .send({
        name: "TCS",
        qty: 3,
        price: 200,
        mode: "BUY",
      });

    expect(response.status).toBe(201);

    expect(response.body).toEqual({
      message: "Buy order placed successfully.",
      totalCost: 600,
      availableBalance: 99400,
    });

    expect(existingHolding.qty).toBe(5);
    expect(existingHolding.avg).toBe(160);
    expect(existingHolding.price).toBe(200);
    expect(existingHolding.save).toHaveBeenCalled();

    expect(HoldingsModel.create).not.toHaveBeenCalled();
    expect(OrdersModel.create).toHaveBeenCalled();
  });

  test("rejects a BUY order when funds are insufficient", async () => {
    const funds = {
      userId: "user123",
      availableBalance: 100,
      save: jest.fn().mockResolvedValue(true),
    };

    FundsModel.findOne.mockReturnValue(mockQuery(funds));
    HoldingsModel.findOne.mockReturnValue(mockQuery(null));

    const response = await request(app)
      .post("/neworder")
      .set("Cookie", `token=${token}`)
      .send({
        name: "TCS",
        qty: 2,
        price: 100,
        mode: "BUY",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Insufficient funds.",
    });

    expect(funds.availableBalance).toBe(100);
    expect(funds.save).not.toHaveBeenCalled();
    expect(HoldingsModel.create).not.toHaveBeenCalled();
    expect(OrdersModel.create).not.toHaveBeenCalled();
  });

  test("successfully places a SELL order", async () => {
    const funds = {
      userId: "user123",
      availableBalance: 10000,
      save: jest.fn().mockResolvedValue(true),
    };

    const existingHolding = {
      _id: "holding123",
      userId: "user123",
      name: "TCS",
      qty: 5,
      avg: 100,
      price: 100,
      save: jest.fn().mockResolvedValue(true),
    };

    FundsModel.findOne.mockReturnValue(mockQuery(funds));
    HoldingsModel.findOne.mockReturnValue(mockQuery(existingHolding));
    OrdersModel.create.mockResolvedValue([{}]);

    const response = await request(app)
      .post("/neworder")
      .set("Cookie", `token=${token}`)
      .send({
        name: "TCS",
        qty: 2,
        price: 150,
        mode: "SELL",
      });

    expect(response.status).toBe(201);

    expect(response.body).toEqual({
      message: "Sell order placed successfully.",
      totalValue: 300,
      availableBalance: 10300,
    });

    expect(existingHolding.qty).toBe(3);
    expect(existingHolding.save).toHaveBeenCalled();

    expect(funds.availableBalance).toBe(10300);
    expect(funds.save).toHaveBeenCalled();

    expect(OrdersModel.create).toHaveBeenCalledWith(
      [
        expect.objectContaining({
          userId: "user123",
          name: "TCS",
          qty: 2,
          price: 150,
          mode: "SELL",
        }),
      ],
      expect.objectContaining({ session: expect.any(Object) }),
    );

    expect(HoldingsModel.deleteOne).not.toHaveBeenCalled();
  });

  test("rejects a SELL order when the user has insufficient shares", async () => {
    const funds = {
      userId: "user123",
      availableBalance: 10000,
      save: jest.fn().mockResolvedValue(true),
    };

    const existingHolding = {
      _id: "holding123",
      userId: "user123",
      name: "TCS",
      qty: 5,
      avg: 100,
      price: 100,
      save: jest.fn().mockResolvedValue(true),
    };

    FundsModel.findOne.mockReturnValue(mockQuery(funds));
    HoldingsModel.findOne.mockReturnValue(mockQuery(existingHolding));

    const response = await request(app)
      .post("/neworder")
      .set("Cookie", `token=${token}`)
      .send({
        name: "TCS",
        qty: 6,
        price: 150,
        mode: "SELL",
      });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: "Insufficient shares to sell.",
    });

    expect(existingHolding.qty).toBe(5);
    expect(existingHolding.save).not.toHaveBeenCalled();
    expect(funds.availableBalance).toBe(10000);
    expect(funds.save).not.toHaveBeenCalled();

    expect(OrdersModel.create).not.toHaveBeenCalled();
  });

  test("deletes the holding when the user sells all their shares", async () => {
    const funds = {
      userId: "user123",
      availableBalance: 10000,
      save: jest.fn().mockResolvedValue(true),
    };

    const existingHolding = {
      _id: "holding123",
      userId: "user123",
      name: "TCS",
      qty: 5,
      avg: 100,
      price: 100,
      save: jest.fn().mockResolvedValue(true),
    };

    FundsModel.findOne.mockReturnValue(mockQuery(funds));
    HoldingsModel.findOne.mockReturnValue(mockQuery(existingHolding));
    HoldingsModel.deleteOne.mockReturnValue(mockQuery({ deletedCount: 1 }));
    OrdersModel.create.mockResolvedValue([{}]);

    const response = await request(app)
      .post("/neworder")
      .set("Cookie", `token=${token}`)
      .send({
        name: "TCS",
        qty: 5,
        price: 150,
        mode: "SELL",
      });

    expect(response.status).toBe(201);

    expect(response.body).toEqual({
      message: "Sell order placed successfully.",
      totalValue: 750,
      availableBalance: 10750,
    });

    expect(HoldingsModel.deleteOne).toHaveBeenCalledWith({
      _id: "holding123",
      userId: "user123",
    });

    expect(existingHolding.save).not.toHaveBeenCalled();
    expect(funds.availableBalance).toBe(10750);
    expect(funds.save).toHaveBeenCalled();

    expect(OrdersModel.create).toHaveBeenCalledWith(
      [
        expect.objectContaining({
          userId: "user123",
          name: "TCS",
          qty: 5,
          price: 150,
          mode: "SELL",
        }),
      ],
      expect.objectContaining({ session: expect.any(Object) }),
    );
  });

  test("rejects a SELL order when the user does not own the stock", async () => {
    const funds = {
      userId: "user123",
      availableBalance: 10000,
      save: jest.fn().mockResolvedValue(true),
    };

    FundsModel.findOne.mockReturnValue(mockQuery(funds));
    HoldingsModel.findOne.mockReturnValue(mockQuery(null));

    const response = await request(app)
      .post("/neworder")
      .set("Cookie", `token=${token}`)
      .send({
        name: "TCS",
        qty: 2,
        price: 150,
        mode: "SELL",
      });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: "Insufficient shares to sell.",
    });

    expect(funds.availableBalance).toBe(10000);
    expect(funds.save).not.toHaveBeenCalled();
    expect(HoldingsModel.deleteOne).not.toHaveBeenCalled();
    expect(OrdersModel.create).not.toHaveBeenCalled();
  });

  test("returns 500 when a database error occurs while placing an order", async () => {
    FundsModel.findOne.mockReturnValue({
      session: jest.fn().mockRejectedValue(new Error("Database error")),
    });

    const response = await request(app)
      .post("/neworder")
      .set("Cookie", `token=${token}`)
      .send({
        name: "TCS",
        qty: 2,
        price: 100,
        mode: "BUY",
      });

    expect(response.status).toBe(500);

    expect(response.body).toEqual({
      message: "Unable to place order.",
    });
  });
});
