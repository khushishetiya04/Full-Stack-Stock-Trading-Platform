// import React, { useState } from "react";

// import BuyActionWindow from "./BuyActionWindow";
// import SellActionWindow from "./SellActionWindow";

// const GeneralContext = React.createContext({
//   openBuyWindow: (uid) => {},
//   closeBuyWindow: () => {},
//   openSellWindow: (uid) => {},
//   closeSellWindow: () => {},
// });

// export const GeneralContextProvider = (props) => {
//   const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
//   const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
//   const [selectedStockUID, setSelectedStockUID] = useState("");

//   const handleOpenBuyWindow = (uid) => {
//     setIsSellWindowOpen(false);
//     setIsBuyWindowOpen(true);
//     setSelectedStockUID(uid);
//   };

//   const handleCloseBuyWindow = () => {
//     setIsBuyWindowOpen(false);
//     setSelectedStockUID("");
//   };

//   const handleOpenSellWindow = (uid) => {
//     setIsBuyWindowOpen(false);
//     setIsSellWindowOpen(true);
//     setSelectedStockUID(uid);
//   };

//   const handleCloseSellWindow = () => {
//     setIsSellWindowOpen(false);
//     setSelectedStockUID("");
//   };

//   return (
//     <GeneralContext.Provider
//       value={{
//         openBuyWindow: handleOpenBuyWindow,
//         closeBuyWindow: handleCloseBuyWindow,
//         openSellWindow: handleOpenSellWindow,
//         closeSellWindow: handleCloseSellWindow,
//       }}
//     >
//       {props.children}

//       {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}

//       {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} />}
//     </GeneralContext.Provider>
//   );
// };

// export default GeneralContext;








import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid) => {},
  closeSellWindow: () => {},
  refreshVersion: 0,
  refreshData: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [refreshVersion, setRefreshVersion] = useState(0);

  const handleOpenBuyWindow = (uid) => {
    setIsSellWindowOpen(false);
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const handleOpenSellWindow = (uid) => {
    setIsBuyWindowOpen(false);
    setIsSellWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
  };

  const refreshData = () => {
    setRefreshVersion((previousVersion) => previousVersion + 1);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
        refreshVersion,
        refreshData,
      }}
    >
      {props.children}

      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}

      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;

