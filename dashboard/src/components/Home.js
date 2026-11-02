import React from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import DisclaimerBanner from "./DisclaimerBanner";
import { GeneralContextProvider } from "./GeneralContext";

const Home = ({ user }) => {
  return (
    <GeneralContextProvider user={user}>
      <DisclaimerBanner />
      <TopBar />
      <Dashboard />
    </GeneralContextProvider>
  );
};

export default Home;