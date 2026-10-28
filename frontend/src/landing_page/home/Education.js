import React from "react";

function Education() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6">
          <img
            src="/media/education.svg"
            style={{ width: "70%" }}
            alt="Stock market education"
          />
        </div>
        <div className="col-6">
          <h1 className="mb-3 fs-2">Free and open market education</h1>
          <p>
            Varsity offers stock market education covering topics from the
            basics to advanced trading concepts.
          </p>
          <p className="text-primary">
            Varsity <i className="fa-solid fa-arrow-right-long"></i>
          </p>
          <p className="mt-5">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>
          <p className="text-primary">
            TradingQ&A <i className="fa-solid fa-arrow-right-long"></i>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Education;
