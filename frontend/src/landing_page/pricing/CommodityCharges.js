import React from "react";

function CommodityCharges() {
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
              <strong>Commodity Futures</strong>
            </p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">
              <strong>Commodity Options</strong>
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
            <p className="mb-0 py-3">0.01% on sell side for non-agri</p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">0.05% on sell side</p>
          </div>
        </div>
        {/* Transaction charges */}
        <div className="row border-start border-end">
          <div className="col-2">
            <p className="mb-0 py-3">Transaction charges</p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">
              MCX: 0.0021%
              <br />
              NSE: 0.0001%
            </p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">
              MCX: 0.0418%
              <br />
              NSE: 0.001%
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
            <p className="mb-0 py-3">
              Agri: ₹1 / crore
              <br />
              Non-agri: ₹10 / crore
              <br />
              Options: ₹10 / crore
            </p>
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
            <p className="mb-0 py-3">0.002% or ₹200 / crore on buy side</p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">0.003% or ₹300 / crore on buy side</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommodityCharges;
