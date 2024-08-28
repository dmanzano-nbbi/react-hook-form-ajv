import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders react form demo", () => {
  render(<App firstName="David" />);
  const firstName = screen.getByLabelText(/First Name/i);
  expect(firstName).toBeInTheDocument();
});
