import React from "react";

function AccountOpeningCharges() {
  return (
    <div className="container mt-5">
      <h2>Charges for account opening</h2>

      <div className="table-responsive mt-4">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Type of account</th>
              <th>Charges</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Individual account</td>
              <td>
                <strong>free</strong>
              </td>
            </tr>

            <tr>
              <td>Minor account</td>
              <td>
                <strong>free</strong>
              </td>
            </tr>

            <tr>
              <td>NRI account</td>
              <td>₹ 500</td>
            </tr>

            <tr>
              <td>HUF account</td>
              <td>
                <strong>free</strong> (online) / ₹ 500 (offline)
              </td>
            </tr>

            <tr>
              <td>
                Partnership, LLP, and Corporate accounts
                (offline only)
              </td>

              <td>₹ 500</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AccountOpeningCharges;