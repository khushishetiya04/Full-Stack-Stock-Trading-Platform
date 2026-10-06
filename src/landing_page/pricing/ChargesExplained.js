import React from "react";

function ChargesExplained() {
  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center mb-5">Charges explained</h2>

      <div className="row">
        <div className="col-6 mb-5">
          <h4>Securities/Commodities Transaction Tax</h4>
          <p className="text-muted">
            STT is a tax levied on transactions involving securities. It is
            charged on both the buy and sell side for equity delivery and on the
            sell side for intraday and F&O trades.
          </p>
        </div>

        <div className="col-6 mb-5">
          <h4>Transaction/Turnover Charges</h4>
          <p className="text-muted">
            These are charges levied by stock exchanges such as NSE, BSE, and
            MCX on transactions executed through them.
          </p>
        </div>

        <div className="col-6 mb-5">
          <h4>Call & Trade</h4>
          <p className="text-muted">
            An additional charge is applicable when orders are placed through
            Zerodha's call and trade service.
          </p>
        </div>

        <div className="col-6 mb-5">
          <h4>Stamp Charges</h4>
          <p className="text-muted">
            Stamp duty is charged by the state government on the purchase of
            securities. It is applicable on the buy side.
          </p>
        </div>

        <div className="col-6 mb-5">
          <h4>NRI Brokerage Charges</h4>
          <p className="text-muted">
            NRI trades are subject to brokerage and statutory charges depending
            on the type of transaction.
          </p>
        </div>

        <div className="col-6 mb-5">
          <h4>Account with Debit Balance</h4>
          <p className="text-muted">
            Interest may be charged when there is an outstanding debit balance
            in the trading account.
          </p>
        </div>

        <div className="col-6 mb-5">
          <h4>IPFT</h4>
          <p className="text-muted">
            Investor Protection Fund Trust charges are collected by exchanges to
            support investor protection mechanisms.
          </p>
        </div>

        <div className="col-6 mb-5">
          <h4>MTF</h4>
          <p className="text-muted">
            Margin Trading Facility allows investors to take positions by
            borrowing funds. Interest is charged on the funded amount.
          </p>
        </div>

        <div className="col-6 mb-5">
          <h4>GST</h4>
          <p className="text-muted">
            Goods and Services Tax is charged at 18% on applicable services such
            as brokerage, transaction charges, and SEBI charges.
          </p>
        </div>

        <div className="col-6 mb-5">
          <h4>SEBI Charges</h4>
          <p className="text-muted">
            SEBI charges are statutory charges levied by the Securities and
            Exchange Board of India.
          </p>
        </div>

        <div className="col-6 mb-5">
          <h4>DP Charges</h4>
          <p className="text-muted">
            Depository Participant charges are applicable when securities are
            debited from your demat account.
          </p>
        </div>

        <div className="col-6 mb-5">
          <h4>Pledging Charges</h4>
          <p className="text-muted">
            Charges are applicable when securities are pledged to obtain margin
            for trading.
          </p>
        </div>

        <div className="col-6 mb-5">
          <h4>AMC</h4>
          <p className="text-muted">
            Annual Maintenance Charges are applicable for maintaining the demat
            account, depending on the account type and holdings.
          </p>
        </div>

        <div className="col-6 mb-5">
          <h4>Corporate Action Order Charges</h4>
          <p className="text-muted">
            Charges may apply for placing certain orders related to corporate
            actions.
          </p>
        </div>

        <div className="col-6 mb-5">
          <h4>Off-market Transfer Charges</h4>
          <p className="text-muted">
            Charges are applicable when securities are transferred between demat
            accounts outside the stock exchange.
          </p>
        </div>

        <div className="col-6 mb-5">
          <h4>Physical CMR Request</h4>
          <p className="text-muted">
            A charge may apply when requesting a physical copy of the Client
            Master Report.
          </p>
        </div>

        <div className="col-6 mb-5">
          <h4>Payment Gateway Charges</h4>
          <p className="text-muted">
            Payment gateway charges may apply when funds are added using certain
            payment methods.
          </p>
        </div>

        <div className="col-6 mb-5">
          <h4>Delayed Payment Charges</h4>
          <p className="text-muted">
            Interest may be charged when payments due to the broker are delayed.
          </p>
        </div>

        <div className="col-6 mb-5">
          <h4>Trading using 3-in-1 Account</h4>
          <p className="text-muted">
            Charges and terms may vary when trading through a 3-in-1 account
            with block functionality.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h4>Disclaimer</h4>

        <p className="text-muted">
          For Delivery based trades, a minimum of ₹0.01 will be charged per
          contract note. Clients who opt to receive physical contract notes will
          be charged ₹20 per contract note plus courier charges. Brokerage will
          not exceed the rates specified by SEBI and the exchanges. All
          statutory and regulatory charges will be levied at actuals. Brokerage
          is also charged on expired, exercised, and assigned options contracts.
          Free investments are available only for our retail individual clients.
          Companies, Partnerships, Trusts, and HUFs need to pay 0.1% or ₹20
          (whichever is less) as delivery brokerage. A brokerage of 0.25% of the
          contract value will be charged for contracts where physical delivery
          happens. For netted off positions in physically settled contracts, a
          brokerage of 0.1% will be charged.
        </p>
      </div>
    </div>
  );
}

export default ChargesExplained;
