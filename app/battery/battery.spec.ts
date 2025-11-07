import { Battery } from "./battery";

describe("initial capacity", () => {
  it("should default to 4000 watt-hours", () => {
    expect(new Battery().currentCapacity).toEqual(4000);
  });

  it("should accept a custom amount", () => {
    expect(new Battery(2000).currentCapacity).toEqual(2000);
  });

  it("should cap negative values to 0", () => {
    expect(new Battery(-1).currentCapacity).toEqual(0);
  });
});

describe("initial charge", () => {
  it("should default to 0 watt-hours", () => {
    expect(new Battery().currentCharge).toEqual(0);
  });

  it("should accept a custom amount", () => {
    expect(new Battery(4000, 2000).currentCharge).toEqual(2000);
  });

  it("should cap custom amount to capacity", () => {
    expect(new Battery(4000, 5000).currentCharge).toEqual(4000);
  });

  it("should cap negative values to 0", () => {
    expect(new Battery(4000, -1).currentCharge).toEqual(0);
  });
});

describe("charge", () => {
  it("should increase current charge by the specified amount", () => {
    const battery = new Battery();
    battery.charge(1000);
    expect(battery.currentCharge).toEqual(1000);
  });

  it("should not charge beyond current capacity", () => {
    const batteryDefaultCapacity = new Battery();
    batteryDefaultCapacity.charge(4001);
    expect(batteryDefaultCapacity.currentCharge).toEqual(4000);

    const batteryCustomCapacity = new Battery(3260);
    batteryCustomCapacity.charge(3261);
    expect(batteryCustomCapacity.currentCharge).toEqual(3260);
  });

  it("should accept negative values", () => {
    const battery = new Battery(4000, 4000);
    battery.charge(-1);
    expect(battery.currentCharge).toEqual(3999);
  });
});

describe("discharge", () => {
  it("should decrease current charge by the specified amount", () => {
    const battery = new Battery(4000, 4000);
    battery.discharge(1000);
    expect(battery.currentCharge).toEqual(3000);
  });

  it("should throw if discharge amount exceeds current charge", () => {
    const battery = new Battery(4000, 4000);
    expect(() => battery.discharge(4001)).toThrow();
  });

  it("should accept negative values", () => {
    const battery = new Battery(4000, 0);
    battery.discharge(-1);
    expect(battery.currentCharge).toEqual(1);
  });
});

describe("degradation", () => {
  it("should degrade by 10% for every 3 full discharges", () => {
    const battery = new Battery(4000, 4000);

    for (let i = 0; i < 3; i++) {
      expect(battery.currentCapacity).toEqual(4000);
      battery.discharge(4000);
      battery.charge(4000);
    }
    expect(battery.currentCapacity).toEqual(3600);

    for (let i = 0; i < 3; i++) {
      expect(battery.currentCapacity).toEqual(3600);
      battery.discharge(3600);
      battery.charge(3600);
    }
    expect(battery.currentCapacity).toEqual(3240);
  });

  it("should not degrade from partial discharges", () => {
    const battery = new Battery(4000, 4000);

    for (let i = 0; i < 3; i++) {
      expect(battery.currentCapacity).toEqual(4000);
      battery.discharge(2000);
      battery.charge(2000);
    }
    expect(battery.currentCapacity).toEqual(4000);

    battery.discharge(4000);
    battery.charge(4000);
    expect(battery.currentCapacity).toEqual(4000);
  });

  it("should stop degrading at 0 capacity", () => {
    const battery = new Battery(0, 0);
    for (let i = 0; i < 3; i++) {
      expect(battery.currentCapacity).toEqual(0);
      battery.discharge(0);
      battery.charge(0);
    }
    expect(battery.currentCapacity).toEqual(0);
  });
});
