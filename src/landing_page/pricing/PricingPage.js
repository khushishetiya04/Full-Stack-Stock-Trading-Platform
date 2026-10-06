// import React from "react";

// import Hero from "./Hero";
// import Brokerage from "./Brokerage";

// function PricingPage() {
//   return (
//     <>
//       <Hero />
//       <Brokerage />
//     </>
//   );
// }

// export default PricingPage;

import React from "react";

import Hero from "./Hero";
import ChargesTabs from "./ChargesTab";
import AccountOpeningCharges from "./AccountOpeningCharges";
import AMCCharges from "./AMCCharges";
import OptionalServices from "./OptionalServices";
import ChargesExplained from "./ChargesExplained";

function ChargesPage() {
  return (
    <>
      <Hero />
      <ChargesTabs />
      <AccountOpeningCharges />
      <AMCCharges />
      <OptionalServices />
      <ChargesExplained />
    </>
  );
}

export default ChargesPage;
