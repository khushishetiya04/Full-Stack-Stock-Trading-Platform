import React from "react";

function CommodityCharges() {
  return (
    <div>
     <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th></th>
              <th>Commodity Futures</th>
              <th>Commodity Options</th>
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

              <td>
                0.01% on sell side for non-agri
              </td>

              <td>
                0.05% on sell side
              </td>
            </tr>

            <tr>
              <td>Transaction charges</td>

              <td>
                MCX: 0.0021%
                <br />
                NSE: 0.0001%
              </td>

              <td>
                MCX: 0.0418%
                <br />
                NSE: 0.001%
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
                Agri: ₹1 / crore
                <br />
                Non-agri: ₹10 / crore
                <br />
                Options: ₹10 / crore
              </td>
            </tr>

            <tr>
              <td>Stamp charges</td>

              <td>
                0.002% or ₹200 / crore on buy side
              </td>

              <td>
                0.003% or ₹300 / crore on buy side
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CommodityCharges;