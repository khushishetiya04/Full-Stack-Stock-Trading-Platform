import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import API_URL from "../api";
import GeneralContext from "./GeneralContext";

const Summary = () => {
  const [userName, setUserName] = useState("");
  const [allHoldings, setAllHoldings] = useState([]);
  const [availableBalance, setAvailableBalance] = useState(0);

  const { refreshVersion } = useContext(GeneralContext);

  const openingBalance = 100000;

  useEffect(() => {
    axios
      .get(`${API_URL}/api/auth/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUserName(res.data.user.name);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/allHoldings`, {
        withCredentials: true,
      })
      .then((res) => {
        setAllHoldings(res.data);
      })
      .catch((error) => {
        console.error("Error fetching holdings:", error);
      });

    axios
      .get(`${API_URL}/api/funds`, {
        withCredentials: true,
      })
      .then((res) => {
        const balance = Number(res.data.availableBalance) || 0;
        setAvailableBalance(balance);
      })
      .catch((error) => {
        console.error("Error fetching funds:", error);
      });
  }, [refreshVersion]);

  const totalInvestment = allHoldings.reduce(
    (total, stock) => total + Number(stock.avg) * Number(stock.qty),
    0,
  );

  const currentValue = allHoldings.reduce(
    (total, stock) => total + Number(stock.price) * Number(stock.qty),
    0,
  );

  const totalPnL = currentValue - totalInvestment;

  const totalPortfolioValue = availableBalance + currentValue;

  const overallPnL = totalPortfolioValue - openingBalance;

  const overallPnLPercentage =
    openingBalance > 0 ? (overallPnL / openingBalance) * 100 : 0;

  const pnlPercentage =
    totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

  const marginsUsed = totalInvestment;

  const formatAmount = (amount) =>
    amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const formatCompact = (amount) => {
    if (Math.abs(amount) >= 100000) {
      return (amount / 100000).toFixed(2) + "L";
    }

    if (Math.abs(amount) >= 1000) {
      return (amount / 1000).toFixed(2) + "k";
    }

    return formatAmount(amount);
  };

  return (
    <>
      <div className="username">
        <h6>Hi, {userName || "User"}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>
              {availableBalance.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
            <p>Margin available</p>
          </div>

          <hr />

          <div className="second">
            <p>
              Margins used <span>{formatCompact(marginsUsed)}</span>
            </p>

            <p>
              Opening balance <span>{formatCompact(openingBalance)}</span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({allHoldings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={totalPnL >= 0 ? "profit" : "loss"}>
              {formatCompact(totalPnL)}{" "}
              <small>
                {totalInvestment > 0
                  ? `${totalPnL >= 0 ? "+" : ""}${pnlPercentage.toFixed(2)}%`
                  : "0.00%"}
              </small>
            </h3>

            <p>P&amp;L</p>
          </div>

          <hr />

          <div className="second">
            <p>
              Current Value <span>{formatCompact(currentValue)}</span>
            </p>

            <p>
              Investment <span>{formatCompact(totalInvestment)}</span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>
      <div className="section">
        <span>
          <p>Portfolio Overview</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{formatAmount(totalPortfolioValue)}</h3>
            <p>Total Portfolio Value</p>
          </div>

          <hr />

          <div className="second">
            <p>
              Available Balance
              <span>{formatCompact(availableBalance)}</span>
            </p>

            <p>
              Current Holdings Value
              <span>{formatCompact(currentValue)}</span>
            </p>

            <p>
              Overall P&amp;L
              <span className={overallPnL >= 0 ? "profit" : "loss"}>
                {overallPnL >= 0 ? "+" : ""}
                {formatAmount(overallPnL)}
                {" ("}
                {overallPnL >= 0 ? "+" : ""}
                {overallPnLPercentage.toFixed(2)}%{")"}
              </span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
