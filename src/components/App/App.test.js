import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("Application", () => {
  it("should render without crashing", () => {
    render(<App />);
  });

  // it("renders learn react link", () => {
  //   const { getByText } = render(<App />);
  //   const linkElement = getByText(/greetings/i);
  //   expect(linkElement).toBeInTheDocument();
  // });
});
