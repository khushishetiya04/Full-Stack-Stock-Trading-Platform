import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import API_URL from "../api";
import GeneralContext from "./GeneralContext";

const Funds = () => {
  const [availableBalance, setAvailableBalance] = useState(0);
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [holdingsError, setHoldingsError] = useState("");

  const { refreshVersion } = useContext(GeneralContext);

  useEffect(() => {
    let active = true;

    const fetchFundsData = async () => {
      setLoading(true);
      setError("");
      setHoldingsError("");

      try {
        const [holdingsResult, fundsResult] = await Promise.allSettled([
          axios.get(`${API_URL}/allHoldings`, {
            withCredentials: true,
          }),
          axios.get(`${API_URL}/api/funds`, {
            withCredentials: true,
          }),
        ]);

        if (!active) return;

        if (holdingsResult.status === "fulfilled") {
          setAllHoldings(holdingsResult.value.data);
        } else {
          console.error("Error fetching holdings:", holdingsResult.reason);
          setHoldingsError("Unable to load used margin.");
        }

        if (fundsResult.status === "fulfilled") {
          setAvailableBalance(
            Number(fundsResult.value.data.availableBalance) || 0,
          );
        } else {
          console.error("Error fetching funds:", fundsResult.reason);
          setError("Unable to load funds. Please try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchFundsData();

    return () => {
      active = false;
    };
  }, [refreshVersion]);

  const formattedBalance = availableBalance.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const marginsUsed = allHoldings.reduce(
    (total, stock) => total + Number(stock.avg) * Number(stock.qty),
    0,
  );

  const formattedMarginsUsed = marginsUsed.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (loading) {
    return <p>Loading funds...</p>;
  }

  if (error) {
    return (
      <p role="alert" className="text-danger">
        {error}
      </p>
    );
  }

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>

        <button type="button" className="btn btn-green" disabled>
          Add funds
        </button>

        <button type="button" className="btn btn-blue" disabled>
          Withdraw
        </button>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">{formattedBalance}</p>
            </div>

            <div className="data">
              <p>Used margin</p>
              <p className="imp">{holdingsError || formattedMarginsUsed}</p>
            </div>

            <div className="data">
              <p>Available cash</p>
              <p className="imp">{formattedBalance}</p>
            </div>

            <hr />

            <div className="data">
              <p>Opening Balance</p>
              <p>1,00,000.00</p>
            </div>

            <div className="data">
              <p>Payin</p>
              <p>0.00</p>
            </div>

            <div className="data">
              <p>SPAN</p>
              <p>0.00</p>
            </div>

            <div className="data">
              <p>Delivery margin</p>
              <p>0.00</p>
            </div>

            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>

            <div className="data">
              <p>Options premium</p>
              <p>0.00</p>
            </div>

            <hr />

            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>

            <div className="data">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>

            <div className="data">
              <p>Total Collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>

            <button type="button" className="btn btn-blue" disabled>
              Open Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
