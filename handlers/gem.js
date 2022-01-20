const skillGems = require('../data/skillGems.json');
const supportGems = require('../data/supportGems.json');
const conf = require('../conf');

class Gem {
    _name = '';
    _type = '';
    _tags = [];
    _color = '';
    _affectLevel = false;
    _useFlask = false;
    _damage = {};
    _nonDamage = {};
    _quality = {};
    _level = 1;
    _qualityLevel = 0;
    _socketId = 0;

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

    get tags() {
        return this._tags;
    }

    set tags(value) {
        this._tags = value;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
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

    get level() {
        return this._level;
    }

    set level(value) {
        this._level = value;
    }

    get qualityLevel() {
        return this._qualityLevel;
    }

    set qualityLevel(value) {
        this._qualityLevel = value;
    }

    get socketId() {
        return this._socketId;
    }

    set socketId(value) {
        this._socketId = value;
    }

    load(gemInfo) {

        let gem = false;
        for (const gemType of conf.gemTypes) {
            const gemsArray = eval(gemType + 'Gems');
            for(let [name, data] of Object.entries(gemsArray)) {
                if (name === gemInfo.gemName) {
                    data.name = name;
                    data.type = gemType;
                    gem = data;
                }
            }
        }
        if(!gem) return false;

        this.name = gem.name;
        this.type = gem.type;
        this.tags = gem.tags;
        this.color = gem['slot color'];
        this.affectLevel = gem.affectLevel ?? false;
        this.useFlask = gem.useFlask ?? false;
        this.damage = gem.damage ?? false;
        this.nonDamage = gem['non-damage'] ?? false;
        this.quality = gem.quality ?? false;
        this.level = gemInfo.gemLevel ?? 1;
        this.qualityLevel = gemInfo.gemQuality ?? 0;
        return this;
    }

    getFormula(category, subCategory, quality = false) {
        if (quality) {
            const quality = {
                increase: 'value',
                decrease: 'value'
            };
            if (this.quality[category][subCategory].increase) {
                quality.increase = this.quality[category][subCategory].increase.formula.
                replaceAll('quality', this.qualityLevel).
                replaceAll('lv', this.level);
            }
            if (this.quality[category][subCategory].decrease) {
                quality.decrease = this.quality[category][subCategory].decrease.formula.
                replaceAll('quality', this.qualityLevel).
                replaceAll('lv', this.level);
            }
            return quality;
        } else {
            return this[category][subCategory].formula.
            replaceAll('quality', this.qualityLevel).
            replaceAll('lv', this.level);
        }
    }
}

module.exports = Gem;