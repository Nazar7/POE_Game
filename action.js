// const Player = require('./player');
// const buttons = require('./buttons')
// const attack = require('./attack')

module.exports = class Action {

    parseCommand(command) {
        const splitedInput = command.split(' ');
        const action = splitedInput[0];
        let result;
        let key;
        let gemName;
        let device;
        let equipmentType;
        let gemInfo;
        let socketId;
        let equipmentName;

        //TODO Switcher
        switch (action) {
            case 'equip':
                equipmentName = splitedInput[2];
                equipmentType = splitedInput[1];
                result = 'will be come soon';
                return result;
                break;
            case 'setgem':
                const gemInfoArray = splitedInput[2].split('_');
                gemInfo = {
                    gemName: gemInfoArray[0],
                    gemLevel: gemInfoArray[1] ?? 1,
                    gemQuality: gemInfoArray[1] ?? 0
                }
                socketId = parseInt(splitedInput[1]);
                equipmentType = splitedInput[3] ?? 'body';
                result = 'will be come soon';
                return result;
                break;
            case 'setbutton':
                key = splitedInput[2];
                gemName = splitedInput[3];
                device = splitedInput[1];
                equipmentType = splitedInput[4] ?? 'body';
                socketId = splitedInput[5] ?? false;
                result = 'will be come soon';
                return result;
                break;
            case 'press':
                key = splitedInput[2];
                device = splitedInput[1];
                result = 'will be come soon';
                return result;
                break;
            default:
                const error = 'unable to comply, there is no such action'
                return error;
        }


    }
    // constructor(data) {
    //     this.data = data
    // }
    //
    // actionLoad() {
    //     let createPlayerObjact = new Player(this.data)
    //     switch (this.data.command) {
    //         case 'equip' :
    //             createPlayerObjact.createPlayer()
    //             break;
    //         case 'set gem' : {
    //             createPlayerObjact.setGemInItem(this.data.typeOfEquip, this.data.placeInItem, this.data.gem)
    //             break;
    //         }
    //         case 'info': {
    //             console.log(Player.Character)
    //             break
    //         }
    //         case 'bind': {
    //             buttons.bindSpellOnButton(this.data.setButton, this.data.setSpell)
    //             break
    //         }
    //         case 'binds info' : {
    //             console.log(buttons.buttons)
    //             break
    //         }
    //         case 'attack': {
    //             attack.userAttack(this.data.selectButtonForAttack)
    //             break
    //         }
    //         default: {
    //             console.log("Error")
    //             break
    //         }
    //     }
    //     return this.data.command
    // }
}