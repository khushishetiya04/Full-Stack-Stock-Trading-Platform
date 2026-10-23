import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import WatchList from "../components/WatchList";
import GeneralContext from "../components/GeneralContext";
import { watchlist } from "../data/data";

jest.mock("../components/DoughnoutChart", () => ({
  DoughnoutChart: () => <div>Doughnut Chart</div>,
}));

describe("WatchList Component", () => {
  const mockOpenBuyWindow = jest.fn();
  const mockOpenSellWindow = jest.fn();

  const renderWatchList = () => {
    return render(
      <GeneralContext.Provider
        value={{
          openBuyWindow: mockOpenBuyWindow,
          openSellWindow: mockOpenSellWindow,
        }}
      >
        <WatchList />
      </GeneralContext.Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the search input and stock count", () => {
    renderWatchList();

    expect(screen.getByRole("textbox")).toBeInTheDocument();

    expect(
      screen.getByText(`${watchlist.length} / ${watchlist.length} stocks`),
    ).toBeInTheDocument();
  });

  test("renders all stocks from the watchlist data", () => {
    renderWatchList();

    watchlist.forEach((stock) => {
      expect(screen.getByText(stock.name)).toBeInTheDocument();
    });
  });

  test("filters stocks based on the search term", () => {
    renderWatchList();

    const searchInput = screen.getByRole("textbox");
    const firstStock = watchlist[0];

    fireEvent.change(searchInput, {
      target: { value: firstStock.name },
    });

    expect(screen.getByText(firstStock.name)).toBeInTheDocument();

    expect(
      screen.getByText(`1 / ${watchlist.length} stocks`),
    ).toBeInTheDocument();
  });

  test("search is case-insensitive", () => {
    renderWatchList();

    const firstStock = watchlist[0];

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: firstStock.name.toLowerCase() },
    });

    expect(screen.getByText(firstStock.name)).toBeInTheDocument();
  });

  test("shows no stocks when the search does not match", () => {
    renderWatchList();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "zzznomatch999" },
    });

    expect(
      screen.getByText(`0 / ${watchlist.length} stocks`),
    ).toBeInTheDocument();

    watchlist.forEach((stock) => {
      expect(screen.queryByText(stock.name)).not.toBeInTheDocument();
    });
  });

  test("renders the doughnut chart", () => {
    renderWatchList();

    expect(screen.getByText("Doughnut Chart")).toBeInTheDocument();
  });

  test("shows Buy and Sell actions when hovering over a stock", () => {
    renderWatchList();

    const firstStock = watchlist[0];
    const stockItem = screen.getByText(firstStock.name).closest("li");

    fireEvent.mouseEnter(stockItem);

    expect(screen.getByRole("button", { name: "Buy (B)" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Sell (S)" }),
    ).toBeInTheDocument();
  });

  test("opens the buy window for the selected stock", () => {
    renderWatchList();

    const firstStock = watchlist[0];
    const stockItem = screen.getByText(firstStock.name).closest("li");

    fireEvent.mouseEnter(stockItem);
    fireEvent.click(screen.getByRole("button", { name: "Buy (B)" }));

    expect(mockOpenBuyWindow).toHaveBeenCalledWith(firstStock.name);
  });

  test("opens the sell window for the selected stock", () => {
    renderWatchList();

    const firstStock = watchlist[0];
    const stockItem = screen.getByText(firstStock.name).closest("li");

    fireEvent.mouseEnter(stockItem);
    fireEvent.click(screen.getByRole("button", { name: "Sell (S)" }));

    expect(mockOpenSellWindow).toHaveBeenCalledWith(firstStock.name);
  });

  test("hides Buy and Sell actions when the pointer leaves a stock", () => {
    renderWatchList();

    const firstStock = watchlist[0];
    const stockItem = screen.getByText(firstStock.name).closest("li");

    fireEvent.mouseEnter(stockItem);

    expect(screen.getByRole("button", { name: "Buy (B)" })).toBeInTheDocument();

    fireEvent.mouseLeave(stockItem);

    expect(
      screen.queryByRole("button", { name: "Buy (B)" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Sell (S)" }),
    ).not.toBeInTheDocument();
  });
});
