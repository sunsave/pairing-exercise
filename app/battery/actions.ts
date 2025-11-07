"use server";

import { batteries } from "./_lib/batteries";

export async function get(): Promise<string[]> {
  return Object.keys(batteries);
}
