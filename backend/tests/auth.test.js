const request = require("supertest");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jest.mock("../model/UsersModel", () => ({
  UsersModel: {
    findOne: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
  },
}));

jest.mock("../model/FundsModel", () => ({
  FundsModel: {
    create: jest.fn(),
  },
}));

const app = require("../app");
const { UsersModel } = require("../model/UsersModel");
const { FundsModel } = require("../model/FundsModel");

describe("Authentication API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "test-secret-key";
    process.env.NODE_ENV = "test";
  });

  describe("GET /api/auth/me", () => {
    test("rejects unauthenticated requests", async () => {
      const response = await request(app).get("/api/auth/me");

      expect(response.status).toBe(401);
    });

    test("rejects an invalid token", async () => {
      const response = await request(app)
        .get("/api/auth/me")
        .set("Cookie", "token=invalid-token");

      expect(response.status).toBe(401);
    });

    test("rejects a malformed token", async () => {
      const response = await request(app)
        .get("/api/auth/me")
        .set("Cookie", "token=not-a-valid-jwt");

      expect(response.status).toBe(401);
    });

    test("returns the logged-in user's profile", async () => {
      const user = {
        _id: "user123",
        name: "Test User",
        email: "test@example.com",
      };

      UsersModel.findById.mockResolvedValue(user);

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      const response = await request(app)
        .get("/api/auth/me")
        .set("Cookie", `token=${token}`);

      expect(response.status).toBe(200);
      expect(response.body.user).toEqual({
        id: user._id,
        name: user.name,
        email: user.email,
      });
      expect(UsersModel.findById).toHaveBeenCalledWith(user._id);
    });

    test("returns 404 when the user does not exist", async () => {
      UsersModel.findById.mockResolvedValue(null);

      const token = jwt.sign(
        { userId: "missing-user" },
        process.env.JWT_SECRET,
      );

      const response = await request(app)
        .get("/api/auth/me")
        .set("Cookie", `token=${token}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User not found.");
    });

    test("returns 500 when fetching the profile fails", async () => {
      UsersModel.findById.mockRejectedValue(new Error("Database error"));

      const token = jwt.sign({ userId: "user123" }, process.env.JWT_SECRET);

      const response = await request(app)
        .get("/api/auth/me")
        .set("Cookie", `token=${token}`);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Unable to fetch profile.");
    });
  });

  describe("POST /api/auth/register", () => {
    test("rejects a request with missing fields", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@example.com",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Name, email, and password are required.",
      );
    });

    test("rejects an object as name", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          name: { first: "Test" },
          email: "test@example.com",
          password: "password123",
        });

      expect(response.status).toBe(400);
      expect(UsersModel.findOne).not.toHaveBeenCalled();
      expect(UsersModel.create).not.toHaveBeenCalled();
    });

    test("rejects an array as email", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Test User",
          email: ["test@example.com"],
          password: "password123",
        });

      expect(response.status).toBe(400);
      expect(UsersModel.findOne).not.toHaveBeenCalled();
      expect(UsersModel.create).not.toHaveBeenCalled();
    });

    test("rejects a number as password", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        password: 12345678,
      });

      expect(response.status).toBe(400);
      expect(UsersModel.findOne).not.toHaveBeenCalled();
      expect(UsersModel.create).not.toHaveBeenCalled();
    });

    test("rejects an invalid email", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "invalid-email",
        password: "password123",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Please provide a valid name and email.",
      );
    });

    test("rejects an empty name", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "   ",
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(400);
    });

    test("rejects a password shorter than 8 characters", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "1234567",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Password must be at least 8 characters long.",
      );
    });

    test("rejects an already registered email", async () => {
      UsersModel.findOne.mockResolvedValue({
        _id: "existing-user",
        email: "test@example.com",
      });

      const response = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe(
        "An account with this email already exists.",
      );
      expect(UsersModel.create).not.toHaveBeenCalled();
    });

    test("registers a user and creates initial funds", async () => {
      UsersModel.findOne.mockResolvedValue(null);

      UsersModel.create.mockImplementation(async (data) => ({
        _id: "new-user",
        ...data,
      }));

      FundsModel.create.mockResolvedValue({
        userId: "new-user",
        availableBalance: 100000,
      });

      const response = await request(app).post("/api/auth/register").send({
        name: " Test User ",
        email: " TEST@EXAMPLE.COM ",
        password: "password123",
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Registration successful.");
      expect(response.body.user).toEqual({
        id: "new-user",
        name: "Test User",
        email: "test@example.com",
      });

      expect(UsersModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Test User",
          email: "test@example.com",
          password: expect.any(String),
        }),
      );

      const savedUser = UsersModel.create.mock.calls[0][0];

      expect(savedUser.password).not.toBe("password123");
      expect(await bcrypt.compare("password123", savedUser.password)).toBe(
        true,
      );

      expect(FundsModel.create).toHaveBeenCalledWith({
        userId: "new-user",
        availableBalance: 100000,
      });
    });

    test("returns 409 for a duplicate-key database error", async () => {
      UsersModel.findOne.mockResolvedValue(null);

      UsersModel.create.mockRejectedValue({
        code: 11000,
        message: "Duplicate key",
      });

      const response = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe(
        "An account with this email already exists.",
      );
    });

    test("returns 500 when registration fails", async () => {
      UsersModel.findOne.mockRejectedValue(new Error("Database error"));

      const response = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe(
        "Unable to register. Please try again.",
      );
    });
  });

  describe("POST /api/auth/login", () => {
    test("rejects a request with missing fields", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Email and password are required.");
    });

    test("rejects an object as email", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: { address: "test@example.com" },
          password: "password123",
        });

      expect(response.status).toBe(400);
      expect(UsersModel.findOne).not.toHaveBeenCalled();
    });

    test("rejects an array as password", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "test@example.com",
          password: ["password123"],
        });

      expect(response.status).toBe(400);
      expect(UsersModel.findOne).not.toHaveBeenCalled();
    });

    test("rejects a request without an email", async () => {
      const response = await request(app).post("/api/auth/login").send({
        password: "password123",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Email and password are required.");
    });

    test("rejects an email that is not registered", async () => {
      UsersModel.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      const response = await request(app).post("/api/auth/login").send({
        email: "unknown@example.com",
        password: "password123",
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid email or password.");
    });

    test("rejects an incorrect password", async () => {
      const hashedPassword = await bcrypt.hash("correct123", 4);

      UsersModel.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue({
          _id: "user123",
          name: "Test User",
          email: "test@example.com",
          password: hashedPassword,
        }),
      });

      const response = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "wrongpass",
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid email or password.");
    });

    test("logs in successfully and sets the authentication cookie", async () => {
      const hashedPassword = await bcrypt.hash("password123", 4);

      UsersModel.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue({
          _id: "user123",
          name: "Test User",
          email: "test@example.com",
          password: hashedPassword,
        }),
      });

      const response = await request(app).post("/api/auth/login").send({
        email: " TEST@EXAMPLE.COM ",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Login successful.");
      expect(response.body.user).toEqual({
        id: "user123",
        name: "Test User",
        email: "test@example.com",
      });

      expect(response.headers["set-cookie"]).toBeDefined();
      expect(response.headers["set-cookie"].join(";")).toContain("token=");
      expect(response.headers["set-cookie"].join(";")).toContain("HttpOnly");

      expect(UsersModel.findOne).toHaveBeenCalledWith({
        email: "test@example.com",
      });
    });

    test("returns 500 when login fails due to a database error", async () => {
      UsersModel.findOne.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error("Database error")),
      });

      const response = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Unable to log in. Please try again.");
    });

    it("should set secure cookie options in production", async () => {
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      const hashedPassword = await bcrypt.hash("password123", 4);

      UsersModel.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue({
          _id: "user123",
          name: "Test User",
          email: "test@example.com",
          password: hashedPassword,
        }),
      });

      try {
        const response = await request(app).post("/api/auth/login").send({
          email: "test@example.com",
          password: "password123",
        });

        expect(response.status).toBe(200);
        expect(response.headers["set-cookie"]).toBeDefined();
        expect(response.headers["set-cookie"].join(";")).toContain("Secure");
        expect(response.headers["set-cookie"].join(";")).toContain(
          "SameSite=None",
        );
      } finally {
        process.env.NODE_ENV = originalNodeEnv;
      }
    });
  });

  describe("POST /api/auth/logout", () => {
    test("logs out successfully", async () => {
      const response = await request(app).post("/api/auth/logout");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Logout successful.");
    });

    test("clears the authentication cookie", async () => {
      const response = await request(app).post("/api/auth/logout");

      expect(response.headers["set-cookie"]).toBeDefined();
      expect(response.headers["set-cookie"].join(";")).toContain("token=");
      expect(response.headers["set-cookie"].join(";")).toContain("Expires=");
    });

    it("should clear the cookie with production options", async () => {
      const originalNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      try {
        const response = await request(app).post("/api/auth/logout");

        expect(response.status).toBe(200);
        expect(response.headers["set-cookie"]).toBeDefined();
        expect(response.headers["set-cookie"][0]).toContain("Secure");
        expect(response.headers["set-cookie"][0]).toContain("SameSite=None");
        expect(response.headers["set-cookie"][0]).toContain("token=");
        expect(response.headers["set-cookie"][0]).toContain("Expires=");
      } finally {
        process.env.NODE_ENV = originalNodeEnv;
      }
    });
  });
});
