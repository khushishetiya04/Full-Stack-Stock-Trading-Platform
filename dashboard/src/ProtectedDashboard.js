import React, { useEffect, useState } from "react";
import axios from "axios";

import API_URL from "./api";

function ProtectedDashboard({ children }) {
  const [checkingSession, setCheckingSession] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/me`, {
          withCredentials: true,
        });

        setUser(response.data.user);
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

  return React.cloneElement(children, { user });
}

export default ProtectedDashboard;
