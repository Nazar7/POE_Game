class Socket {
    _id = 0;
    _color = '';
    _gem = {};

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }

    get gem() {
        return this._gem;
    }

    set gem(value) {
        this._gem = value;
    }

    constructor(color, id) {
        this.id = id;
        this._color = color;
    }

    checkGemColor(color) {
        if (this.color !== color && this.color !== 'white') {
            return false;
        } else {
            return true;
        }
    }
}

module.exports = Socket;