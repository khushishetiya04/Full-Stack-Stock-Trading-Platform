import React, { useState, useContext } from "react";
import axios from "axios";

import API_URL from "../api";
import GeneralContext from "./GeneralContext";
import "./SellActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSelling, setIsSelling] = useState(false);

  const { closeSellWindow, refreshData } = useContext(GeneralContext);

  const handleSellClick = async () => {
    const quantity = Number(stockQuantity);
    const price = Number(stockPrice);

    if (!Number.isInteger(quantity) || quantity <= 0) {
      setErrorMessage("Please enter a valid quantity.");
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      setErrorMessage("Please enter a price greater than 0.");
      return;
    }

    try {
      setIsSelling(true);
      setErrorMessage("");

      await axios.post(
        `${API_URL}/neworder`,
        {
          name: uid,
          qty: quantity,
          price,
          mode: "SELL",
        },
        {
          withCredentials: true,
        },
      );

      refreshData();
      closeSellWindow();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Unable to place sell order.",
      );
    } finally {
      setIsSelling(false);
    }
  };

  const handleCancelClick = () => {
    closeSellWindow();
  };

  return (
    <div className="container" id="sell-window">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="sell-qty"
              min="1"
              step="1"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="sell-price"
              min="0.01"
              step="0.05"
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
            />
          </fieldset>
        </div>

        {errorMessage && (
          <p className="text-danger mt-2 mb-0">{errorMessage}</p>
        )}
      </div>

      <div className="buttons">
        <span>
          Sale value ₹{(Number(stockQuantity) * Number(stockPrice)).toFixed(2)}
        </span>

        <div>
          <button
            type="button"
            className="btn btn-blue"
            onClick={handleSellClick}
            disabled={isSelling}
          >
            {isSelling ? "Selling..." : "Sell"}
          </button>

          <button
            type="button"
            className="btn btn-grey"
            onClick={handleCancelClick}
            disabled={isSelling}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
