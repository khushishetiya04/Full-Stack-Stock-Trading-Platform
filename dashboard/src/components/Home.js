import React from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { GeneralContextProvider } from "./GeneralContext";

const Home = ({ user }) => {
  return (
    <GeneralContextProvider user={user}>
      <TopBar />
      <Dashboard />
    </GeneralContextProvider>
  );
};

export default Home;