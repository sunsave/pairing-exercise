import * as actions from "@/app/actions";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Battery from "./battery";

jest.mock("@/app/actions", () => ({
  charge: jest.fn(),
  discharge: jest.fn(),
}));
const mockActions = jest.mocked(actions);

beforeEach(() => {
  jest.resetAllMocks();
});

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

it("calls charge server action when charge button is clicked", async () => {
  const user = userEvent.setup();

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

  expect(mockActions.charge).toHaveBeenCalledWith("test-id", 500);
});

it("updates charge when discharge button is clicked", async () => {
  const user = userEvent.setup();
  mockActions.discharge.mockResolvedValue({
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

  expect(mockActions.discharge).toHaveBeenCalledWith("test-id", 500);
});
