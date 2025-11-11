"use client";

import { useRef } from "react";
import { BatteryState } from "../../_lib/battery";
import { charge, discharge } from "@/app/actions";
import BatteryIcon from "./icon";

export default function Battery({
  battery,
  id,
}: {
  battery: BatteryState;
  id: string;
}) {
  const input = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      <div>
        <BatteryIcon battery={battery} />
        <table className="relative border-collapse w-full text-sm font-mono">
          <tbody>
            <tr>
              <th className="p-2 w-1/2 text-right">Charge</th>
              <td className="p-2 w-1/2 text-left">
                {battery.currentCharge} Wh
              </td>
            </tr>
            <tr>
              <th className="p-2 text-right w-1/2">Capacity</th>
              <td className="p-2 text-left w-1/2">
                {battery.currentCapacity} Wh
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr className="h-[2px] border-none bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
      <input
        className="rounded-full mx-auto block py-2 px-4"
        id="amount"
        ref={input}
        placeholder="Amount"
        type="number"
      />
      <div className="flex items-center justify-center gap-2">
        <button
          className="border-2 border-black rounded-full px-4 py-2 font-bold bg-emerald-300"
          onClick={async () => {
            await charge(id, Number(input.current?.value) || 0);
          }}
        >
          Charge
        </button>
        <button
          className="border-2 border-black rounded-full px-4 py-2 font-bold bg-rose-300"
          onClick={async () => {
            await discharge(id, Number(input.current?.value) || 0);
          }}
        >
          Discharge
        </button>
      </div>
    </div>
  );
}
