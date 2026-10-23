import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import Dashboard from "../components/Dashboard";

jest.mock("../components/Apps", () => () => <div>Apps Component</div>);
jest.mock("../components/Funds", () => () => <div>Funds Component</div>);
jest.mock("../components/Holdings", () => () => <div>Holdings Component</div>);
jest.mock("../components/Orders", () => () => <div>Orders Component</div>);
jest.mock("../components/Positions", () => () => (
  <div>Positions Component</div>
));
jest.mock("../components/Summary", () => () => <div>Summary Component</div>);
jest.mock("../components/WatchList", () => () => (
  <div>WatchList Component</div>
));

jest.mock("../components/GeneralContext", () => ({
  GeneralContextProvider: ({ children }) => <>{children}</>,
}));

describe("Dashboard Component", () => {
  const renderDashboard = (route = "/") => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <Dashboard />
      </MemoryRouter>,
    );
  };

  test("renders the dashboard container and WatchList", () => {
    const { container } = renderDashboard();

    expect(container.querySelector(".dashboard-container")).toBeInTheDocument();

    expect(screen.getByText("WatchList Component")).toBeInTheDocument();
  });

  test("renders Summary on the home route", () => {
    renderDashboard("/");

    expect(screen.getByText("Summary Component")).toBeInTheDocument();
  });

  test("renders Orders on the orders route", () => {
    renderDashboard("/orders");

    expect(screen.getByText("Orders Component")).toBeInTheDocument();
  });

  test("renders Holdings on the holdings route", () => {
    renderDashboard("/holdings");

    expect(screen.getByText("Holdings Component")).toBeInTheDocument();
  });

  test("renders Positions on the positions route", () => {
    renderDashboard("/positions");

    expect(screen.getByText("Positions Component")).toBeInTheDocument();
  });

  test("renders Funds on the funds route", () => {
    renderDashboard("/funds");

    expect(screen.getByText("Funds Component")).toBeInTheDocument();
  });

  test("renders Apps on the apps route", () => {
    renderDashboard("/apps");

    expect(screen.getByText("Apps Component")).toBeInTheDocument();
  });
});
