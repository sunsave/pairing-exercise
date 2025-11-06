"use server";

import { batteries } from "./batteries";

export async function get(): Promise<string[]> {
  return Object.keys(batteries);
}
