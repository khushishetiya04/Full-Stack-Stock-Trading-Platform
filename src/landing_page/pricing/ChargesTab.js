import React, { useState } from "react";

import EquityCharges from "./EquityCharges";
import CurrencyCharges from "./CurrencyCharges";
import CommodityCharges from "./CommodityCharges";

function ChargesTabs() {
  const [activeTab, setActiveTab] = useState("equity");

  return (
    <div className="container mt-5">

      {/* Tabs */}
      <div className="row mb-5 border-bottom">
        <div className="col">

          <button
            className={`btn ${
              activeTab === "equity"
                ? "text-primary"
                : "text-muted"
            }`}
            onClick={() => setActiveTab("equity")}
          >
            Equity
          </button>

          <button
            className={`btn ${
              activeTab === "currency"
                ? "text-primary"
                : "text-muted"
            }`}
            onClick={() => setActiveTab("currency")}
          >
            Currency
          </button>

          <button
            className={`btn ${
              activeTab === "commodity"
                ? "text-primary"
                : "text-muted"
            }`}
            onClick={() => setActiveTab("commodity")}
          >
            Commodity
          </button>

        </div>
      </div>

      {/* Selected table only */}
      {activeTab === "equity" && <EquityCharges />}

      {activeTab === "currency" && <CurrencyCharges />}

      {activeTab === "commodity" && <CommodityCharges />}

      {/* Brokerage Calculator */}
      <div className="text-center mt-5 mb-5">
        <a
          href="https://zerodha.com/brokerage-calculator"
          style={{ textDecoration: "none" }}
        >
          Calculate your costs upfront using our brokerage calculator
        </a>
      </div>

    </div>
  );
}

export default ChargesTabs;