"use server";

import { revalidatePath } from "next/cache";
import { batteries } from "./battery/_lib/batteries";
import { BatteryState } from "./battery/_lib/battery";

export async function getAll(): Promise<string[]> {
  return Object.keys(batteries);
}

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
  battery.charge(Number(amount));
  revalidatePath("/battery/[id]");
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
  battery.discharge(Number(amount));
  revalidatePath("/battery/[id]");
  return {
    currentCapacity: battery.currentCapacity,
    currentCharge: battery.currentCharge,
  };
}
