import React from "react";

function AMCCharges() {
  return (
    <div className="container mt-5">
      <h2>Zerodha Demat AMC (Annual Maintenance Charge)</h2>
      <p className="text-muted small mt-3">
        Reference information for this Zerodha clone. This demo does not open
        real demat accounts or charge account maintenance fees.
      </p>
      <p className="text-muted mt-4">Free for first year*</p>
      <h5 className="mt-4">From second year onwards, for BSDA accounts:</h5>

      <div className="mt-4">
        <div className="row border-top border-bottom border-start border-end">
          <div className="col-6">
            <p className="mb-0 py-3">
              <strong>Value of holdings</strong>
            </p>
          </div>
          <div className="col-6">
            <p className="mb-0 py-3">
              <strong>AMC</strong>
            </p>
          </div>
        </div>

        <div className="row border-start border-end">
          <div className="col-6">
            <p className="mb-0 py-3">Up to ₹4 lakh</p>
          </div>
          <div className="col-6">
            <p className="mb-0 py-3">
              <strong>free</strong>
            </p>
          </div>
        </div>

        <div className="row border-start border-end">
          <div className="col-6">
            <p className="mb-0 py-3">₹4 lakh – ₹10 lakh</p>
          </div>
          <div className="col-6">
            <p className="mb-0 py-3">
              ₹100 per year + 18% GST, charged quarterly
            </p>
          </div>
        </div>

        <div className="row border-bottom border-start border-end">
          <div className="col-6">
            <p className="mb-0 py-3">Above ₹10 lakh</p>
          </div>
          <div className="col-6">
            <p className="mb-0 py-3">
              ₹300 per year + 18% GST, charged quarterly
            </p>
          </div>
        </div>
      </div>
      <p className="text-muted mt-4">
        For a non-BSDA account, AMC is ₹300 per year + 18% GST, regardless of
        holdings value, charged quarterly.
      </p>
      <p className="text-muted mt-4">
        AMC and BSDA terms are shown for reference. Please verify the latest
        charges and eligibility requirements with Zerodha before relying on
        them.
      </p>
      <p className="text-muted mt-4">*Resident individual accounts only.</p>
    </div>
  );
}

export default AMCCharges;
