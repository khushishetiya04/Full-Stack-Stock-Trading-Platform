import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <img src="/media/homeHero.png" alt="Hero Image" className="mb-5" />

        <h1 className="mt-5">Invest in everything</h1>

        <p>
          Explore a stock trading demo with simulated trading workflows and an
          interface inspired by online investment platforms.
        </p>

        <button
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
          onClick={() => navigate("/signup")}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Hero;
