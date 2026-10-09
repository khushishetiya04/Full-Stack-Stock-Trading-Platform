import React from "react";

function AMCCharges() {
  return (
    <div className="container mt-5">
      <h2>Demat AMC (Annual Maintenance Charge)</h2>
      <p className="text-muted mt-4">Free for first year*</p>
      <h5 className="mt-4">From second year onwards, for BSDA accounts:</h5>

      <div className="mt-4">
        {/* Header */}
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
        {/* Up to ₹4 lakh */}
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
        {/* ₹4 lakh – ₹10 lakh */}
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
        {/* Above ₹10 lakh */}
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
      <p className="mt-4">
        To learn more about BSDA,{" "}
        <a
          href="https://support.zerodha.com/category/account-opening/offline-account-opening/bsda/articles/how-to-open-a-basic-service-demat-account-at-zerodha"
          style={{ textDecoration: "none" }}
        >
          click here
        </a>
        . To learn more about AMC,{" "}
        <a
          href="https://support.zerodha.com/category/account-opening/charges-at-zerodha/statutory-and-exchange/articles/what-is-the-annual-maintenance-charge"
          style={{ textDecoration: "none" }}
        >
          click here
        </a>
        .
      </p>
      <p className="text-muted mt-4">*Resident individual accounts only.</p>
    </div>
  );
}

export default AMCCharges;
