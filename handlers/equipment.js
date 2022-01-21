const bodyEquipment = require('../data/bodyEquipment.json');
const flaskEquipment = require('../data/flaskEquipment.json');
const weaponEquipment = require('../data/weaponEquipment.json');
const conf = require('../conf');
const Socket = require('../handlers/socket');

class Equipment {
    _name = '';
    _links = [];
    _sockets = [];
    _type = '';
    _affectLevel = false;
    _useFlask = false;
    _damage = {};
    _nonDamage = {};
    _quality = {};
    _flaskDamage = 0;

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get links() {
        return this._links;
    }

    set links(value) {
        this._links = value;
    }

    get sockets() {
        return this._sockets;
    }

    set sockets(value) {
        const sockets = [];
        for (const [id, color] of Object.entries(value)) {
            const socket = new Socket(color, parseInt(id));
            this.sockets.push(socket);
        }
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get affectLevel() {
        return this._affectLevel;
    }

    set affectLevel(value) {
        this._affectLevel = value;
    }

    get useFlask() {
        return this._useFlask;
    }

    set useFlask(value) {
        this._useFlask = value;
    }

    get damage() {
        return this._damage;
    }

    set damage(value) {
        this._damage = value;
    }

    get nonDamage() {
        return this._nonDamage;
    }

    set nonDamage(value) {
        this._nonDamage = value;
    }

    get quality() {
        return this._quality;
    }

    set quality(value) {
        this._quality = value;
    }

    get flaskDamage() {
        return this._flaskDamage;
    }

    set flaskDamage(value) {
        this._flaskDamage = value;
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
        this.links = equipment.links;
        this.sockets = equipment.color;
        this.affectLevel = equipment.affectLevel ?? false;
        this.useFlask = equipment.useFlask ?? false;
        this.damage = equipment.damage ?? false;
        this.nonDamage = equipment['non-damage'] ?? false;
        this.quality = equipment.quality ?? false;
        this.flaskDamage = equipment.flaskDamage ?? false;
        return this;
    }

    getSocketById(socketId) {
        for (const socketItem of this.sockets) {
            if (socketItem.id === socketId) {
                return socketItem;
            }
        }
        return false;
    }

    getGemByNameSocketId(gemName, socketId) {
        for(const socket of this.sockets) {
            if ((socket.id === parseInt(socketId) || !socketId) && socket.gem.name === gemName) {
                return socket.gem;
            }
        }
        return false;
    }

    getAvailableSocketsGemsByType(type) {
        const gems = [];
        for(const socket of this.sockets) {
            if (socket.gem.type === type) {
                gems.push(socket.gem);
            }
        }
        return gems;
    }

    getFormula(category, subCategory, quality = false) {
        if (quality) {
            const quality = {
                increase: 'value',
                decrease: 'value'
            };
            if (this.quality[category][subCategory].increase) {
                quality.increase = this.quality[category][subCategory].increase.formula;
            }
            if (this.quality[category][subCategory].decrease) {
                quality.decrease = this.quality[category][subCategory].decrease.formula;
            }
            return quality;
        } else {
            return this[category][subCategory].formula;
        }
    }

    getAllLinkedSocketsIds(socketId) {
        for(const [id, linkedSocketsIds] of Object.entries(this.links)) {
            if(parseInt(id) === socketId) {
                return linkedSocketsIds;
            }
        }
    }

}

module.exports = Equipment;