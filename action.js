const opponentData = require('./data/opponent.json');
const resistance = opponentData["resistance"];

module.exports = class Action {
    _character = {};
    _opponent = {};

    get character() {
        return this._character;
    }

    get opponent() {
        return this._opponent;
    }

    constructor(character, opponent) {
        this._character = character;
        this._opponent = opponent;
    }

    checkLvOfGem(gemInfo, splitedInput) {
        const gemInfoArray = splitedInput[2].split('_');
        gemInfo = {
            gemName: gemInfoArray[0],
            gemLevel: gemInfoArray[1] ? parseInt(gemInfoArray[1]) : 1,
            gemQuality: gemInfoArray[2] ? parseInt(gemInfoArray[2]) : 0
        }
        if (gemInfo.gemLevel > 20) {
            return false;
        }
        if (gemInfo.gemQuality > 20) {
            return false;
        } else return gemInfo;
    }

    parseCommand(command) {
        const splitedInput = command.split(' ');
        const action = splitedInput[0];
        let result;
        let key;
        let gemName;
        let device;
        let equipmentType;
        // let gemInfo;
        let socketId;
        let equipmentName;

        //TODO Switcher
        switch (action) {
            case 'equip':
                equipmentType = splitedInput[1];
                equipmentName = splitedInput[2];
                result = this.character.equip(equipmentType, equipmentName);
                return result;
                break;
            case 'setgem':
                // const gemInfoArray = splitedInput[2].split('_');
                const gemInfoArray = splitedInput[2]
                const gemInfo = this.checkLvOfGem(gemInfoArray, splitedInput);
                if (!gemInfo) {
                    return 'level and quality cannot be more than 20';
                }
                socketId = parseInt(splitedInput[1]);
                equipmentType = splitedInput[3] ?? 'body';
                result = this.character.setGem(socketId, gemInfo, equipmentType);
                return result;
                break;
            case 'setbutton':
                key = splitedInput[2];
                gemName = splitedInput[3];
                device = splitedInput[1];
                equipmentType = splitedInput[4] ?? 'body';
                socketId = splitedInput[5] ? parseInt(splitedInput[5]) : false;
                result = this.character.setButton(device, key, gemName, equipmentType, socketId);
                return result;
                break;
            case 'press':
                key = splitedInput[2];
                device = splitedInput[1];
                result = this.character.press(device, key);
                const opponentLife = this.opponent.reduceLife(result, resistance);
                return {result, 'opponent life': opponentLife};
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