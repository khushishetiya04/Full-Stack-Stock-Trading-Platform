import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center">About the Founder</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="/media/nithinKamath.jpg"
            alt="Nithin Kamath, founder of Zerodha"
            style={{ borderRadius: "100%", width: "50%" }}
          />
          <h4 className="mt-5">Nithin Kamath</h4>
          <h6>Founder and CEO of Zerodha</h6>
        </div>

        <div className="col-6 p-3">
          <p>
            Nithin Kamath founded Zerodha in 2010, drawing on his experience as
            a trader to address challenges in India's brokerage industry.
          </p>
          <p>
            He has participated in industry advisory committees, including
            SEBI's Secondary Market Advisory Committee (SMAC) and Market Data
            Advisory Committee (MDAC).
          </p>
          <p>He also enjoys playing basketball.</p>
          <p>Public profile references: Homepage / TradingQnA / Twitter</p>
        </div>
      </div>
    </div>
  );
}

export default Team;
