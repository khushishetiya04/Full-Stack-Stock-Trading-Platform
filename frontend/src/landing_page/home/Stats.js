import React from "react";

function Stats() {
  return (
    <div className="container p-3">
      <div className="row p-5">
        <div className="col-6 p-5">
          <h1 className="fs-2 mb-5">Built for a Better Trading Experience</h1>
          <h2 className="fs-4">Customer-first always</h2>
          <p className="text-muted">
            Explore a clean interface designed to demonstrate common stock
            trading workflows and account information.
          </p>
          <h2 className="fs-4">No spam or gimmicks</h2>
          <p className="text-muted">
            Experience a straightforward demo interface focused on essential
            features without unnecessary distractions.
          </p>
          <h2 className="fs-4">The Zerodha universe</h2>
          <p className="text-muted">
            Explore the landing page and simulated trading dashboard inspired by
            modern online investment platforms.
          </p>
          <h2 className="fs-4">Do better with money</h2>
          <p className="text-muted">
            Learn how watchlists, holdings, orders, and profit-and-loss
            summaries fit together in a simulated trading environment.
          </p>
        </div>
        <div className="col-6 p-5">
          <img
            src="/media/ecosystem.png"
            style={{ width: "90%" }}
            alt="Illustration of a stock trading platform ecosystem"
          />
          <div className="text-center">
            <a href="" className="mx-5" style={{ textDecoration: "none" }}>
              Explore our products{" "}
              <i className="fa-solid fa-arrow-right-long"></i>
            </a>
            <a href="" style={{ textDecoration: "none" }}>
              Try Kite demo<i className="fa-solid fa-arrow-right-long"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
