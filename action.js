const Player = require('./player');

module.exports =  class Action {
    constructor(data) {
        this.data = data
    }

    actionLoad() {
        switch (this.data.command) {
            case 'equip' :
                let createPlayerObjact = new Player(this.data)
                createPlayerObjact.createPlayer()
                break;
            case 'setgem body' :
                break;
            case 'setbutton' :
                break;
            case 'press' :
                break;
        }
    }
}
