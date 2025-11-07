"use client";

import { useRef } from "react";
import { charge, discharge } from "../actions";

export default function BatteryButtons({ id }: { id: string }) {
  const input = useRef<HTMLInputElement>(null);

  return (
    <>
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
    </>
  );
}
