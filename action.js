const Player = require('./player');

module.exports = class Action {
    constructor(data) {
        this.data = data
    }

    actionLoad() {
        let createPlayerObjact = new Player(this.data)
        switch (this.data.command) {
            case 'equip' :
                createPlayerObjact.createPlayer()
                break;
            case 'set gem' : {
                createPlayerObjact.setGemInItem(this.data.typeOfEquip,this.data.placeInItem,this.data.gem)
                break;
            }
            case 'info': {
                console.log(Player.Character)
            }
            case 'setbutton' :
                break;
            case 'press' :
                break;
        }
    }
}
