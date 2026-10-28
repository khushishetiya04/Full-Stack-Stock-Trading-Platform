import React from "react";
import { useNavigate } from "react-router-dom";

function Universe() {
  const navigate = useNavigate();

  const platforms = [
    {
      image: "/media/zerodhafundhouse.png",
      alt: "Zerodha Fund House logo",
      description:
        "Zerodha Fund House focuses on simple and transparent index funds to help investors work toward their financial goals.",
    },
    {
      image: "/media/sensibullLogo.svg",
      alt: "Sensibull logo",
      description:
        "An options trading platform that lets users create strategies, analyze positions, and examine data such as open interest and FII/DII activity.",
    },
    {
      image: "/media/tijoriLogo.svg",
      alt: "Tijori logo",
      description:
        "An investment research platform that offers insights into stocks, sectors, supply chains, and more.",
    },
    {
      image: "/media/streakLogo.png",
      alt: "Streak logo",
      description:
        "A systematic trading platform that allows users to create and backtest strategies without coding.",
    },
    {
      image: "/media/smallcaseLogo.png",
      alt: "smallcase logo",
      description:
        "A thematic investing platform that helps investors explore diversified baskets of stocks and ETFs.",
    },
    {
      image: "/media/dittoLogo.png",
      alt: "Ditto insurance logo",
      description:
        "An insurance advisory platform offering guidance on life and health insurance.",
    },
  ];

  return (
    <div className="container">
      <div className="row text-center">
        <h1 className="mt-5">The Zerodha Universe</h1>

        <p>
          Learn about Zerodha's ecosystem and the associated investment,
          trading, research, and insurance platforms.
        </p>

        {platforms.map((platform) => (
          <div className="col-12 col-sm-6 col-lg-4 p-3 mt-5" key={platform.alt}>
            <img
              src={platform.image}
              alt={platform.alt}
              className="img-fluid mb-3"
              style={{
                width: "150px",
                height: "50px",
                objectFit: "contain",
              }}
            />

            <p className="text-small text-muted">{platform.description}</p>
          </div>
        ))}

        <button
          type="button"
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "auto", margin: "0 auto" }}
          onClick={() => navigate("/signup")}
        >
          Create demo account
        </button>
      </div>
    </div>
  );
}

export default Universe;
