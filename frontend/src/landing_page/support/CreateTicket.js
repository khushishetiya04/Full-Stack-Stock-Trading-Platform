import React from "react";

function CreateTicket() {
  return (
    <div className="container">
      <div className="row mt-5 mb-5">
        {/* LEFT SIDE */}
        <div className="col-8">
          {/* ACCOUNT OPENING */}
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
                <p>
                  <a href="#" className="text-decoration-none">
                    • Resident individual
                  </a>
                </p>
                <p>
                  <a href="#" className="text-decoration-none">
                    • Minor
                  </a>
                </p>
                <p>
                  <a href="#" className="text-decoration-none">
                    • Non Resident Indian (NRI)
                  </a>
                </p>
                <p>
                  <a href="#" className="text-decoration-none">
                    • Company, Partnership, HUF and LLP
                  </a>
                </p>
                <p className="mb-0">
                  <a href="#" className="text-decoration-none">
                    • Glossary
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* YOUR ZERODHA ACCOUNT */}
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
                <p>
                  <a href="#" className="text-decoration-none">
                    • Your Profile
                  </a>
                </p>
                <p>
                  <a href="#" className="text-decoration-none">
                    • Account modification
                  </a>
                </p>
                <p>
                  <a href="#" className="text-decoration-none">
                    • Client Master Report (CMR) and Depository Participant (DP)
                  </a>
                </p>
                <p>
                  <a href="#" className="text-decoration-none">
                    • Nomination
                  </a>
                </p>
                <p className="mb-0">
                  <a href="#" className="text-decoration-none">
                    • Transfer and conversion of securities
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* KITE */}
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
                <p>
                  <a href="#" className="text-decoration-none">
                    • IPO
                  </a>
                </p>
                <p>
                  <a href="#" className="text-decoration-none">
                    • Trading FAQs
                  </a>
                </p>
                <p>
                  <a href="#" className="text-decoration-none">
                    • Margin Trading Facility (MTF) and Margins
                  </a>
                </p>
                <p>
                  <a href="#" className="text-decoration-none">
                    • Charts and orders
                  </a>
                </p>
                <p>
                  <a href="#" className="text-decoration-none">
                    • Alerts and Nudges
                  </a>
                </p>
                <p className="mb-0">
                  <a href="#" className="text-decoration-none">
                    • General
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* FUNDS */}
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
                <p>
                  <a href="#" className="text-decoration-none">
                    • Add money
                  </a>
                </p>
                <p>
                  <a href="#" className="text-decoration-none">
                    • Withdraw money
                  </a>
                </p>
                <p>
                  <a href="#" className="text-decoration-none">
                    • Add bank accounts
                  </a>
                </p>
                <p className="mb-0">
                  <a href="#" className="text-decoration-none">
                    • eMandates
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* CONSOLE */}
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
                <p>
                  <a href="#" className="text-decoration-none">
                    • Portfolio
                  </a>
                </p>
                <p>
                  <a href="#" className="text-decoration-none">
                    • Corporate actions
                  </a>
                </p>
                <p>
                  <a href="#" className="text-decoration-none">
                    • Funds statement
                  </a>
                </p>
                <p>
                  <a href="#" className="text-decoration-none">
                    • Reports
                  </a>
                </p>
                <p>
                  <a href="#" className="text-decoration-none">
                    • Profile
                  </a>
                </p>
                <p className="mb-0">
                  <a href="#" className="text-decoration-none">
                    • Segments
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* COIN */}
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
                <p>
                  <a href="#" className="text-decoration-none">
                    • Mutual funds
                  </a>
                </p>
                <p>
                  <a href="#" className="text-decoration-none">
                    • National Pension Scheme (NPS)
                  </a>
                </p>
                <p>
                  <a href="#" className="text-decoration-none">
                    • Fixed Deposit (FD)
                  </a>
                </p>
                <p>
                  <a href="#" className="text-decoration-none">
                    • Features on Coin
                  </a>
                </p>
                <p>
                  <a href="#" className="text-decoration-none">
                    • Payments and Orders
                  </a>
                </p>
                <p className="mb-0">
                  <a href="#" className="text-decoration-none">
                    • General
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-4 ps-5">
          <div
            className="p-4 mb-5"
            style={{
              backgroundColor: "#fff4d6",
              minHeight: "210px",
            }}
          >
            <a href="">
              • Revision in Market Lot of Derivative Contracts on Indices from
              October 30, 2026
            </a>
            <br />
            <br />
            <a href="">• Latest Intraday leverages and Square-off timings</a>
          </div>

          {/* QUICK LINKS */}
          <div className="border">
            <h5 className="p-4 mb-0">Quick links</h5>
            <a
              href="#"
              className="text-decoration-none d-block px-4 py-3 border-top"
            >
              1. Track account opening
            </a>
            <a
              href="#"
              className="text-decoration-none d-block px-4 py-3 border-top"
            >
              2. Track segment activation
            </a>
            <a
              href="#"
              className="text-decoration-none d-block px-4 py-3 border-top"
            >
              3. Intraday margins
            </a>
            <a
              href="#"
              className="text-decoration-none d-block px-4 py-3 border-top"
            >
              4. Kite user manual
            </a>
            <a
              href="#"
              className="text-decoration-none d-block px-4 py-3 border-top"
            >
              5. Learn how to create a ticket
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
