import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter, useLocation } from "react-router-dom";

import API_URL from "../api";
import Menu from "../components/Menu";

jest.mock("axios");

const LocationDisplay = () => {
  const location = useLocation();
  return <span data-testid="current-location">{location.pathname}</span>;
};

describe("Menu Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    axios.get.mockResolvedValue({
      data: {
        user: { name: "Khushi Shetiya" },
      },
    });
  });

  const renderMenu = (initialEntry = "/") => {
    return render(
      <MemoryRouter initialEntries={[initialEntry]}>
        <Menu />
        <LocationDisplay />
      </MemoryRouter>,
    );
  };

  test("renders the logo and all menu items", () => {
    renderMenu();

    expect(screen.getByAltText("Logo")).toBeInTheDocument();

    ["Dashboard", "Orders", "Holdings", "Positions", "Funds", "Apps"].forEach(
      (label) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      },
    );
  });

  test("fetches the user profile with credentials", async () => {
    renderMenu();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(`${API_URL}/api/auth/me`, {
        withCredentials: true,
      });
    });

    expect(await screen.findByText("Khushi Shetiya")).toBeInTheDocument();
  });

  test("displays the user's initials", async () => {
    renderMenu();

    expect(await screen.findByText("KS")).toBeInTheDocument();
  });

  test("displays User when the profile request fails", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    renderMenu();

    expect(await screen.findByText("User")).toBeInTheDocument();
    expect(screen.getByText("U")).toBeInTheDocument();

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        "Error fetching user profile:",
        expect.any(Error),
      );
    });

    consoleError.mockRestore();
  });

  test("highlights the active menu item", () => {
    renderMenu("/holdings");

    expect(screen.getByText("Holdings")).toHaveClass("menu", "selected");
    expect(screen.getByText("Dashboard")).toHaveClass("menu");
    expect(screen.getByText("Dashboard")).not.toHaveClass("selected");
  });

  test("navigates to the selected menu route", async () => {
    renderMenu();

    fireEvent.click(screen.getByText("Orders"));

    expect(screen.getByTestId("current-location")).toHaveTextContent("/orders");
  });

  test("opens and closes the profile dropdown", async () => {
    renderMenu();

    const username = await screen.findByText("Khushi Shetiya");

    expect(
      screen.queryByRole("button", { name: "Logout" }),
    ).not.toBeInTheDocument();

    fireEvent.click(username);

    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();

    fireEvent.click(username);

    expect(
      screen.queryByRole("button", { name: "Logout" }),
    ).not.toBeInTheDocument();
  });

  test("logs out successfully and redirects to the login page", async () => {
    axios.post.mockResolvedValue({ data: { message: "Logged out" } });

    const originalLocation = window.location;

    delete window.location;

    window.location = {
      href: "",
    };

    renderMenu();

    fireEvent.click(await screen.findByText("Khushi Shetiya"));
    fireEvent.click(screen.getByRole("button", { name: "Logout" }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${API_URL}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
    });

    await waitFor(() => {
      expect(window.location.href).toBe("http://localhost:3000/login");
    });

    window.location = originalLocation;
  });

  test("shows the API error when logout fails", async () => {
    axios.post.mockRejectedValue({
      response: {
        data: { message: "Logout failed on server" },
      },
    });

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    renderMenu();

    fireEvent.click(await screen.findByText("Khushi Shetiya"));
    fireEvent.click(screen.getByRole("button", { name: "Logout" }));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Logout failed on server");
    });

    alertSpy.mockRestore();
  });

  test("shows a fallback message when logout fails without an API message", async () => {
    axios.post.mockRejectedValue(new Error("Network error"));

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    renderMenu();

    fireEvent.click(await screen.findByText("Khushi Shetiya"));
    fireEvent.click(screen.getByRole("button", { name: "Logout" }));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("Logout failed. Please try again.");
    });

    alertSpy.mockRestore();
  });
});
