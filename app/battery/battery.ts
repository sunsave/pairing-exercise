export class Battery {
  public currentCharge: number;
  private initialCapacity: number;
  private dischargeCount: number = 0;

  constructor(capacity = 4000, charge = 0) {
    this.initialCapacity = Math.max(capacity, 0);
    this.currentCharge = Math.min(this.initialCapacity, Math.max(charge, 0));
  }

  charge(amount: number) {
    this.currentCharge = Math.min(
      this.currentCharge + amount,
      this.currentCapacity
    );
  }

  discharge(amount: number) {
    if (amount > this.currentCharge)
      throw new Error(
        `Cannot discharge more than the current capacity: ${JSON.stringify(
          {
            amount,
            currentCharge: this.currentCharge,
            currentCapacity: this.currentCapacity,
          },
          null,
          2
        )}`
      );
    this.currentCharge = Math.max(this.currentCharge - amount, 0);
    if (this.currentCharge === 0) this.dischargeCount++;
  }

  get currentCapacity() {
    const degradationFactor = Math.pow(
      0.9,
      Math.floor(this.dischargeCount / 3)
    );
    return this.initialCapacity * degradationFactor;
  }
}

export interface BatteryState {
  currentCapacity: number;
  currentCharge: number;
}
