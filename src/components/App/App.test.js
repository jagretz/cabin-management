import React from "react";
import { render } from "@testing-library/react";
import { FirebaseProvider } from "components/Firebase";
import App from "./App";

// TODO: 2020/10/10 jagretz - replace with a much better mock library for fire.
const mockFirebase = () => ({
  auth: {
    onAuthStateChanged: jest.fn(() => jest.fn()),
  },
  onAuthUserListener: jest.fn(() => jest.fn()),
});

describe("Application", () => {
  it("should render without crashing", () => {
    render(
      <FirebaseProvider value={mockFirebase()}>
        <App />
      </FirebaseProvider>
    );
  });
});
