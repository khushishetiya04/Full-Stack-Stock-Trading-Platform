import React from "react";

function CreateTicket() {
  return (
    <div className="container">
      <div className="row mt-5 mb-5">
        <div className="col-8">
          <div className="border mb-3">
            <button
              className="btn w-100 text-start border-0 rounded-0 py-3 px-4"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#accountOpening"
              aria-expanded="false"
              aria-controls="accountOpening"
            >
              <i
                className="fa-solid fa-circle-plus me-3"
                style={{ color: "#387ed1" }}
              ></i>
              <span>Account Opening</span>
              <i
                className="fa-solid fa-chevron-down float-end mt-1"
                style={{ color: "#387ed1" }}
              ></i>
            </button>

            <div className="collapse" id="accountOpening">
              <div className="border-top px-5 py-4">
                <p className="text-muted">• Resident individual</p>
                <p className="text-muted">• Minor</p>
                <p className="text-muted">• Non Resident Indian (NRI)</p>
                <p className="text-muted">
                  • Company, Partnership, HUF and LLP
                </p>
                <p className="text-muted mb-0">• Glossary</p>
              </div>
            </div>
          </div>

          <div className="border mb-3">
            <button
              className="btn w-100 text-start border-0 rounded-0 py-3 px-4"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#zerodhaAccount"
              aria-expanded="false"
              aria-controls="zerodhaAccount"
            >
              <i
                className="fa-regular fa-circle-user me-3"
                style={{ color: "#387ed1" }}
              ></i>
              <span>Your Zerodha Account</span>
              <i
                className="fa-solid fa-chevron-down float-end mt-1"
                style={{ color: "#387ed1" }}
              ></i>
            </button>

            <div className="collapse" id="zerodhaAccount">
              <div className="border-top px-5 py-4">
                <p className="text-muted">• Your Profile</p>
                <p className="text-muted">• Account modification</p>
                <p className="text-muted">
                  • Client Master Report (CMR) and Depository Participant (DP)
                </p>
                <p className="text-muted">• Nomination</p>
                <p className="text-muted mb-0">
                  • Transfer and conversion of securities
                </p>
              </div>
            </div>
          </div>

          <div className="border mb-3">
            <button
              className="btn w-100 text-start border-0 rounded-0 py-3 px-4"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#kite"
              aria-expanded="false"
              aria-controls="kite"
            >
              <i
                className="fa-solid fa-chart-line me-3"
                style={{ color: "#387ed1" }}
              ></i>
              <span>Kite</span>
              <i
                className="fa-solid fa-chevron-down float-end mt-1"
                style={{ color: "#387ed1" }}
              ></i>
            </button>

            <div className="collapse" id="kite">
              <div className="border-top px-5 py-4">
                <p className="text-muted">• IPO</p>
                <p className="text-muted">• Trading FAQs</p>
                <p className="text-muted">
                  • Margin Trading Facility (MTF) and Margins
                </p>
                <p className="text-muted">• Charts and orders</p>
                <p className="text-muted">• Alerts and Nudges</p>
                <p className="text-muted mb-0">• General</p>
              </div>
            </div>
          </div>

          <div className="border mb-3">
            <button
              className="btn w-100 text-start border-0 rounded-0 py-3 px-4"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#funds"
              aria-expanded="false"
              aria-controls="funds"
            >
              <i
                className="fa-solid fa-indian-rupee-sign me-3"
                style={{ color: "#387ed1" }}
              ></i>
              <span>Funds</span>
              <i
                className="fa-solid fa-chevron-down float-end mt-1"
                style={{ color: "#387ed1" }}
              ></i>
            </button>

            <div className="collapse" id="funds">
              <div className="border-top px-5 py-4">
                <p className="text-muted">• Add money</p>
                <p className="text-muted">• Withdraw money</p>
                <p className="text-muted">• Add bank accounts</p>
                <p className="text-muted mb-0">• eMandates</p>
              </div>
            </div>
          </div>

          <div className="border mb-3">
            <button
              className="btn w-100 text-start border-0 rounded-0 py-3 px-4"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#console"
              aria-expanded="false"
              aria-controls="console"
            >
              <i
                className="fa-solid fa-clipboard-list me-3"
                style={{ color: "#387ed1" }}
              ></i>
              <span>Console</span>
              <i
                className="fa-solid fa-chevron-down float-end mt-1"
                style={{ color: "#387ed1" }}
              ></i>
            </button>

            <div className="collapse" id="console">
              <div className="border-top px-5 py-4">
                <p className="text-muted">• Portfolio</p>
                <p className="text-muted">• Corporate actions</p>
                <p className="text-muted">• Funds statement</p>
                <p className="text-muted">• Reports</p>
                <p className="text-muted">• Profile</p>
                <p className="text-muted mb-0">• Segments</p>
              </div>
            </div>
          </div>

          <div className="border mb-3">
            <button
              className="btn w-100 text-start border-0 rounded-0 py-3 px-4"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#coin"
              aria-expanded="false"
              aria-controls="coin"
            >
              <i
                className="fa-solid fa-coins me-3"
                style={{ color: "#387ed1" }}
              ></i>
              <span>Coin</span>
              <i
                className="fa-solid fa-chevron-down float-end mt-1"
                style={{ color: "#387ed1" }}
              ></i>
            </button>

            <div className="collapse" id="coin">
              <div className="border-top px-5 py-4">
                <p className="text-muted">• Mutual funds</p>
                <p className="text-muted">• National Pension Scheme (NPS)</p>
                <p className="text-muted">• Fixed Deposit (FD)</p>
                <p className="text-muted">• Features on Coin</p>
                <p className="text-muted">• Payments and Orders</p>
                <p className="text-muted mb-0">• General</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-4 ps-5">
          <div
            className="p-4 mb-5"
            style={{
              backgroundColor: "#fff4d6",
              minHeight: "210px",
            }}
          >
            <p className="mb-3">
              • Important updates about trading and market regulations
            </p>
            <p className="mb-0">
              • Latest intraday leverage and square-off timings
            </p>
          </div>

          <div className="border">
            <h5 className="p-4 mb-0">Quick links</h5>

            <p className="px-4 py-3 border-top mb-0 text-muted">
              1. Track account opening
            </p>
            <p className="px-4 py-3 border-top mb-0 text-muted">
              2. Track segment activation
            </p>
            <p className="px-4 py-3 border-top mb-0 text-muted">
              3. Intraday margins
            </p>
            <p className="px-4 py-3 border-top mb-0 text-muted">
              4. Kite user manual
            </p>
            <p className="px-4 py-3 border-top mb-0 text-muted">
              5. Learn how to create a ticket
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
