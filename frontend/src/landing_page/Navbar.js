import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom"
      style={{ backgroundColor: "#FFF" }}
    >
      <div className="container p-2">
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          <img src="/media/logo.svg" style={{ width: "25%" }} alt="Logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-controls="navbarSupportedContent"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/signup" onClick={closeMenu}>
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login" onClick={closeMenu}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={closeMenu}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/product" onClick={closeMenu}>
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pricing" onClick={closeMenu}>
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/support" onClick={closeMenu}>
                Support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
