import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import API_URL from "../api";

const Menu = () => {
  const location = useLocation();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/me`, {
          withCredentials: true,
        });

        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        { withCredentials: true },
      );

      window.location.href =
        process.env.REACT_APP_LOGIN_URL || "http://localhost:3000/login";
    } catch (error) {
      alert(
        error.response?.data?.message || "Logout failed. Please try again.",
      );
    }
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const menuItems = [
    { path: "/", label: "Dashboard" },
    { path: "/orders", label: "Orders" },
    { path: "/holdings", label: "Holdings" },
    { path: "/positions", label: "Positions" },
    { path: "/funds", label: "Funds" },
    { path: "/apps", label: "Apps" },
  ];

  const userName = user?.name || "User";

  const initials = userName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} alt="Logo" />

      <div className="menus">
        <ul>
          {menuItems.map((item) => {
            const isSelected = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link style={{ textDecoration: "none" }} to={item.path}>
                  <p className={isSelected ? activeMenuClass : menuClass}>
                    {item.label}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>

        <hr />

        <div className="profile-wrapper">
          <div
            className="profile"
            onClick={() => setIsProfileDropdownOpen((previous) => !previous)}
          >
            <div className="avatar">{initials || "U"}</div>
            <p className="username">{userName}</p>
          </div>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
