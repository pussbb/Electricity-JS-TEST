/**
 * This class is just a facade for your implementation, the tests below are using the `World` class only.
 * Feel free to add the data and behavior, but don't change the public interface.
 */


export class World {
  constructor() {}

  createPowerPlant() {
    throw new Error("Not Implemented");
  }

  createHousehold() {
    throw new Error("Not Implemented");
  }

  connectHouseholdToPowerPlant(household, powerPlant) {
    throw new Error("Not Implemented");
  }

  connectHouseholdToHousehold(household1, household2) {
    throw new Error("Not Implemented");
  }

  disconnectHouseholdFromPowerPlant(household, powerPlant) {
    throw new Error("Not Implemented");
  }

  killPowerPlant(powerPlant) {
    throw new Error("Not Implemented");
  }

  repairPowerPlant(powerPlant) {
    throw new Error("Not Implemented");
  }

  householdHasEletricity(household) {
    throw new Error("Not Implemented");
  }
}
