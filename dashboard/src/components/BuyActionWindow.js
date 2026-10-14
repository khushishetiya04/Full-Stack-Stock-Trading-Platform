import React, { useState, useContext } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isBuying, setIsBuying] = useState(false);

  const { closeBuyWindow } = useContext(GeneralContext);

  const handleBuyClick = async () => {
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
      setIsBuying(true);
      setErrorMessage("");

      await axios.post(
        "http://localhost:3002/neworder",
        {
          name: uid,
          qty: quantity,
          price,
          mode: "BUY",
        },
        {
          withCredentials: true,
        },
      );

      closeBuyWindow();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Unable to place buy order.",
      );
    } finally {
      setIsBuying(false);
    }
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              step="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              min="0.01"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>

        {errorMessage && (
          <p className="text-danger mt-2 mb-0">{errorMessage}</p>
        )}
      </div>

      <div className="buttons">
        <span>
          Margin required ₹
          {(Number(stockQuantity) * Number(stockPrice)).toFixed(2)}
        </span>

        <div>
          <button
            type="button"
            className="btn btn-blue"
            onClick={handleBuyClick}
            disabled={isBuying}
          >
            {isBuying ? "Buying..." : "Buy"}
          </button>

          <button
            type="button"
            className="btn btn-grey"
            onClick={handleCancelClick}
            disabled={isBuying}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
