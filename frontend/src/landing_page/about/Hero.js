import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h1 className="fs-3 text-center">
          A Look at Zerodha's Discount Broking Model
          <br /> and Technology-Driven Approach
        </h1>
      </div>
      <div
        className="row p-5 mt-5 border-top text-muted"
        style={{ lineHeight: "1.8rem", fontSize: "1.2em" }}
      >
        <div className="col-6 p-5">
          <p>
            Zerodha began operations on August 15, 2010, with the goal of
            reducing the barriers traders and investors face in India in terms
            of cost, support, and technology. Its name combines "Zero" and
            "Rodha," the Sanskrit word for barrier.
          </p>
          <p>
            Zerodha is known for its discount broking model and
            technology-driven trading and investment platforms.
          </p>
          <p>
            Its ecosystem includes platforms designed to support trading,
            investing, and financial education.
          </p>
        </div>
        <div className="col-6 p-5">
          <p>
            Zerodha also supports online educational and community initiatives
            that help retail traders and investors learn about financial
            markets.
          </p>
          <p>
            Rainmatter is Zerodha's fintech fund and incubator, which supports
            startups working to grow India's financial technology ecosystem.
          </p>
          <p>
            Explore Zerodha's official blog for the latest updates, media
            coverage, and insights into its business and product philosophy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
