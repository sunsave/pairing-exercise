export class Battery {
  public currentCharge: number = 0;
  private originalCapacity: number;
  private dischargeCount: number = 0;

  constructor(capacity = 4000) {
    this.originalCapacity = capacity;
  }

  charge(amount: number) {
    this.currentCharge = Math.min(
      this.currentCharge + amount,
      this.currentCapacity
    );
  }

  discharge(amount: number) {
    this.currentCharge = Math.max(this.currentCharge - amount, 0);
    if (this.currentCharge === 0) this.dischargeCount++;
  }

  get currentCapacity() {
    const degradationFactor = Math.pow(
      0.9,
      Math.floor(this.dischargeCount / 3)
    );
    return this.originalCapacity * degradationFactor;
  }
}

export interface BatteryState {
  currentCapacity: number;
  currentCharge: number;
}
