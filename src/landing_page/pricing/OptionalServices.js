import React from "react";

function OptionalServices() {
  return (
    <div className="container mt-5">
      <h2>Charges for optional value added services</h2>
      <div className="mt-4">
        {/* Header */}
        <div className="row border-top border-start border-end border-bottom">
          <div className="col-2">
            <p className="mb-0 py-3">
              <strong>Service</strong>
            </p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">
              <strong>Billing Frequency</strong>
            </p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">
              <strong>Charges</strong>
            </p>
          </div>
        </div>
        {/* Tickertape */}
        <div className="row border-start border-end">
          <div className="col-2">
            <p className="mb-0 py-3">Tickertape</p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">Monthly / Quarterly / Annual</p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">Free: 0 | Pro: 249/699/2399</p>
          </div>
        </div>
        {/* Smallcase */}
        <div className="row border-start border-end">
          <div className="col-2">
            <p className="mb-0 py-3">Smallcase</p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">Per transaction</p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">Buy & Invest More: 100 | SIP: 10</p>
          </div>
        </div>
        {/* Kite Connect */}
        <div className="row border-start border-end border-bottom">
          <div className="col-2">
            <p className="mb-0 py-3">Kite Connect</p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">Monthly</p>
          </div>
          <div className="col-5">
            <p className="mb-0 py-3">Connect: 500 | Personal: Free</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OptionalServices;
