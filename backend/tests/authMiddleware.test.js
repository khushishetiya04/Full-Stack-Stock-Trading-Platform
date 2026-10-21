const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

describe("Authentication Middleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      cookies: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    next = jest.fn();

    process.env.JWT_SECRET = "test-secret-key";
  });

  test("rejects a request without a token", () => {
    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Authentication required. Please log in.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("rejects an invalid token", () => {
    req.cookies.token = "invalid-token";

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid or expired token. Please log in again.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("rejects an expired token", () => {
    req.cookies.token = jwt.sign(
      { userId: "user123" },
      process.env.JWT_SECRET,
      { expiresIn: -1 },
    );

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid or expired token. Please log in again.",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("accepts a valid token and sets the user ID", () => {
    req.cookies.token = jwt.sign(
      { userId: "user123" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    authMiddleware(req, res, next);

    expect(req.userId).toBe("user123");
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });
});
