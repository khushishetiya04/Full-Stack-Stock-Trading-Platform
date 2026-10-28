import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import Navbar from "../landing_page/Navbar";

describe("Navbar Component", () => {
  test("renders the logo", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.getByAltText("Stock trading demo home")).toBeInTheDocument();

    expect(screen.getByAltText("Stock trading demo home")).toHaveAttribute(
      "src",
      "/media/logo.svg",
    );
  });

  test("renders all navigation links with correct destinations", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const links = [
      ["Signup", "/signup"],
      ["Login", "/login"],
      ["About", "/about"],
      ["Product", "/product"],
      ["Pricing", "/pricing"],
      ["Support", "/support"],
    ];

    links.forEach(([name, destination]) => {
      expect(screen.getByRole("link", { name })).toHaveAttribute(
        "href",
        destination,
      );
    });
  });

  test("opens and closes the navigation menu when toggled", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const toggleButton = screen.getByRole("button", {
      name: "Toggle navigation",
    });
    const menu = document.getElementById("navbarSupportedContent");

    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(menu).not.toHaveClass("show");

    fireEvent.click(toggleButton);

    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    expect(menu).toHaveClass("show");

    fireEvent.click(toggleButton);

    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(menu).not.toHaveClass("show");
  });

  test("closes the navigation menu when a navigation link is clicked", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const toggleButton = screen.getByRole("button", {
      name: "Toggle navigation",
    });
    const menu = document.getElementById("navbarSupportedContent");

    fireEvent.click(toggleButton);

    expect(menu).toHaveClass("show");

    fireEvent.click(screen.getByRole("link", { name: "Signup" }));

    expect(menu).not.toHaveClass("show");
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });
});
