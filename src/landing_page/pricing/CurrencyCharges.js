import React from "react";

function CurrencyCharges() {
  return (
    <div>
        <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th></th>
              <th>Currency Futures</th>
              <th>Currency Options</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Brokerage</td>

              <td>
                0.03% or Rs. 20/executed order
                whichever is lower
              </td>

              <td>
                Flat Rs. 20 per executed order
              </td>
            </tr>

            <tr>
              <td>STT/CTT</td>

              <td>Not applicable</td>

              <td>Not applicable</td>
            </tr>

            <tr>
              <td>Transaction charges</td>

              <td>
                NSE: 0.00035%
                <br />
                BSE: 0.00045%
              </td>

              <td>
                NSE: 0.0311%
                <br />
                BSE: 0.001%
              </td>
            </tr>

            <tr>
              <td>GST</td>

              <td colSpan="2">
                18% on (brokerage + SEBI charges + transaction charges)
              </td>
            </tr>

            <tr>
              <td>SEBI charges</td>

              <td colSpan="2">
                ₹10 / crore
              </td>
            </tr>

            <tr>
              <td>Stamp charges</td>

              <td colSpan="2">
                0.0001% or ₹10 / crore on buy side
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CurrencyCharges;