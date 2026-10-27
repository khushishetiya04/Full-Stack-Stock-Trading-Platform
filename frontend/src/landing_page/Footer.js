import React from "react";

function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5">
          <div className="col">
            <img src="/media/logo.svg" style={{ width: "50%" }} />
            <p>&copy; 2026 Full Stack Stock Trading Platform.</p>
          </div>
          <div className="col">
            <p>Company</p>
            <a href="" className="footer-link">
              About
            </a>
            <br />
            <a href="" className="footer-link">
              Products
            </a>
            <br />
            <a href="" className="footer-link">
              Pricing
            </a>
            <br />
            <a href="" className="footer-link">
              Referral programme
            </a>
            <br />
            <a href="" className="footer-link">
              Careers
            </a>
            <br />
            <a href="" className="footer-link">
              Zerodha.tech
            </a>
            <br />
            <a href="" className="footer-link">
              Press & media
            </a>
            <br />
            <a href="" className="footer-link">
              Zerodha cares (CSR)
            </a>
            <br />
          </div>
          <div className="col">
            <p>Support</p>
            <a href="" className="footer-link">
              Contact
            </a>
            <br />
            <a href="" className="footer-link">
              Support portal
            </a>
            <br />
            <a href="" className="footer-link">
              Z-Connect blog
            </a>
            <br />
            <a href="" className="footer-link">
              List of charges
            </a>
            <br />
            <a href="" className="footer-link">
              Downloads & resources
            </a>
            <br />
          </div>
          <div className="col">
            <p>Account</p>
            <a href="" className="footer-link">
              Open an account
            </a>
            <br />
            <a href="" className="footer-link">
              Fund transfer
            </a>
            <br />
            <a href="" className="footer-link">
              60 day challenge
            </a>
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
          <p>
            Procedure to file a complaint on SEBI SCORES/SMARTODR: Register on
            SCORES portal & SMARTODR. Mandatory details for filing complaints on
            SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits:
            Effective Communication, Speedy redressal of grievances
          </p>
          <p>
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>
          <p>
            Prevent unauthorised transactions in your account. Update your
            mobile numbers/email IDs with your stock brokers/depository
            participants. Receive information of your transactions directly from
            Exchange/Depositories on your mobile/email at the end of the day.
            Issued in the interest of investors. KYC is one time exercise while
            dealing in securities markets - once KYC is done through a SEBI
            registered intermediary (broker, DP, Mutual Fund etc.), you need not
            undergo the same process again when you approach another
            intermediary. Dear Investor, if you are subscribing to an IPO, there
            is no need to issue a cheque. Please write the Bank account number
            and sign the IPO application form to authorize your bank to make
            payment in case of allotment. In case of non allotment the funds
            will remain in your bank account. As a business we don't give stock
            tips, and have not authorized anyone to trade on behalf of others.
            If you find anyone claiming to be part of Zerodha and offering such
            services, please create a ticket here.
          </p>
          <div className="text-center">
            <a href="" className="footer-link p-2">
              NSE
            </a>
            <a href="" className="footer-link p-2">
              BSE
            </a>
            <a href="" className="footer-link p-2">
              MCX
            </a>
            <a href="" className="footer-link p-2">
              Terms & conditions
            </a>
            <a href="" className="footer-link p-2">
              Policies & Procedures
            </a>
            <a href="" className="footer-link p-2">
              Privacy policy
            </a>
            <a href="" className="footer-link p-2">
              Disclosure
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
