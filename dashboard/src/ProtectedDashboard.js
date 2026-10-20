import React, { useEffect, useState } from "react";
import axios from "axios";

import API_URL from "./api";

function ProtectedDashboard({ children }) {
  const [checkingSession, setCheckingSession] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await axios.get(`${API_URL}/api/auth/me`, {
          withCredentials: true,
        });

        setIsAuthenticated(true);
      } catch (error) {
        console.log("Session check failed:", error.response?.status);
        setIsAuthenticated(false);
        window.location.replace(
          process.env.REACT_APP_LOGIN_URL || "http://localhost:3000/login",
        );
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  if (checkingSession) {
    return <p>Checking login...</p>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}

export default ProtectedDashboard;
