import React, { useEffect, useState } from "react";
import axios from "axios";

import API_URL from "./api";

function ProtectedDashboard({ children }) {
  const [checkingSession, setCheckingSession] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const checkSession = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/me`, {
          withCredentials: true,
          signal: controller.signal,
        });

        setUser(response.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        if (error.response?.status === 401) {
          window.location.replace(
            process.env.REACT_APP_LOGIN_URL || "http://localhost:3000/login",
          );
          return;
        }

        console.error("Session check failed:", error);

        setError("Unable to verify your session. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setCheckingSession(false);
        }
      }
    };

    checkSession();

    return () => {
      controller.abort();
    };
  }, []);

  if (checkingSession) {
    return <p>Checking login...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return React.cloneElement(children, { user });
}

export default ProtectedDashboard;
