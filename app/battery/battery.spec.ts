import { Battery } from './battery';

it('should degrade by 10% for every 3 full discharges', () => {
  const battery = new Battery();

  expect(battery.currentCapacity).toEqual(4000);
  battery.discharge(4000);
  battery.charge(4000);
  expect(battery.currentCapacity).toEqual(4000);
  battery.discharge(4000);
  battery.charge(4000);
  expect(battery.currentCapacity).toEqual(4000);
  battery.discharge(4000);
  battery.charge(4000);
  expect(battery.currentCapacity).toEqual(3600);

  expect(battery.currentCapacity).toEqual(3600);
  battery.discharge(3600);
  battery.charge(3600);
  expect(battery.currentCapacity).toEqual(3600);
  battery.discharge(3600);
  battery.charge(3600);
  expect(battery.currentCapacity).toEqual(3600);
  battery.discharge(3600);
  battery.charge(3600);
  expect(battery.currentCapacity).toEqual(3240);
});
