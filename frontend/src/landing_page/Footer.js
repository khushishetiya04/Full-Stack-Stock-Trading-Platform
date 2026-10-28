import React from "react";

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
            <a href="/about" className="footer-link">
              About
            </a>
            <br />
            <a href="/product" className="footer-link">
              Products
            </a>
            <br />
            <a href="/pricing" className="footer-link">
              Pricing
            </a>
            <br />
            <span className="footer-link">Referral programme</span>
            <br />
            <span className="footer-link">Careers</span>
            <br />
            <span className="footer-link">Zerodha.tech</span>
            <br />
            <span className="footer-link">Press & media</span>
            <br />
            <span className="footer-link">Zerodha cares (CSR)</span>
            <br />
          </div>
          <div className="col">
            <p>Support</p>
            <span className="footer-link">Contact</span>
            <br />
            <a href="/support" className="footer-link">
              Support portal
            </a>
            <br />
            <span className="footer-link">Z-Connect blog</span>
            <br />
            <span className="footer-link">List of charges</span>
            <br />
            <span className="footer-link">Downloads & resources</span>
            <br />
          </div>
          <div className="col">
            <p>Account</p>
            <a href="/signup" className="footer-link">
              Open an account
            </a>
            <br />
            <span className="footer-link">Fund transfer</span>
            <br />
            <span className="footer-link">60 day challenge</span>
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
            <span className="footer-link">NSE</span>
            <span className="footer-link">BSE</span>
            <span className="footer-link">MCX</span>
            <span className="footer-link">Terms & conditions</span>
            <span className="footer-link">Policies & Procedures</span>
            <span className="footer-link">Privacy policy</span>
            <span className="footer-link">Disclosure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
