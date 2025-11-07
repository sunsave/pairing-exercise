import {
  Battery as BatteryEmpty,
  BatteryMedium,
  BatteryFull,
  BatteryWarning,
} from "lucide-react";
import { BatteryState } from "../battery";

export default function BatteryIcon({ battery }: { battery: BatteryState }) {
  console.log({ battery });
  if (battery.currentCharge === 0) {
    return <BatteryEmpty className="w-1/3 h-auto block mx-auto" />;
  } else if (
    battery.currentCharge > 0 &&
    battery.currentCharge < battery.currentCapacity
  ) {
    return <BatteryMedium className="w-1/3 h-auto block mx-auto" />;
  } else if (battery.currentCharge === battery.currentCapacity) {
    return <BatteryFull className="w-1/3 h-auto block mx-auto" />;
  } else {
    return <BatteryWarning className="w-1/3 h-auto block mx-auto" />;
  }
}
