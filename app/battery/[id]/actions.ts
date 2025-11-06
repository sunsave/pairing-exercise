"use server";

import { batteries } from "../batteries";
import { BatteryState } from "../battery";

export async function get(id: string): Promise<BatteryState> {
  const battery = batteries[id];
  return {
    currentCapacity: battery.currentCapacity,
    currentCharge: battery.currentCharge,
  };
}

export async function charge(
  id: string,
  amount: number
): Promise<BatteryState> {
  const battery = batteries[id];
  battery.charge(amount);
  return {
    currentCapacity: battery.currentCapacity,
    currentCharge: battery.currentCharge,
  };
}

export async function discharge(
  id: string,
  amount: number
): Promise<BatteryState> {
  const battery = batteries[id];
  battery.discharge(amount);
  return {
    currentCapacity: battery.currentCapacity,
    currentCharge: battery.currentCharge,
  };
}
