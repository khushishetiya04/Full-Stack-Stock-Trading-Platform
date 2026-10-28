import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 text-center">
        <h1>Zerodha Charges</h1>
        <h3 className="text-muted mt-3 fs-5">List of all charges and taxes</h3>
      </div>
      <div className="row p-5 mt-3 text-center">
        <div className="col-4 p-4">
          <img
            src="/media/pricingequity.svg"
            alt="Equity brokerage pricing illustration"
          />
          <h1 className="fs-3">Free equity delivery</h1>
          <p className="text-muted">
            Zerodha offers ₹0 brokerage on equity delivery trades, subject to
            its applicable terms and charges.
          </p>
        </div>

        <div className="col-4 p-4">
          <img
            src="/media/intradayTrades.svg"
            alt="Intraday trading illustration"
          />
          <h1 className="fs-3">Intraday and F&O trades</h1>
          <p className="text-muted">
            Flat ₹ 20 or 0.03% (whichever is lower) per executed order on
            intraday trades across equity, currency, and commodity trades. Flat
            ₹20 on all option trades.
          </p>
        </div>

        <div className="col-4 p-4">
          <img
            src="/media/pricingequity.svg"
            alt="Equity brokerage pricing illustration"
          />
          <h1 className="fs-3">Free direct MF</h1>
          <p className="text-muted">
            Zerodha offers direct mutual fund investments with ₹0 commission.
            Applicable statutory and other charges may still apply.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
