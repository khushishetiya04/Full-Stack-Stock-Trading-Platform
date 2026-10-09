import React from "react";

function CurrencyCharges() {
  return (
    <div>
      <div className="mt-4">
        {/* Header */}
        <div className="row border-top border-start border-end border-bottom">
          <div className="col-2">
            <p className="mb-0 py-3"></p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">
              <strong>Currency Futures</strong>
            </p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">
              <strong>Currency Options</strong>
            </p>
          </div>
        </div>
        {/* Brokerage */}
        <div className="row border-start border-end">
          <div className="col-2">
            <p className="mb-0 py-3">Brokerage</p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">
              0.03% or Rs. 20/executed order whichever is lower
            </p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">Flat Rs. 20 per executed order</p>
          </div>
        </div>
        {/* STT/CTT */}
        <div className="row border-start border-end">
          <div className="col-2">
            <p className="mb-0 py-3">STT/CTT</p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">No STT</p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">No STT</p>
          </div>
        </div>
        {/* Transaction charges */}
        <div className="row border-start border-end">
          <div className="col-2">
            <p className="mb-0 py-3">Transaction charges</p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">
              NSE: 0.00035%
              <br />
              BSE: 0.00045%
            </p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">
              NSE: 0.0311%
              <br />
              BSE: 0.001%
            </p>
          </div>
        </div>
        {/* GST */}
        <div className="row border-start border-end">
          <div className="col-2">
            <p className="mb-0 py-3">GST</p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">
              18% on (brokerage + SEBI charges + transaction charges)
            </p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">
              18% on (brokerage + SEBI charges + transaction charges)
            </p>
          </div>
        </div>
        {/* SEBI charges */}
        <div className="row border-start border-end">
          <div className="col-2">
            <p className="mb-0 py-3">SEBI charges</p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">₹10 / crore</p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">₹10 / crore</p>
          </div>
        </div>
        {/* Stamp charges */}
        <div className="row border-start border-end border-bottom">
          <div className="col-2">
            <p className="mb-0 py-3">Stamp charges</p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">0.0001% or ₹10 / crore on buy side</p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">0.0001% or ₹10 / crore on buy side</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrencyCharges;
