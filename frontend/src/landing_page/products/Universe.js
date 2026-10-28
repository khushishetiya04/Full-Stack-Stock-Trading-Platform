import React from "react";
import { useNavigate } from "react-router-dom";

function Universe() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row text-center">
        <h1 className="mt-5">The Zerodha Universe</h1>
        <p>
          Explore the Zerodha ecosystem and its associated investment and
          trading platforms.
        </p>
        <div className="col-4 p-3 mt-5">
          <img
            src="/media/zerodhafundhouse.png"
            alt="Zerodha Fund House logo"
            style={{ width: "150px", height: "50px", objectFit: "contain" }}
          />
          <p className="text-small text-muted">
            Zerodha Fund House focuses on simple and transparent index funds to
            help investors work toward their financial goals.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img
            src="/media/sensibullLogo.svg"
            alt="Sensibull logo"
            style={{ width: "150px", height: "50px", objectFit: "contain" }}
          />
          <p className="text-small text-muted">
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open intrest, FII/DII, and
            more.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img
            src="/media/tijoriLogo.svg"
            alt="Tijori logo"
            style={{ width: "150px", height: "50px", objectFit: "contain" }}
          />
          <p className="text-small text-muted">
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img
            src="/media/streakLogo.png"
            alt="Streak logo"
            style={{ width: "150px", height: "50px", objectFit: "contain" }}
          />
          <p className="text-small text-muted">
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img
            src="/media/smallcaseLogo.png"
            alt="smallcase logo"
            style={{ width: "150px", height: "50px", objectFit: "contain" }}
          />
          <p className="text-small text-muted">
            Thematic investing platform that helps you invest in diversified
            baskets of stocks on ETFs.
          </p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img
            src="/media/dittoLogo.png"
            alt="Ditto insurance logo"
            style={{ width: "150px", height: "50px", objectFit: "contain" }}
          />
          <p className="text-small text-muted">
            Personalized advice on life and health insurance. No spam and no
            mis-selling.
          </p>
        </div>
        <button
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default Universe;
