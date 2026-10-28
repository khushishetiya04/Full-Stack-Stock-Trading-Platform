import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5">
          <div className="col">
            <img
              src="/media/logo.svg"
              style={{ width: "50%" }}
              alt="Stock trading demo"
            />
            <p>&copy; 2026 Full Stack Stock Trading Platform.</p>
          </div>

          <div className="col">
            <p>Company</p>
            <Link to="/about" className="footer-link">
              About
            </Link>
            <br />
            <Link to="/product" className="footer-link">
              Products
            </Link>
            <br />
            <Link to="/pricing" className="footer-link">
              Pricing
            </Link>
            <br />
            <span>Referral programme</span>
            <br />
            <span>Careers</span>
            <br />
            <span>Zerodha.tech</span>
            <br />
            <span>Press &amp; media</span>
            <br />
            <span>Zerodha cares (CSR)</span>
            <br />
          </div>

          <div className="col">
            <p>Support</p>
            <span>Contact</span>
            <br />
            <Link to="/support" className="footer-link">
              Support portal
            </Link>
            <br />
            <span>Z-Connect blog</span>
            <br />
            <Link to="/pricing" className="footer-link">
              List of charges
            </Link>
            <br />
            <span>Downloads &amp; resources</span>
            <br />
          </div>

          <div className="col">
            <p>Account</p>
            <Link to="/signup" className="footer-link">
              Create demo account
            </Link>
            <br />
            <span>Fund transfer</span>
            <br />
            <span>60 day challenge</span>
            <br />
          </div>
        </div>

        <div className="mt-5 text-muted" style={{ fontSize: "14px" }}>
          <p>
            Independent demo project with simulated trading only. Not affiliated
            with Zerodha or any broker, exchange or financial institution.
            Prices are for demonstration only and nothing here is investment
            advice.
          </p>

          <div className="text-center">
            <span>NSE</span>
            <span className="ms-3">BSE</span>
            <span className="ms-3">MCX</span>
            <span className="ms-3">Terms &amp; conditions</span>
            <span className="ms-3">Policies &amp; Procedures</span>
            <span className="ms-3">Privacy policy</span>
            <span className="ms-3">Disclosure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
