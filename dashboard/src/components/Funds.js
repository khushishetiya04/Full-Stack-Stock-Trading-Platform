import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Funds = () => {
  const [availableBalance, setAvailableBalance] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3002/api/funds", {
        withCredentials: true,
      })
      .then((res) => {
        setAvailableBalance(res.data.availableBalance);
      })
      .catch((error) => {
        console.error("Error fetching funds:", error);
      });
  }, []);

  const formattedBalance = availableBalance.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

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
