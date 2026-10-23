import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

import Orders from "../components/Orders";
import GeneralContext from "../components/GeneralContext";
import API_URL from "../api";

jest.mock("axios");

describe("Orders Component", () => {
  const mockOrders = [
    {
      _id: "1",
      name: "INFY",
      qty: 2,
      price: 100,
      mode: "BUY",
      createdAt: "2026-01-15T10:30:00.000Z",
    },
    {
      _id: "2",
      name: "TCS",
      qty: 1,
      price: 200,
      mode: "SELL",
      createdAt: "2026-01-16T11:00:00.000Z",
    },
  ];

  const renderOrders = (refreshVersion = 0) =>
    render(
      <MemoryRouter>
        <GeneralContext.Provider value={{ refreshVersion }}>
          <Orders />
        </GeneralContext.Provider>
      </MemoryRouter>,
    );

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockResolvedValue({ data: mockOrders });
  });

  test("shows loading message while fetching orders", () => {
    axios.get.mockReturnValue(new Promise(() => {}));

    renderOrders();

    expect(screen.getByText("Loading orders...")).toBeInTheDocument();
  });

  test("fetches orders from the API", async () => {
    renderOrders();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(`${API_URL}/allOrders`, {
        withCredentials: true,
      });
    });
  });

  test("displays orders returned by the API", async () => {
    renderOrders();

    expect(await screen.findByText("Orders (2)")).toBeInTheDocument();
    expect(screen.getByText("INFY")).toBeInTheDocument();
    expect(screen.getByText("TCS")).toBeInTheDocument();
    expect(screen.getByText("BUY")).toBeInTheDocument();
    expect(screen.getByText("SELL")).toBeInTheDocument();
  });

  test("displays order table headings", async () => {
    renderOrders();

    expect(await screen.findByText("Stock")).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Total Order Value")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
  });

  test("calculates and displays total order values", async () => {
    renderOrders();

    const twoHundredValues = await screen.findAllByText("₹200.00");

    expect(twoHundredValues).toHaveLength(3);
    expect(screen.getByText("₹100.00")).toBeInTheDocument();
  });

  test("applies the correct classes to buy and sell orders", async () => {
    renderOrders();

    const buyOrder = await screen.findByText("BUY");
    const sellOrder = screen.getByText("SELL");

    expect(buyOrder).toHaveClass("buy-order");
    expect(sellOrder).toHaveClass("sell-order");
  });

  test("displays order dates", async () => {
    renderOrders();

    await screen.findByText("Orders (2)");

    expect(
      screen.getByText(
        new Date(mockOrders[0].createdAt).toLocaleString("en-IN"),
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        new Date(mockOrders[1].createdAt).toLocaleString("en-IN"),
      ),
    ).toBeInTheDocument();
  });

  test("shows an empty state when there are no orders", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    renderOrders();

    expect(
      await screen.findByText("You haven't placed any orders yet"),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Get started" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  test("shows the API error message when the request fails", async () => {
    axios.get.mockRejectedValueOnce({
      response: {
        data: { message: "Unable to load order history." },
      },
    });

    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    renderOrders();

    expect(
      await screen.findByText("Unable to load order history."),
    ).toBeInTheDocument();

    consoleError.mockRestore();
  });

  test("shows a fallback error message when no API message is provided", async () => {
    axios.get.mockRejectedValueOnce(new Error("Network error"));

    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    renderOrders();

    expect(
      await screen.findByText("Unable to fetch orders."),
    ).toBeInTheDocument();

    consoleError.mockRestore();
  });

  test("refetches orders when refreshVersion changes", async () => {
    const { rerender } = renderOrders(0);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    rerender(
      <MemoryRouter>
        <GeneralContext.Provider value={{ refreshVersion: 1 }}>
          <Orders />
        </GeneralContext.Provider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(2);
    });
  });
});
