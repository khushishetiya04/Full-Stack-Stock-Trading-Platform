import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import Signup from "../landing_page/signup/Signup";

jest.mock("axios");

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Signup Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  test("renders signup heading and button", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Create an Account" }),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
  });

  test("successfully registers a user", async () => {
    axios.post.mockResolvedValue({
      data: { message: "Registration successful" },
    });

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>,
    );

    const inputs = screen.getAllByRole("textbox");

    fireEvent.change(inputs[0], {
      target: { value: "Test User" },
    });

    fireEvent.change(inputs[1], {
      target: { value: "test@example.com" },
    });

    fireEvent.change(document.querySelector('input[type="password"]'), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith("Registration successful");
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  test("shows the server error message when registration fails", async () => {
    axios.post.mockRejectedValue({
      response: {
        data: { message: "Email already exists" },
      },
    });

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>,
    );

    const inputs = screen.getAllByRole("textbox");

    fireEvent.change(inputs[0], {
      target: { value: "Test User" },
    });

    fireEvent.change(inputs[1], {
      target: { value: "test@example.com" },
    });

    fireEvent.change(document.querySelector('input[type="password"]'), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Email already exists");
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("shows the fallback error when no server message exists", async () => {
    axios.post.mockRejectedValue(new Error("Network error"));

    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>,
    );

    const inputs = screen.getAllByRole("textbox");

    fireEvent.change(inputs[0], {
      target: { value: "Test User" },
    });

    fireEvent.change(inputs[1], {
      target: { value: "test@example.com" },
    });

    fireEvent.change(document.querySelector('input[type="password"]'), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Registration failed. Please try again.",
      );
    });
  });
});
