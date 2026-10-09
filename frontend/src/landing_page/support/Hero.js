import React from "react";

function Hero() {
  return (
    <div
      className="container-fluid py-5 mb-5"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      <div className="container-fluid px-3">
        <div className="row align-items-center">
          <div className="col-6">
            <h1>Support Portal</h1>
          </div>

          <div className="col-6 text-end">
            <button className="btn btn-primary" type="button">
              My tickets
            </button>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Eg: How do I open my account, How do I activate F&O..."
                style={{
                  height: "60px",
                  boxShadow: "none",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
