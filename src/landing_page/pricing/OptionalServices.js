import React from "react";

function OptionalServices() {
  return (
    <div className="container mt-5">
      <h2>Charges for optional value added services</h2>

      <div className="table-responsive mt-4">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Service</th>
              <th>Billing Frequency</th>
              <th>Charges</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Tickertape</td>

              <td>
                Monthly / Quarterly / Annual
              </td>

              <td>
                Free: 0 | Pro: 249/699/2399
              </td>
            </tr>

            <tr>
              <td>Smallcase</td>

              <td>
                Per transaction
              </td>

              <td>
                Buy & Invest More: 100 | SIP: 10
              </td>
            </tr>

            <tr>
              <td>Kite Connect</td>

              <td>
                Monthly
              </td>

              <td>
                Connect: 500 | Personal: Free
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OptionalServices;