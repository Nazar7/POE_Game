const Equipment = require('./equipment');
const Gem = require('./gem');
const CastProcessor = require('./castProcessor');

class Character {
    _equipment = [];
    _binds = {
        'key': [],
        'mouse': []
    };

    get equipment() {
        return this._equipment;
    }

    set equipment(value) {
        this._equipment = value;
    }

    get binds() {
        return this._binds;
    }

    set binds(value) {
        this._binds = value;
    }

    equip(equipmentType, equipmentName) {
        const equipmentObject = new Equipment();
        const equipment = equipmentObject.load(equipmentName);
        if (!equipment) {
            return 'Unable to comply, there is no such equipment'
        }
        const existEquipment = this.getEquipmentByType(equipmentType);
        if (existEquipment) {
            this.unEquip(equipmentType);
        }
        this.equipment.push(equipment);
        return `Equipment Added: ${JSON.stringify(equipment)}`; //треба щось норм поверати ==> need to add slots of equip
    }

    unEquip(equipmentType) {
        const equipment = [];
        for(const equipmentItem of this.equipment) {
            if (equipmentItem.type !== equipmentType) {
                equipment.push(equipmentItem);
            }
        }
        this.equipment = equipment;
    }

    setGem(socketId, gemInfo, equipmentType) {
        // gemInfo = ({ gemName: '', gemLevel: 1, gemQuality: 0})

        const equipmentItem = this.getEquipmentByType(equipmentType);
        if (!equipmentItem) {
            //  немає до якого предмету прив'язати
            return 'Unable to comply, add equipment first'
        }
        const gemObject = new Gem();
        const gem = gemObject.load(gemInfo)
        if (!gem) {
            //немає заданого джему
            return 'Unable to comply, unknown gem'
        }
        const socket = equipmentItem.getSocketById(socketId);
        if (!socket) {
            //немає сокету)
            return 'Unable to comply, socketId is not exist'
        }
        if (socket.checkGemColor(gem.color)) {
            socket.gem = gem;
            gem.socketId = socket.id;
            return equipmentItem.sockets; //успішно засечено треба щось повернути толкове, по-хоуд всі сокети)
        } else
            // по-кольору не пышло
            return `Unable to comply, color ${gem.color} is not appropriate`
    }


    setButton(device, key, gemName, equipmentType, socketId) {
        const equipmentItem = this.getEquipmentByType(equipmentType);
        if (!equipmentItem) {
            //  немає до якого предмету прив'язати
        }
        const gem = equipmentItem.getGemByNameSocketId(gemName, socketId);
        if (!gem) {
            //немає заданого джему
        }

        this.binds[device].push(
            {
                key: key,
                gemName:gemName,
                equipmentType: equipmentType,
                socketId: socketId,
                level: gem.level,
                quality: gem.quality,
            }
        );
    }

    getBind(device, key) {
        for (const bindItem of this.binds[device]) {
            if (bindItem.key === key) {
                return bindItem;
            }
        }
        return false;
    }

    press(device, key) {
        const bind = this.getBind(device, key);
        if (!bind) {
            // немаэ бында, спробуйте ще
        }
        return this.cast(bind);
    }

    cast(bind) {
        const equipmentItem = this.getEquipmentByType(bind.equipmentType);
        if (!equipmentItem) {
            //  не стало еквыпменту на який забындджжено
        }
        const gem = equipmentItem.getGemByNameSocketId(bind.gemName, bind.socketId);
        if (!gem) {
            // не стало джему який забынджено
        }
        const castProcessor = new CastProcessor();
        const result = castProcessor.calculateCast(gem, equipmentItem, this._equipment);
        return result;
    }

    getEquipmentByType(equipmentType) {
        for(const equipmentItem of this.equipment) {
            if (equipmentItem.type === equipmentType) {
                return equipmentItem;
            }
        }
        return false;
    }


}

module.exports = Character;