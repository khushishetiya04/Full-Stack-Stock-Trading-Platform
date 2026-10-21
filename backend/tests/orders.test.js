const request = require("supertest");
const jwt = require("jsonwebtoken");

jest.mock("../model/OrdersModel", () => ({
  OrdersModel: {
    find: jest.fn(),
  },
}));

const { OrdersModel } = require("../model/OrdersModel");
const app = require("../app");

describe("Orders API", () => {
  let token;

  beforeEach(() => {
    jest.clearAllMocks();

    process.env.JWT_SECRET = "test-secret-key";

    token = jwt.sign({ userId: "user123" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  });

  test("rejects a request without authentication", async () => {
    const response = await request(app).get("/allOrders");

    expect(response.status).toBe(401);
    expect(OrdersModel.find).not.toHaveBeenCalled();
  });

  test("returns orders for the authenticated user", async () => {
    const orders = [
      {
        name: "TCS",
        qty: 5,
        price: 3200,
        mode: "BUY",
      },
    ];

    OrdersModel.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue(orders),
    });

    const response = await request(app)
      .get("/allOrders")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(orders);

    expect(OrdersModel.find).toHaveBeenCalledWith({
      userId: "user123",
    });
  });

  test("returns an empty array when the user has no orders", async () => {
    OrdersModel.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue([]),
    });

    const response = await request(app)
      .get("/allOrders")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("returns 500 when fetching orders fails", async () => {
    OrdersModel.find.mockReturnValue({
      sort: jest.fn().mockRejectedValue(new Error("Database error")),
    });

    const response = await request(app)
      .get("/allOrders")
      .set("Cookie", `token=${token}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Unable to fetch orders.",
    });
  });
});
