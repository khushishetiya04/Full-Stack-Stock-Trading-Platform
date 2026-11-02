import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";

import API_URL from "../api";
import ProtectedDashboard from "../ProtectedDashboard";

jest.mock("axios");

describe("ProtectedDashboard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows checking message while session is being verified", () => {
    axios.get.mockReturnValue(new Promise(() => {}));

    render(
      <ProtectedDashboard>
        <div>Dashboard Home</div>
      </ProtectedDashboard>,
    );

    expect(screen.getByText("Checking login...")).toBeInTheDocument();
  });

  test("checks the session with credentials", async () => {
    axios.get.mockResolvedValue({
      data: {
        user: { name: "Test User" },
      },
    });

    render(
      <ProtectedDashboard>
        <div>Dashboard Home</div>
      </ProtectedDashboard>,
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${API_URL}/api/auth/me`,
        expect.objectContaining({
          withCredentials: true,
        }),
      );
    });
  });

  test("renders children and passes the authenticated user", async () => {
    axios.get.mockResolvedValue({
      data: {
        user: { name: "Test User" },
      },
    });

    const DashboardHome = ({ user }) => <div>Welcome, {user.name}</div>;

    render(
      <ProtectedDashboard>
        <DashboardHome />
      </ProtectedDashboard>,
    );

    expect(await screen.findByText("Welcome, Test User")).toBeInTheDocument();
  });

  test("does not render children when session verification returns 401", async () => {
    axios.get.mockRejectedValue({
      response: { status: 401 },
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <ProtectedDashboard>
        <div>Dashboard Home</div>
      </ProtectedDashboard>,
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `${API_URL}/api/auth/me`,
        expect.objectContaining({
          withCredentials: true,
        }),
      );
    });

    await waitFor(() => {
      expect(screen.queryByText("Dashboard Home")).not.toBeInTheDocument();
    });

    consoleErrorSpy.mockRestore();
  });

  test("shows an error when the server returns 500", async () => {
    axios.get.mockRejectedValue({
      response: { status: 500 },
    });

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <ProtectedDashboard>
        <div>Dashboard Home</div>
      </ProtectedDashboard>,
    );

    expect(
      await screen.findByText(
        "Unable to verify your session. Please try again.",
      ),
    ).toBeInTheDocument();

    expect(screen.queryByText("Dashboard Home")).not.toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  test("shows an error when the network request fails", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <ProtectedDashboard>
        <div>Dashboard Home</div>
      </ProtectedDashboard>,
    );

    expect(
      await screen.findByText(
        "Unable to verify your session. Please try again.",
      ),
    ).toBeInTheDocument();

    expect(screen.queryByText("Dashboard Home")).not.toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});
