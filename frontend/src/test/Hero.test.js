import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Hero from "../landing_page/home/Hero";

describe("Hero Component", () => {
  test("renders hero image", () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    );

    const heroImage = screen.getByAltText("Hero Image");

    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute("src", "/media/homeHero.png");
  });

  test("renders signup button", () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    );

    const signupButton = screen.getByRole("button", { name: "Signup Now" });

    expect(signupButton).toBeInTheDocument();
    expect(signupButton).toHaveClass("btn-primary");
  });
});
