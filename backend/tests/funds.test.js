const request = require("supertest");
const jwt = require("jsonwebtoken");

jest.mock("../model/FundsModel", () => ({
  FundsModel: {
    findOneAndUpdate: jest.fn(),
  },
}));

const { FundsModel } = require("../model/FundsModel");
const app = require("../app");

describe("Funds API", () => {
  let token;

  beforeEach(() => {
    jest.clearAllMocks();

    process.env.JWT_SECRET = "test-secret-key";

    token = jwt.sign({ userId: "user123" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  });

  test("rejects a request without authentication", async () => {
    const response = await request(app).get("/api/funds");

    expect(response.status).toBe(401);
    expect(FundsModel.findOneAndUpdate).not.toHaveBeenCalled();
  });

  test("returns the existing user's available balance", async () => {
    FundsModel.findOneAndUpdate.mockResolvedValue({
      userId: "user123",
      availableBalance: 75000,
    });

    const response = await request(app)
      .get("/api/funds")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      availableBalance: 75000,
    });

    expect(FundsModel.findOneAndUpdate).toHaveBeenCalledWith(
      { userId: "user123" },
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
  });

  test("creates funds with an initial balance when no record exists", async () => {
    FundsModel.findOneAndUpdate.mockResolvedValue({
      userId: "user123",
      availableBalance: 100000,
    });

    const response = await request(app)
      .get("/api/funds")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      availableBalance: 100000,
    });

    expect(FundsModel.findOneAndUpdate).toHaveBeenCalledWith(
      { userId: "user123" },
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
  });
});
