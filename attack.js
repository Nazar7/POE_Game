const fs = require('fs')
const buttons = require('./buttons')
const gems = require('./data/gems.json')
const Player = require("./player")

class UserDamage {

    static Damage = ''
}

function userAttack(button) {
    checkButtonAndAttack(button)
}

function checkButtonAndAttack(button) {
    for (let i = 0; i < Object.keys(buttons.buttons).length; i++) {
        // if (Object.keys(buttons.buttons)[i] == button){
        //     for (let j = 0; j < gems.Gems.length; j++) {
        //         if (Object.keys(gems.Gems[j])[1] == Object.values(buttons.buttons)[i]) {
        //             console.log(`User press ${button} and attack`)
        //             let damage = calculateDamage((Object.values(gems.Gems[j])[1])['damage']['formula'],(Object.values(gems.Gems[j])[1])['setQuality'],(Object.values(gems.Gems[j])[1])['setLvl'])
        //             console.log(`Damage: ${damage}`)
        //         }
        //     }
        // }
        if (Object.keys(buttons.buttons)[i] == button) {

            var gem_object = Object.values(buttons.buttons)[i]
            var gem_name = Object.keys(gem_object)[1]

            var formula = Object.values(buttons.buttons)[i][gem_name]['damage']['formula']
            var setQuality = Object.values(buttons.buttons)[i][gem_name]['setQuality']
            var setLvl = Object.values(buttons.buttons)[i][gem_name]['setLvl']

            var damage = calculateDamage(formula, setQuality, setLvl)

            var typeDamage = Object.values(buttons.buttons)[i][gem_name]['damage']['type']

            var nonDamageParameters = Object.values(buttons.buttons)[i][gem_name]['non-damage parameters']

            var lvl = parseInt(setLvl)
            var qua = parseInt(setQuality)

            playerCharacteristics['projectiles'] = nonDamageParameters['projectiles']
            playerCharacteristics['cast speed'] = nonDamageParameters['cast speed']
            playerCharacteristics['piercing'] = nonDamageParameters['piercing']
            var manaCost = nonDamageParameters['mana cost']
            playerCharacteristics['mana cost'] = eval(manaCost)
            playerCharacteristics['type damage'] = typeDamage
            playerCharacteristics['damage'] = damage

            checkAllGemsForSupportingThisGem()

            console.log(playerCharacteristics)
        }
    }
}

function checkAllGemsForSupportingThisGem() {
    for (var i = 0; i < Object.keys(Player.Character['equipmentBody']['sockets']).length; i++) {

        if (Object.values(Player.Character['equipmentBody']['sockets'])[i] !== 'Empty') {
            var currentGem = Object.values(Player.Character['equipmentBody']['sockets'])[i]
            var nameOfCurrentGem = Object.keys(currentGem)[1]

            var isSupportOrNot = checkOnSupportGem(nameOfCurrentGem)

            if (isSupportOrNot === 'Support') {

                console.log('Your spell has support gem !')
            }
        }
    }
}

function calculateDamage(formula, _quantity, _lvl) {
    let result = ''
    const qua = _quantity / 100 + 1
    const lvl = _lvl
    result = eval(formula)
    result = result * qua
    UserDamage.Damage = result
    return result
}

var playerCharacteristics = {
    'projectiles': '',
    'cast speed': '',
    'piercing': '',
    'mana cost': '',
    'type damage': '',
    'damage': ''
}

function checkOnSupportGem(name) {
    var n = name.split(" ");
    return n[n.length - 1];

}

module.exports = {
    userAttack
}