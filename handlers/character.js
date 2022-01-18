const Equipment = require('./equipment');

class Character {
    //TODO
    _equipment = [];

    get equipment() {
        return this._equipment;
    }

    equip(equipmentType, equipmentName) {
        const equipmentObject = new Equipment();
        const equipment = equipmentObject.load(equipmentName);
        if (!equipment) {
            return 'Unable to comply, there is no such equipment'
        }
        this.equipment.push(equipment);
        return `Equipment Added: ${JSON.stringify(equipment)}`; //треба щось норм поверати ==> need to add slots of equip
    }

    //equip(equipmentType, equipmentName) ->create new equip and add it to all equipments
    //setGem(socketId, (gemName, gemLevel, gemQuality), equipmentType)
    //setButton(device, key, gemName, equipmentType, socketId)
    //press (device, key)

    //equipmets
    //binds
}

module.exports = Character;