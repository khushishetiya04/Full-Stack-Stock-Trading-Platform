import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

import Funds from "../components/Funds";
import API_URL from "../api";
import GeneralContext from "../components/GeneralContext";

jest.mock("axios");

const renderFunds = (refreshVersion = 0) => {
  return render(
    <MemoryRouter>
      <GeneralContext.Provider value={{ refreshVersion }}>
        <Funds />
      </GeneralContext.Provider>
    </MemoryRouter>,
  );
};

describe("Funds Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the main funds page content", async () => {
    axios.get.mockResolvedValue({
      data: { availableBalance: 100000 },
    });

    renderFunds();

    expect(
      await screen.findByText("Instant, zero-cost fund transfers with UPI"),
    ).toBeInTheDocument();

    expect(screen.getByText("Equity")).toBeInTheDocument();
    expect(screen.getByText("Available margin")).toBeInTheDocument();
    expect(screen.getByText("Used margin")).toBeInTheDocument();
    expect(screen.getByText("Available cash")).toBeInTheDocument();

    expect(
      screen.getByText("You don't have a commodity account"),
    ).toBeInTheDocument();
  });

  test("fetches funds from the correct API endpoint", () => {
    axios.get.mockResolvedValue({
      data: { availableBalance: 100000 },
    });

    renderFunds();

    expect(axios.get).toHaveBeenCalledWith(`${API_URL}/api/funds`, {
      withCredentials: true,
    });
  });

  test("displays the fetched available balance", async () => {
    axios.get.mockResolvedValue({
      data: { availableBalance: 75000 },
    });

    renderFunds();

    const balances = await screen.findAllByText("75,000.00");

    expect(balances).toHaveLength(2);
  });

  test("formats the balance using the Indian number system", async () => {
    axios.get.mockResolvedValue({
      data: { availableBalance: 123456 },
    });

    renderFunds();

    const balances = await screen.findAllByText("1,23,456.00");

    expect(balances).toHaveLength(2);
  });

  test("displays zero when the API returns an invalid balance", async () => {
    axios.get.mockResolvedValue({
      data: { availableBalance: "invalid" },
    });

    renderFunds();

    const balances = await screen.findAllByText("0.00");

    expect(balances[0]).toHaveClass("colored");
    expect(balances[0]).toHaveTextContent("0.00");
    expect(balances[2]).toHaveTextContent("0.00");
  });

  test("displays zero when the API balance is missing", async () => {
    axios.get.mockResolvedValue({
      data: {},
    });

    renderFunds();

    const balances = await screen.findAllByText("0.00");

    expect(balances[0]).toHaveClass("colored");
    expect(balances[0]).toHaveTextContent("0.00");
    expect(balances[2]).toHaveTextContent("0.00");
  });

  test("refetches funds when refreshVersion changes", async () => {
    axios.get.mockResolvedValue({
      data: { availableBalance: 100000 },
    });

    const { rerender } = render(
      <MemoryRouter>
        <GeneralContext.Provider value={{ refreshVersion: 0 }}>
          <Funds />
        </GeneralContext.Provider>
      </MemoryRouter>,
    );

    await screen.findAllByText("1,00,000.00");

    expect(axios.get).toHaveBeenCalledTimes(1);

    axios.get.mockResolvedValue({
      data: { availableBalance: 80000 },
    });

    rerender(
      <MemoryRouter>
        <GeneralContext.Provider value={{ refreshVersion: 1 }}>
          <Funds />
        </GeneralContext.Provider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(2);
    });

    const balances = await screen.findAllByText("80,000.00");

    expect(balances).toHaveLength(2);
  });

  test("handles an API error without crashing", async () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    axios.get.mockRejectedValue(new Error("Network error"));

    try {
      renderFunds();

      expect(await screen.findByRole("alert")).toHaveTextContent(
        "Unable to load funds. Please try again.",
      );

      expect(consoleError).toHaveBeenCalledWith(
        "Error fetching funds:",
        expect.any(Error),
      );
    } finally {
      consoleError.mockRestore();
    }
  });

  test("renders the funds-related links", async () => {
    axios.get.mockResolvedValue({
      data: { availableBalance: 100000 },
    });

    renderFunds();

    expect(
      await screen.findByRole("link", { name: "Add funds" }),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Withdraw" })).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Open Account" }),
    ).toBeInTheDocument();
  });
});
