import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";

import { AuthProvider, useAuth } from "../AuthContext";

jest.mock("axios");

function TestComponent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading session...</p>;
  }

  return <p>{user ? `Welcome ${user.name}` : "Not logged in"}</p>;
}

describe("AuthContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading while checking the session", async () => {
    let resolveRequest;

    axios.get.mockReturnValue(
      new Promise((resolve) => {
        resolveRequest = resolve;
      }),
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(screen.getByText("Loading session...")).toBeInTheDocument();

    resolveRequest({ data: { user: { name: "Test User" } } });

    await waitFor(() => {
      expect(screen.getByText("Welcome Test User")).toBeInTheDocument();
    });
  });

  test("sets the user when a valid session exists", async () => {
    axios.get.mockResolvedValue({
      data: { user: { name: "Test User", email: "test@example.com" } },
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Welcome Test User")).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/api/auth/me"),
      { withCredentials: true },
    );
  });

  test("sets user to null when no valid session exists", async () => {
    axios.get.mockRejectedValue(new Error("Unauthorized"));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Not logged in")).toBeInTheDocument();
    });
  });
});
