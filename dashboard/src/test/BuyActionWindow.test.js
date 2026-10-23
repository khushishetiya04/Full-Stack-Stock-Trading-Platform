import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";

import API_URL from "../api";
import GeneralContext from "../components/GeneralContext";
import BuyActionWindow from "../components/BuyActionWindow";

jest.mock("axios");

describe("BuyActionWindow Component", () => {
  let closeBuyWindow;
  let refreshData;

  const renderBuyActionWindow = (uid = "TCS") => {
    return render(
      <GeneralContext.Provider
        value={{
          closeBuyWindow,
          refreshData,
        }}
      >
        <BuyActionWindow uid={uid} />
      </GeneralContext.Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    closeBuyWindow = jest.fn();
    refreshData = jest.fn();
  });

  test("renders the buy window and its controls", () => {
    renderBuyActionWindow();

    expect(screen.getByText("Qty.")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Buy" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByText(/Margin required/)).toBeInTheDocument();
  });

  test("uses the default quantity and price", () => {
    renderBuyActionWindow();

    expect(document.querySelector("#qty")).toHaveValue(1);
    expect(document.querySelector("#price")).toHaveValue(0);
    expect(screen.getByText(/₹0\.00/)).toBeInTheDocument();
  });

  test("updates quantity, price, and required margin", () => {
    renderBuyActionWindow();

    fireEvent.change(document.querySelector("#qty"), {
      target: { value: "5" },
    });

    fireEvent.change(document.querySelector("#price"), {
      target: { value: "120.50" },
    });

    expect(document.querySelector("#qty")).toHaveValue(5);
    expect(document.querySelector("#price")).toHaveValue(120.5);
    expect(screen.getByText(/₹602\.50/)).toBeInTheDocument();
  });

  test("shows an error when quantity is not a positive integer", async () => {
    renderBuyActionWindow();

    fireEvent.change(document.querySelector("#qty"), {
      target: { value: "1.5" },
    });

    fireEvent.change(document.querySelector("#price"), {
      target: { value: "100" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Buy" }));

    expect(
      await screen.findByText("Please enter a valid quantity."),
    ).toBeInTheDocument();

    expect(axios.post).not.toHaveBeenCalled();
    expect(refreshData).not.toHaveBeenCalled();
    expect(closeBuyWindow).not.toHaveBeenCalled();
  });

  test("shows an error when price is zero", async () => {
    renderBuyActionWindow();

    fireEvent.click(screen.getByRole("button", { name: "Buy" }));

    expect(
      await screen.findByText("Please enter a price greater than 0."),
    ).toBeInTheDocument();

    expect(axios.post).not.toHaveBeenCalled();
  });

  test("places a buy order with the correct data", async () => {
    axios.post.mockResolvedValue({ data: { message: "Order placed" } });

    renderBuyActionWindow("RELIANCE");

    fireEvent.change(document.querySelector("#qty"), {
      target: { value: "3" },
    });

    fireEvent.change(document.querySelector("#price"), {
      target: { value: "250" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Buy" }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${API_URL}/neworder`,
        {
          name: "RELIANCE",
          qty: 3,
          price: 250,
          mode: "BUY",
        },
        {
          withCredentials: true,
        },
      );
    });

    await waitFor(() => {
      expect(refreshData).toHaveBeenCalledTimes(1);
      expect(closeBuyWindow).toHaveBeenCalledTimes(1);
    });
  });

  test("shows the loading state while the order is being submitted", async () => {
    let resolveRequest;

    axios.post.mockReturnValue(
      new Promise((resolve) => {
        resolveRequest = resolve;
      }),
    );

    renderBuyActionWindow();

    fireEvent.change(document.querySelector("#price"), {
      target: { value: "100" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Buy" }));

    expect(
      await screen.findByRole("button", { name: "Buying..." }),
    ).toBeDisabled();

    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();

    resolveRequest({ data: { message: "Order placed" } });

    await waitFor(() => {
      expect(closeBuyWindow).toHaveBeenCalledTimes(1);
    });
  });

  test("displays the API error message when the request fails", async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          message: "Insufficient funds",
        },
      },
    });

    renderBuyActionWindow();

    fireEvent.change(document.querySelector("#price"), {
      target: { value: "100" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Buy" }));

    expect(await screen.findByText("Insufficient funds")).toBeInTheDocument();

    expect(refreshData).not.toHaveBeenCalled();
    expect(closeBuyWindow).not.toHaveBeenCalled();
  });

  test("displays a fallback error when the API has no message", async () => {
    axios.post.mockRejectedValue(new Error("Network error"));

    renderBuyActionWindow();

    fireEvent.change(document.querySelector("#price"), {
      target: { value: "100" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Buy" }));

    expect(
      await screen.findByText("Unable to place buy order."),
    ).toBeInTheDocument();

    expect(refreshData).not.toHaveBeenCalled();
    expect(closeBuyWindow).not.toHaveBeenCalled();
  });

  test("closes the buy window when Cancel is clicked", () => {
    renderBuyActionWindow();

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(closeBuyWindow).toHaveBeenCalledTimes(1);
    expect(axios.post).not.toHaveBeenCalled();
  });
});
