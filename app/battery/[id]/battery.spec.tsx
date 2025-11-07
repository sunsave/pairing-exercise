import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Battery from "./battery";

it("renders a heading", () => {
  render(
    <Battery
      battery={{ currentCapacity: 4000, currentCharge: 1000 }}
      id="test-id"
    />
  );
  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toBeInTheDocument();
});
