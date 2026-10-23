import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";

import Holdings from "../components/Holdings";
import GeneralContext from "../components/GeneralContext";
import API_URL from "../api";

jest.mock("axios");

jest.mock("../components/VerticalGraph", () => ({
  VerticalGraph: () => <div>Vertical Graph</div>,
}));

describe("Holdings Component", () => {
  const mockHoldings = [
    {
      _id: "1",
      name: "INFY",
      qty: 2,
      avg: 100,
      price: 120,
      net: "+20%",
      day: "+2%",
      isLoss: false,
    },
    {
      _id: "2",
      name: "TCS",
      qty: 1,
      avg: 200,
      price: 180,
      net: "-10%",
      day: "-1%",
      isLoss: true,
    },
  ];

  const renderHoldings = (refreshVersion = 0) => {
    return render(
      <GeneralContext.Provider value={{ refreshVersion }}>
        <Holdings />
      </GeneralContext.Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockResolvedValue({ data: mockHoldings });
  });

  test("renders the holdings table headings", () => {
    renderHoldings();

    expect(screen.getByText("Instrument")).toBeInTheDocument();
    expect(screen.getByText("Qty.")).toBeInTheDocument();
    expect(screen.getByText("Avg. cost")).toBeInTheDocument();
    expect(screen.getByText("LTP")).toBeInTheDocument();
    expect(screen.getByText("Cur. val")).toBeInTheDocument();
    expect(screen.getByText("Net chg.")).toBeInTheDocument();
    expect(screen.getByText("Day chg.")).toBeInTheDocument();
  });

  test("fetches holdings from the API", async () => {
    renderHoldings();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(`${API_URL}/allHoldings`, {
        withCredentials: true,
      });
    });
  });

  test("displays holdings returned by the API", async () => {
    renderHoldings();

    expect(await screen.findByText("Holdings (2)")).toBeInTheDocument();
    expect(screen.getByText("INFY")).toBeInTheDocument();
    expect(screen.getByText("TCS")).toBeInTheDocument();

    expect(screen.getByText("120.00")).toBeInTheDocument();
    expect(screen.getAllByText("180.00")).toHaveLength(2);
  });

  test("calculates total investment correctly", async () => {
    renderHoldings();

    await screen.findByText("Holdings (2)");

    expect(screen.getByText("400.00")).toBeInTheDocument();
    expect(screen.getByText("Total investment")).toBeInTheDocument();
  });

  test("calculates current value correctly", async () => {
    renderHoldings();

    await screen.findByText("Holdings (2)");

    expect(screen.getByText("420.00")).toBeInTheDocument();
    expect(screen.getByText("Current value")).toBeInTheDocument();
  });

  test("calculates total profit and loss correctly", async () => {
    renderHoldings();

    await screen.findByText("Holdings (2)");

    expect(screen.getByText("20.00 (5.00%)")).toBeInTheDocument();
    expect(screen.getAllByText("P&L")).toHaveLength(2);
  });

  test("applies profit and loss classes to stock rows", async () => {
    renderHoldings();

    await screen.findByText("Holdings (2)");

    const infyProfit = screen.getByText("40.00");
    const tcsLoss = screen.getByText("-20.00");

    expect(infyProfit).toHaveClass("profit");
    expect(tcsLoss).toHaveClass("loss");
  });

  test("renders the vertical graph", () => {
    renderHoldings();

    expect(screen.getByText("Vertical Graph")).toBeInTheDocument();
  });

  test("refetches holdings when refreshVersion changes", async () => {
    const { rerender } = renderHoldings(0);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    rerender(
      <GeneralContext.Provider value={{ refreshVersion: 1 }}>
        <Holdings />
      </GeneralContext.Provider>,
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(2);
    });
  });

  test("handles an API request failure without crashing", async () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    axios.get.mockRejectedValueOnce(new Error("Request failed"));

    renderHoldings();

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        "Error fetching holdings:",
        expect.any(Error),
      );
    });

    expect(screen.getByText("Holdings (0)")).toBeInTheDocument();

    consoleError.mockRestore();
  });
});
