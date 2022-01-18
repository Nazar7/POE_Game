const bodyEquipment = require('../data/bodyEquipment.json');
const conf = require('../conf');

class Equipment {
    _name = '';
    _type = '';

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    load(equipmentName) {
        let equipment = false;
        for (const equipmentType of conf.equipmentTypes) {
            const equipmentArray = eval(equipmentType + 'Equipment');
            for(let [name, data] of Object.entries(equipmentArray)) {
                if (name === equipmentName) {
                    data.name = name;
                    data.type = equipmentType;
                    equipment = data;
                    break;
                }
            }
        }
        if(!equipment) return false;
        this.name = equipment.name;
        this.type = equipment.type;

        return equipment;

    }
}

module.exports = Equipment;
