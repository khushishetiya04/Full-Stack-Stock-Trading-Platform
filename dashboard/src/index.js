import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import Home from "./components/Home";
import ProtectedDashboard from "./ProtectedDashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <ProtectedDashboard>
              <Home />
            </ProtectedDashboard>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);