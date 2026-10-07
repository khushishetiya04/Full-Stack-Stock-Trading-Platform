import React from "react";

function AccountOpeningCharges() {
  return (
    <div className="container mt-5">
      <h2>Charges for account opening</h2>

      <div className="mt-4">
        {/* Header */}
        <div className="row border-top border-bottom border-start border-end">
          <div className="col-6">
            <p className="mb-0 py-3">
              <strong>Type of account</strong>
            </p>
          </div>

          <div className="col-6">
            <p className="mb-0 py-3">
              <strong>Charges</strong>
            </p>
          </div>
        </div>

        {/* Individual account */}
        <div className="row border-start border-end">
          <div className="col-6">
            <p className="mb-0 py-3">Individual account</p>
          </div>

          <div className="col-6">
            <p className="mb-0 py-3">
              <strong>free</strong>
            </p>
          </div>
        </div>

        {/* Minor account */}
        <div className="row border-start border-end">
          <div className="col-6">
            <p className="mb-0 py-3">Minor account</p>
          </div>

          <div className="col-6">
            <p className="mb-0 py-3">
              <strong>free</strong>
            </p>
          </div>
        </div>

        {/* NRI account */}
        <div className="row border-start border-end">
          <div className="col-6">
            <p className="mb-0 py-3">NRI account</p>
          </div>

          <div className="col-6">
            <p className="mb-0 py-3">₹ 500</p>
          </div>
        </div>

        {/* HUF account */}
        <div className="row border-start border-end">
          <div className="col-6">
            <p className="mb-0 py-3">HUF account</p>
          </div>

          <div className="col-6">
            <p className="mb-0 py-3">
              <strong>free</strong> (online) / ₹ 500 (offline)
            </p>
          </div>
        </div>

        {/* Partnership */}
        <div className="row border-bottom border-start border-end">
          <div className="col-6">
            <p className="mb-0 py-3">
              Partnership, LLP, and Corporate accounts (offline only)
            </p>
          </div>

          <div className="col-6">
            <p className="mb-0 py-3">₹ 500</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountOpeningCharges;
