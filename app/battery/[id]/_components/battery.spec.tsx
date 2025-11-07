import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Battery from "./battery";
import * as actions from "../actions";

jest.mock("../actions");

it("displays the capacity and charge", () => {
  render(
    <Battery
      battery={{ currentCapacity: 4000, currentCharge: 1000 }}
      id="test-id"
    />
  );
  expect(screen.getByText("1000 Wh")).toBeInTheDocument();
  expect(screen.getByText("4000 Wh")).toBeInTheDocument();
});

it("updates charge when charge button is clicked", async () => {
  const user = userEvent.setup();
  const mockCharge = jest.mocked(actions.charge);
  mockCharge.mockResolvedValue({
    currentCapacity: 4000,
    currentCharge: 1500,
  });

  render(
    <Battery
      battery={{ currentCapacity: 4000, currentCharge: 1000 }}
      id="test-id"
    />
  );

  const input = screen.getByPlaceholderText("Amount");
  const chargeButton = screen.getByRole("button", { name: "Charge" });

  await user.type(input, "500");
  await user.click(chargeButton);

  await waitFor(() => {
    expect(screen.getByText("1500 Wh")).toBeInTheDocument();
  });
  expect(mockCharge).toHaveBeenCalledWith("test-id", 500);
});

it("updates charge when discharge button is clicked", async () => {
  const user = userEvent.setup();
  const mockDischarge = jest.mocked(actions.discharge);
  mockDischarge.mockResolvedValue({
    currentCapacity: 4000,
    currentCharge: 500,
  });

  render(
    <Battery
      battery={{ currentCapacity: 4000, currentCharge: 1000 }}
      id="test-id"
    />
  );

  const input = screen.getByPlaceholderText("Amount");
  const dischargeButton = screen.getByRole("button", { name: "Discharge" });

  await user.type(input, "500");
  await user.click(dischargeButton);

  await waitFor(() => {
    expect(screen.getByText("500 Wh")).toBeInTheDocument();
  });
  expect(mockDischarge).toHaveBeenCalledWith("test-id", 500);
});
