import React from "react";

import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";

function ProductPage() {
  return (
    <>
      <Hero />

      <LeftSection
        imageURL="/media/kite.png"
        productName="Kite"
        productDescription="Zerodha's flagship trading platform offers streaming market data, advanced charts, and a clean interface. This independent project includes its own simulated trading dashboard for learning and demonstration."
        linkText="Try Trading Demo"
        linkURL="/login"
        learnMore=""
        googlePlay=""
        appStore=""
      />

      <RightSection
        imageURL="/media/console.png"
        productName="Console"
        productDescription="Console is Zerodha's central dashboard for account insights, trade analysis, and investment reports. This section describes Zerodha's product and is not a live integration."
        linkText=""
        linkURL=""
      />

      <LeftSection
        imageURL="/media/coin.png"
        productName="Coin"
        productDescription="Coin is Zerodha's platform for investing in direct mutual funds. This independent project does not offer mutual fund purchases or connect to Coin."
        linkText=""
        linkURL=""
        learnMore=""
        googlePlay=""
        appStore=""
      />

      <RightSection
        imageURL="/media/kiteconnect.png"
        productName="Kite Connect API"
        productDescription="Kite Connect provides APIs for developers building trading and investment applications. This project is an independent simulation and does not integrate with the Kite Connect API."
        linkText=""
        linkURL=""
      />

      <LeftSection
        imageURL="/media/varsity.png"
        productName="Varsity"
        productDescription="Zerodha Varsity provides educational material covering stock markets and investing through lessons and illustrations. This project does not host or reproduce the full Varsity learning platform."
        linkText=""
        linkURL=""
        learnMore=""
        googlePlay=""
        appStore=""
      />

      <p className="text-center mt-5 mb-5">
        Product names and descriptions refer to Zerodha's services. This
        independent demo project is not affiliated with Zerodha and does not
        provide access to its products.
      </p>

      <Universe />
    </>
  );
}

export default ProductPage;
