import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

import Funds from "../components/Funds";
import API_URL from "../api";
import GeneralContext from "../components/GeneralContext";

jest.mock("axios");

const mockFundsResponses = (balance = 100000, holdings = []) => {
  axios.get.mockResolvedValueOnce({ data: holdings }).mockResolvedValueOnce({
    data: { availableBalance: balance },
  });
};

const renderFunds = (refreshVersion = 0) => {
  return render(
    <MemoryRouter>
      <GeneralContext.Provider value={{ refreshVersion }}>
        <Funds />
      </GeneralContext.Provider>
    </MemoryRouter>,
  );
};

const getRowValue = (label) => {
  return screen.getByText(label).parentElement.querySelector(".imp");
};

describe("Funds Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the main funds page content", async () => {
    mockFundsResponses();

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

  test("fetches holdings and funds from the correct API endpoints", async () => {
    mockFundsResponses();

    renderFunds();

    await screen.findByText("Available margin");

    expect(axios.get).toHaveBeenNthCalledWith(1, `${API_URL}/allHoldings`, {
      withCredentials: true,
    });

    expect(axios.get).toHaveBeenNthCalledWith(2, `${API_URL}/api/funds`, {
      withCredentials: true,
    });
  });

  test("displays the fetched available balance", async () => {
    mockFundsResponses(75000);

    renderFunds();

    const balances = await screen.findAllByText("75,000.00");

    expect(balances).toHaveLength(2);
  });

  test("formats the balance using the Indian number system", async () => {
    mockFundsResponses(123456);

    renderFunds();

    const balances = await screen.findAllByText("1,23,456.00");

    expect(balances).toHaveLength(2);
  });

  test("displays zero when the API returns an invalid balance", async () => {
    axios.get.mockResolvedValueOnce({ data: [] }).mockResolvedValueOnce({
      data: { availableBalance: "invalid" },
    });

    renderFunds();

    await waitFor(() => {
      expect(getRowValue("Available margin")).toHaveTextContent("0.00");
    });

    expect(getRowValue("Available margin")).toHaveClass("colored");
    expect(getRowValue("Available cash")).toHaveTextContent("0.00");
  });

  test("displays zero when the API balance is missing", async () => {
    axios.get
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({ data: {} });

    renderFunds();

    await waitFor(() => {
      expect(getRowValue("Available margin")).toHaveTextContent("0.00");
    });

    expect(getRowValue("Available margin")).toHaveClass("colored");
    expect(getRowValue("Available cash")).toHaveTextContent("0.00");
  });

  test("calculates used margin from holdings", async () => {
    mockFundsResponses(75000, [
      { name: "TCS", qty: 2, avg: 3000 },
      { name: "INFY", qty: 5, avg: 1500 },
    ]);

    renderFunds();

    await waitFor(() => {
      expect(getRowValue("Used margin")).toHaveTextContent("13,500.00");
    });
  });

  test("shows an error for used margin when holdings API fails", async () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    axios.get
      .mockRejectedValueOnce(new Error("Holdings API failed"))
      .mockResolvedValueOnce({
        data: { availableBalance: 75000 },
      });

    try {
      renderFunds();

      await waitFor(() => {
        expect(getRowValue("Used margin")).toHaveTextContent(
          "Unable to load used margin.",
        );
      });

      expect(getRowValue("Available margin")).toHaveTextContent("75,000.00");

      expect(consoleError).toHaveBeenCalledWith(
        "Error fetching holdings:",
        expect.any(Error),
      );
    } finally {
      consoleError.mockRestore();
    }
  });

  test("refetches funds when refreshVersion changes", async () => {
    mockFundsResponses(100000);

    const { rerender } = render(
      <MemoryRouter>
        <GeneralContext.Provider value={{ refreshVersion: 0 }}>
          <Funds />
        </GeneralContext.Provider>
      </MemoryRouter>,
    );

    expect(await screen.findAllByText("1,00,000.00")).toHaveLength(3);
    expect(axios.get).toHaveBeenCalledTimes(2);

    mockFundsResponses(80000);

    rerender(
      <MemoryRouter>
        <GeneralContext.Provider value={{ refreshVersion: 1 }}>
          <Funds />
        </GeneralContext.Provider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(4);
    });

    expect(await screen.findAllByText("80,000.00")).toHaveLength(2);
  });

  test("handles a funds API error without crashing", async () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    axios.get
      .mockResolvedValueOnce({ data: [] })
      .mockRejectedValueOnce(new Error("Network error"));

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

  test("renders the funds-related actions as disabled buttons", async () => {
    mockFundsResponses();

    renderFunds();

    expect(
      await screen.findByRole("button", { name: "Add funds" }),
    ).toBeDisabled();

    expect(screen.getByRole("button", { name: "Withdraw" })).toBeDisabled();

    expect(screen.getByRole("button", { name: "Open Account" })).toBeDisabled();
  });
});
