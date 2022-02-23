/**
 * This class is just a facade for your implementation, the tests below are using the `World` class only.
 * Feel free to add the data and behavior, but don't change the public interface.
 */

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


class PowerPlant {
    constructor() {
        this.id = generateUUID();
        this._online = true
    }

    get name() {
        return `Power Plant ${id}`
    }

    get online() {
        return this._online
    }

    set online(val) {
        this._online = val
    }
}

class Household {
    constructor() {
        this._id = generateUUID();
    }

    get name() {
        return `Household ${this._id}`
    }

    get id() {
        return this._id
    }

}

export class World {
    constructor() {
        this.connections = new Map()
    }

    _getConnection (household) {
        return this.connections.get(household) || []
    }

    createPowerPlant() {
        return new PowerPlant()
    }

    createHousehold() {
        return new Household()
    }

    connectHouseholdToPowerPlant(household, powerPlant) {
        this.connections.set(household, [...this._getConnection(household), powerPlant])
    }

    connectHouseholdToHousehold(household1, household2) {
        if (household2.id === household1.id) {
            return
        }
        const connections = this._getConnection(household1)
        if (!connections.some((i) => i instanceof Household && i.id === household2.id)) {
            this.connections.set(household1, [...connections, household2])
        }
    }

    disconnectHouseholdFromPowerPlant(household, powerPlant) {
        this.connections.set(
            household,
            this._getConnection(household).filter((i) => {
                if (i instanceof Household) return false
                return i.id !== powerPlant.id
            })
        )
    }

    killPowerPlant(powerPlant) {
        powerPlant.online = false
    }

    repairPowerPlant(powerPlant) {
        powerPlant.online = true
    }

    householdHasEletricity(household, checked = []) {
        return this._getConnection(household).some(
            (entity) => {
              if (entity instanceof Household) {
                  if (!checked.includes(entity.id)) {
                      checked.push(entity.id)
                      return this.householdHasEletricity(entity, checked)
                  }
                  return false
              }
              return entity.online === true
            }
        )
    }
}
