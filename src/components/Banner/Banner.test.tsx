import { render, screen } from "@testing-library/react";
import Banner from "../Banner";

// Dependencies
import { BrowserRouter } from "react-router-dom";

test("renders banner message", () => {
  render(
    <BrowserRouter>
      <Banner />
    </BrowserRouter>
  );
  const labelElement = screen.getByText(/banner message/i);
  expect(labelElement).toBeInTheDocument();
});

test("renders portfolio link", () => {
  render(
    <BrowserRouter>
      <Banner />
    </BrowserRouter>
  );
  // const linkElement = screen.getByTestId(/learn react/i);
  const linkElement = screen.getByTestId("portfolio_link");
  expect(linkElement).toBeInTheDocument();
});
