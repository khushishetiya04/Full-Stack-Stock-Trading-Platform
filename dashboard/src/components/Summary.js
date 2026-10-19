// import React from "react";

// const Summary = () => {
//   return (
//     <>
//       <div className="username">
//         <h6>Hi, User!</h6>
//         <hr className="divider" />
//       </div>

//       <div className="section">
//         <span>
//           <p>Equity</p>
//         </span>

//         <div className="data">
//           <div className="first">
//             <h3>3.74k</h3>
//             <p>Margin available</p>
//           </div>
//           <hr />

//           <div className="second">
//             <p>
//               Margins used <span>0</span>{" "}
//             </p>
//             <p>
//               Opening balance <span>3.74k</span>{" "}
//             </p>
//           </div>
//         </div>
//         <hr className="divider" />
//       </div>

//       <div className="section">
//         <span>
//           <p>Holdings (13)</p>
//         </span>

//         <div className="data">
//           <div className="first">
//             <h3 className="profit">
//               1.55k <small>+5.20%</small>{" "}
//             </h3>
//             <p>P&L</p>
//           </div>
//           <hr />

//           <div className="second">
//             <p>
//               Current Value <span>31.43k</span>{" "}
//             </p>
//             <p>
//               Investment <span>29.88k</span>{" "}
//             </p>
//           </div>
//         </div>
//         <hr className="divider" />
//       </div>
//     </>
//   );
// };

// export default Summary;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = () => {
  const [userName, setUserName] = useState("");
  const [allHoldings, setAllHoldings] = useState([]);
  const [availableBalance, setAvailableBalance] = useState(0);

  const openingBalance = 100000;

  useEffect(() => {
    // Fetch logged-in user
    axios
      .get("http://localhost:3002/api/auth/me", {
        withCredentials: true,
      })
      .then((res) => {
        setUserName(res.data.user.name);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });

    // Fetch holdings
    axios
      .get("http://localhost:3002/allHoldings", {
        withCredentials: true,
      })
      .then((res) => {
        setAllHoldings(res.data);
      })
      .catch((error) => {
        console.error("Error fetching holdings:", error);
      });

    // Fetch current available funds
    axios
      .get("http://localhost:3002/api/funds", {
        withCredentials: true,
      })
      .then((res) => {
        const balance = Number(res.data.availableBalance) || 0;

        console.log("Balance received:", balance);

        setAvailableBalance(balance);
      })
      .catch((error) => {
        console.error("Error fetching funds:", error);
      });
  }, []);

  const totalInvestment = allHoldings.reduce(
    (total, stock) => total + Number(stock.avg) * Number(stock.qty),
    0,
  );

  const currentValue = allHoldings.reduce(
    (total, stock) => total + Number(stock.price) * Number(stock.qty),
    0,
  );

  const totalPnL = currentValue - totalInvestment;

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

            <p>P&L</p>
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
    </>
  );
};

export default Summary;
