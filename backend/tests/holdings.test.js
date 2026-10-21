const request = require("supertest");
const jwt = require("jsonwebtoken");

jest.mock("../model/HoldingsModel", () => ({
  HoldingsModel: {
    find: jest.fn(),
  },
}));

const { HoldingsModel } = require("../model/HoldingsModel");
const app = require("../app");

describe("Holdings API", () => {
  let token;

  beforeEach(() => {
    jest.clearAllMocks();

    process.env.JWT_SECRET = "test-secret-key";

    token = jwt.sign({ userId: "user123" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  });

  test("rejects a request without authentication", async () => {
    const response = await request(app).get("/allHoldings");

    expect(response.status).toBe(401);
    expect(HoldingsModel.find).not.toHaveBeenCalled();
  });

  test("returns holdings for the authenticated user", async () => {
    const holdings = [
      {
        name: "TCS",
        qty: 5,
        avg: 3200,
        price: 3300,
        net: "+3.13%",
        day: "+1.2%",
      },
    ];

    HoldingsModel.find.mockResolvedValue(holdings);

    const response = await request(app)
      .get("/allHoldings")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(holdings);

    expect(HoldingsModel.find).toHaveBeenCalledWith({
      userId: "user123",
    });
  });

  test("returns an empty array when the user has no holdings", async () => {
    HoldingsModel.find.mockResolvedValue([]);

    const response = await request(app)
      .get("/allHoldings")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("returns 500 when fetching holdings fails", async () => {
    HoldingsModel.find.mockRejectedValue(new Error("Database error"));

    const response = await request(app)
      .get("/allHoldings")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Unable to fetch holdings.",
    });
  });
});
