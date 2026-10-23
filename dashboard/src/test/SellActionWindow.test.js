import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";

import API_URL from "../api";
import GeneralContext from "../components/GeneralContext";
import SellActionWindow from "../components/SellActionWindow";

jest.mock("axios");

describe("SellActionWindow Component", () => {
  let closeSellWindow;
  let refreshData;

  const renderSellActionWindow = (uid = "TCS") => {
    return render(
      <GeneralContext.Provider
        value={{
          closeSellWindow,
          refreshData,
        }}
      >
        <SellActionWindow uid={uid} />
      </GeneralContext.Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    closeSellWindow = jest.fn();
    refreshData = jest.fn();
  });

  test("renders the sell window and its controls", () => {
    renderSellActionWindow();

    expect(screen.getByText("Qty.")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sell" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByText(/Sale value/)).toBeInTheDocument();
  });

  test("uses the default quantity and price", () => {
    renderSellActionWindow();

    expect(document.querySelector("#sell-qty")).toHaveValue(1);
    expect(document.querySelector("#sell-price")).toHaveValue(0);
    expect(screen.getByText(/₹0\.00/)).toBeInTheDocument();
  });

  test("updates quantity, price, and sale value", () => {
    renderSellActionWindow();

    fireEvent.change(document.querySelector("#sell-qty"), {
      target: { value: "4" },
    });

    fireEvent.change(document.querySelector("#sell-price"), {
      target: { value: "150.50" },
    });

    expect(document.querySelector("#sell-qty")).toHaveValue(4);
    expect(document.querySelector("#sell-price")).toHaveValue(150.5);
    expect(screen.getByText(/₹602\.00/)).toBeInTheDocument();
  });

  test("shows an error when quantity is not a positive integer", async () => {
    renderSellActionWindow();

    fireEvent.change(document.querySelector("#sell-qty"), {
      target: { value: "1.5" },
    });

    fireEvent.change(document.querySelector("#sell-price"), {
      target: { value: "100" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sell" }));

    expect(
      await screen.findByText("Please enter a valid quantity."),
    ).toBeInTheDocument();

    expect(axios.post).not.toHaveBeenCalled();
    expect(refreshData).not.toHaveBeenCalled();
    expect(closeSellWindow).not.toHaveBeenCalled();
  });

  test("shows an error when price is zero", async () => {
    renderSellActionWindow();

    fireEvent.click(screen.getByRole("button", { name: "Sell" }));

    expect(
      await screen.findByText("Please enter a price greater than 0."),
    ).toBeInTheDocument();

    expect(axios.post).not.toHaveBeenCalled();
  });

  test("places a sell order with the correct data", async () => {
    axios.post.mockResolvedValue({ data: { message: "Order placed" } });

    renderSellActionWindow("RELIANCE");

    fireEvent.change(document.querySelector("#sell-qty"), {
      target: { value: "3" },
    });

    fireEvent.change(document.querySelector("#sell-price"), {
      target: { value: "250" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sell" }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${API_URL}/neworder`,
        {
          name: "RELIANCE",
          qty: 3,
          price: 250,
          mode: "SELL",
        },
        {
          withCredentials: true,
        },
      );
    });

    await waitFor(() => {
      expect(refreshData).toHaveBeenCalledTimes(1);
      expect(closeSellWindow).toHaveBeenCalledTimes(1);
    });
  });

  test("shows the loading state while the order is being submitted", async () => {
    let resolveRequest;

    axios.post.mockReturnValue(
      new Promise((resolve) => {
        resolveRequest = resolve;
      }),
    );

    renderSellActionWindow();

    fireEvent.change(document.querySelector("#sell-price"), {
      target: { value: "100" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sell" }));

    expect(
      await screen.findByRole("button", { name: "Selling..." }),
    ).toBeDisabled();

    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();

    resolveRequest({ data: { message: "Order placed" } });

    await waitFor(() => {
      expect(closeSellWindow).toHaveBeenCalledTimes(1);
    });
  });

  test("displays the API error message when the request fails", async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          message: "Insufficient holdings",
        },
      },
    });

    renderSellActionWindow();

    fireEvent.change(document.querySelector("#sell-price"), {
      target: { value: "100" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sell" }));

    expect(
      await screen.findByText("Insufficient holdings"),
    ).toBeInTheDocument();

    expect(refreshData).not.toHaveBeenCalled();
    expect(closeSellWindow).not.toHaveBeenCalled();
  });

  test("displays a fallback error when the API has no message", async () => {
    axios.post.mockRejectedValue(new Error("Network error"));

    renderSellActionWindow();

    fireEvent.change(document.querySelector("#sell-price"), {
      target: { value: "100" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sell" }));

    expect(
      await screen.findByText("Unable to place sell order."),
    ).toBeInTheDocument();

    expect(refreshData).not.toHaveBeenCalled();
    expect(closeSellWindow).not.toHaveBeenCalled();
  });

  test("closes the sell window when Cancel is clicked", () => {
    renderSellActionWindow();

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(closeSellWindow).toHaveBeenCalledTimes(1);
    expect(axios.post).not.toHaveBeenCalled();
  });
});
