const Player = require('./player');
const buttons = require('./buttons')
const attack = require('./attack')

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
                createPlayerObjact.setGemInItem(this.data.typeOfEquip, this.data.placeInItem, this.data.gem)
                break;
            }
            case 'info': {
                console.log(Player.Character)
                break
            }
            case 'bind': {
                buttons.bindSpellOnButton(this.data.setButton, this.data.setSpell)
                break
            }
            case 'binds info' : {
                console.log(buttons.buttons)
                break
            }
            case 'attack': {
                attack.userAttack(this.data.selectButtonForAttack)
                break
            }
            default: {
                console.log("Error")
                break
            }
        }
    }
}
