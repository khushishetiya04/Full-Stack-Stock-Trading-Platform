import React from "react";

function EquityCharges() {
  return (
    <div>
      <div className="mt-4">
        {/* Header */}
        <div className="row border-top border-start border-end border-bottom">
          <div style={{ width: "16.67%" }}>
            <p className="mb-0 py-3">
              <strong></strong>
            </p>
          </div>
          <div style={{ width: "20.83%" }}>
            <p className="mb-0 py-3">
              <strong>Equity delivery</strong>
            </p>
          </div>
          <div style={{ width: "20.83%" }}>
            <p className="mb-0 py-3">
              <strong>Equity intraday</strong>
            </p>
          </div>
          <div style={{ width: "20.83%" }}>
            <p className="mb-0 py-3">
              <strong>F&O - Futures</strong>
            </p>
          </div>
          <div style={{ width: "20.83%" }}>
            <p className="mb-0 py-3">
              <strong>F&O - Options</strong>
            </p>
          </div>
        </div>
        {/* Brokerage */}
        <div className="row border-start border-end">
          <div style={{ width: "16.67%" }}>
            <p className="mb-0 py-3">Brokerage</p>
          </div>
          <div style={{ width: "20.83%" }}>
            <p className="mb-0 py-3">Zero Brokerage</p>
          </div>
          <div style={{ width: "20.83%" }}>
            <p className="mb-0 py-3">
              0.03% or Rs. 20/executed order whichever is lower
            </p>
          </div>
          <div style={{ width: "20.83%" }}>
            <p className="mb-0 py-3">
              0.03% or Rs. 20/executed order whichever is lower
            </p>
          </div>
          <div style={{ width: "20.83%" }}>
            <p className="mb-0 py-3">Flat Rs. 20 per executed order</p>
          </div>
        </div>
        {/* STT/CTT */}
        <div className="row border-start border-end">
          <div style={{ width: "16.67%" }}>
            <p className="mb-0 py-3">STT/CTT</p>
          </div>
          <div style={{ width: "20.83%" }}>
            <p className="mb-0 py-3">0.1% on buy & sell</p>
          </div>
          <div style={{ width: "20.83%" }}>
            <p className="mb-0 py-3">0.025% on the sell side</p>
          </div>
          <div style={{ width: "20.83%" }}>
            <p className="mb-0 py-3">0.05% on the sell side</p>
          </div>
          <div style={{ width: "20.83%" }}>
            <ul className="mb-0 py-3">
              <li>
                0.15% of the intrinsic value on options that are bought and
                exercised
              </li>
              <li>0.15% on sell side (on premium)</li>
            </ul>
          </div>
        </div>
        {/* Transaction charges */}
        <div className="row border-start border-end">
          <div style={{ width: "16.67%" }}>
            <p className="mb-0 py-3">Transaction charges</p>
          </div>
          <div style={{ width: "20.83%" }}>
            <p className="mb-0 py-3">
              NSE: 0.00307%
              <br />
              BSE: 0.00375%
            </p>
          </div>
          <div style={{ width: "20.83%" }}>
            <p className="mb-0 py-3">
              NSE: 0.00307%
              <br />
              BSE: 0.00375%
            </p>
          </div>
          <div style={{ width: "20.83%" }}>
            <p className="mb-0 py-3">
              NSE: 0.00183%
              <br />
              BSE: 0
            </p>
          </div>
          <div style={{ width: "20.83%" }}>
            <p className="mb-0 py-3">
              NSE: 0.03553% (on premium)
              <br />
              BSE: 0.0325% (on premium)
            </p>
          </div>
        </div>
        {/* GST */}
        <div className="row border-start border-end">
          <div style={{ width: "16.67%" }}>
            <p className="mb-0 py-3">GST</p>
          </div>
          <div style={{ width: "20.23%" }}>
            <p className="mb-0 py-3">
              18% on (brokerage + SEBI charges + transaction charges)
            </p>
          </div>
          <div style={{ width: "20.23%" }}>
            <p className="mb-0 py-3">
              18% on (brokerage + SEBI charges + transaction charges)
            </p>
          </div>
          <div style={{ width: "20.23%" }}>
            <p className="mb-0 py-3">
              18% on (brokerage + SEBI charges + transaction charges)
            </p>
          </div>
          <div style={{ width: "20.23%" }}>
            <p className="mb-0 py-3">
              18% on (brokerage + SEBI charges + transaction charges)
            </p>
          </div>
        </div>
        {/* SEBI charges */}
        <div className="row border-start border-end">
          <div style={{ width: "16.67%" }}>
            <p className="mb-0 py-3">SEBI charges</p>
          </div>

          <div style={{ width: "20.23%" }}>
            <p className="mb-0 py-3">₹10 / crore</p>
          </div>
          <div style={{ width: "20.23%" }}>
            <p className="mb-0 py-3">₹10 / crore</p>
          </div>
          <div style={{ width: "20.23%" }}>
            <p className="mb-0 py-3">₹10 / crore</p>
          </div>
          <div style={{ width: "20.23%" }}>
            <p className="mb-0 py-3">₹10 / crore</p>
          </div>
        </div>
        {/* Stamp charges */}
        <div className="row border-start border-end border-bottom">
          <div style={{ width: "16.67%" }}>
            <p className="mb-0 py-3">Stamp charges</p>
          </div>
          <div style={{ width: "20.83%" }}>
            <p className="mb-0 py-3">0.015% or ₹1500 / crore on buy side</p>
          </div>
          <div style={{ width: "20.83%" }}>
            <p className="mb-0 py-3">0.003% or ₹300 / crore on buy side</p>
          </div>
          <div style={{ width: "20.83%" }}>
            <p className="mb-0 py-3">0.002% or ₹200 / crore on buy side</p>
          </div>
          <div style={{ width: "20.83%" }}>
            <p className="mb-0 py-3">0.003% or ₹300 / crore on buy side</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EquityCharges;
