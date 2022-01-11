const Player = require('./player');

module.exports = class Action {
    constructor(data) {
        this.data = data
    }

    actionLoad() {
        switch (this.data.command) {
            case 'equip' :
                let createPlayerObjact = new Player(this.data)
                createPlayerObjact.createPlayer()
                break;
            case 'set gem' : {
                switch (this.data.typeOfEquip) {
                    case 'body': {
                        switch (this.data.placeInItem){
                            case '1':{
                                Player.Character['equipmentBody']['sockets']['1-W'] = this.data.gem
                                break
                            }1
                        }
                        break
                    }
                }
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
