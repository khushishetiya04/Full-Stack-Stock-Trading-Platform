import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import API_URL from "../api";
import GeneralContext from "./GeneralContext";

const Funds = () => {
  const [availableBalance, setAvailableBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { refreshVersion } = useContext(GeneralContext);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError("");

    axios
      .get(`${API_URL}/api/funds`, {
        withCredentials: true,
      })
      .then((res) => {
        if (active) {
          setAvailableBalance(Number(res.data.availableBalance) || 0);
        }
      })
      .catch((error) => {
        console.error("Error fetching funds:", error);

        if (active) {
          setError("Unable to load funds. Please try again.");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [refreshVersion]);

  const formattedBalance = availableBalance.toLocaleString("en-IN", {
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
        <Link className="btn btn-green">Add funds</Link>
        <Link className="btn btn-blue">Withdraw</Link>
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
              <p className="imp">0.00</p>
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
            <Link className="btn btn-blue">Open Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
