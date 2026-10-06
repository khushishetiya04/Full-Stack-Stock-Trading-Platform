import React from "react";

function AMCCharges() {
  return (
    <div className="container mt-5">
      <h2>Demat AMC (Annual Maintenance Charge)</h2>

      <p className="text-muted mt-4">
        Free for first year*
      </p>

      <h5 className="mt-4">
        From second year onwards, for BSDA accounts:
      </h5>

      <div className="table-responsive mt-4">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Value of holdings</th>
              <th>AMC</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Up to ₹4 lakh</td>

              <td>
                <strong>free</strong>
              </td>
            </tr>

            <tr>
              <td>₹4 lakh – ₹10 lakh</td>

              <td>
                ₹100 per year + 18% GST,
                charged quarterly
              </td>
            </tr>

            <tr>
              <td>Above ₹10 lakh</td>

              <td>
                ₹300 per year + 18% GST,
                charged quarterly
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-muted mt-4">
        For a non-BSDA account, AMC is ₹300 per year + 18% GST,
        regardless of holdings value, charged quarterly.
      </p>

      <p className="mt-4">
        To learn more about BSDA,{" "}
        <a
          href="https://support.zerodha.com/category/account-opening/offline-account-opening/bsda/articles/how-to-open-a-basic-service-demat-account-at-zerodha"
          style={{ textDecoration: "none" }}
        >
          click here
        </a>
        .
        To learn more about AMC,{" "}
        <a
          href="https://support.zerodha.com/category/account-opening/charges-at-zerodha/statutory-and-exchange/articles/what-is-the-annual-maintenance-charge"
          style={{ textDecoration: "none" }}
        >
          click here
        </a>
        .
      </p>

      <p className="text-muted mt-4">
        *Resident individual accounts only.
      </p>
    </div>
  );
}

export default AMCCharges;