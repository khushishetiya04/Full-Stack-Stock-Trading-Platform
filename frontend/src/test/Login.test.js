import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import Login from "../landing_page/login/Login";
import { useAuth } from "../AuthContext";

jest.mock("axios");

jest.mock("../AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Login Component", () => {
  const mockSetUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({ setUser: mockSetUser });
    window.alert = jest.fn();
  });

  test("renders login heading, inputs, and button", () => {
    render(<Login />);

    expect(
      screen.getByRole("heading", { name: "Login to Your Account" }),
    ).toBeInTheDocument();

    expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");

    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();

    expect(
      document.querySelector('input[type="password"]'),
    ).toBeInTheDocument();
  });

  test("logs in successfully and sets the user", async () => {
    axios.post.mockResolvedValue({
      data: { user: { name: "Test User", email: "test@example.com" } },
    });

    const originalLocation = window.location;

    delete window.location;
    window.location = { href: "" };

    render(<Login />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(document.querySelector('input[type="password"]'), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/api/auth/login"),
        { email: "test@example.com", password: "password123" },
        { withCredentials: true },
      );

      expect(mockSetUser).toHaveBeenCalledWith({
        name: "Test User",
        email: "test@example.com",
      });

      expect(window.location.href).toBe("http://localhost:3001");
    });

    delete window.location;
    window.location = originalLocation;
  });

  test("shows the server error message when login fails", async () => {
    axios.post.mockRejectedValue({
      response: { data: { message: "Invalid credentials" } },
    });

    render(<Login />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(document.querySelector('input[type="password"]'), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Invalid credentials");
    });

    expect(mockSetUser).not.toHaveBeenCalled();
  });

  test("shows the fallback error when no server message exists", async () => {
    axios.post.mockRejectedValue(new Error("Network error"));

    render(<Login />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(document.querySelector('input[type="password"]'), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Login failed. Please try again.",
      );
    });
  });
});
