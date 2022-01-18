const fs = require('fs')
const buttons = require('./buttons')
const gems = require('./data/skillGems.json')
const Player = require("./player")

// class UserDamage {
//
//     static Damage = ''
// }

function userAttack(button) {
    checkButtonAndAttack(button)
}

function checkButtonAndAttack(button) {

    for (let i = 0; i < Object.keys(buttons.buttons).length; i++) {

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

            return 322
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

                /*
                Якщо в нас є саппорт гем, то потрібно перевірити, чи саппортить він наш скіл.
                Тут ми отримуємо сам об*єкт гему, якщо він вставлений в шмотку і в його назві є слово саппорт.
                Якщо він підходить і саппортить наш скіл, то в статичний об*єкт цього класу потрібно добавити додаткові параметри атаки.
                */
                console.log('Your spell has support gem !')

                if (currentGem[nameOfCurrentGem]['non-damage parameters']['projectiles'] !== undefined) {
                    playerCharacteristics['projectiles'] = eval(playerCharacteristics['projectiles'] + currentGem[nameOfCurrentGem]['non-damage parameters']['projectiles'])
                }
                if (currentGem[nameOfCurrentGem]['non-damage parameters']['angles'] !== undefined) {
                    playerCharacteristics['angles'] = currentGem[nameOfCurrentGem]['non-damage parameters']['angles']
                }
                if (currentGem[nameOfCurrentGem]['non-damage parameters']['mana multiplier'] !== undefined) {
                    var currentMC = playerCharacteristics['mana cost']
                    var MMinGem = currentGem[nameOfCurrentGem]['non-damage parameters']['mana multiplier']
                    var result = currentMC * MMinGem
                    playerCharacteristics['mana cost'] = result
                }
                if (currentGem[nameOfCurrentGem]['damage']['formula'] !== undefined) {
                    var lvl = playerCharacteristics['lvl']
                    var damage = playerCharacteristics['damage']
                    playerCharacteristics['damage'] = eval(currentGem[nameOfCurrentGem]['damage']['formula'])
                }
                if (currentGem[nameOfCurrentGem]['quality'] !== undefined) {
                    var qua = currentGem[nameOfCurrentGem]['setQuality']
                    var addDmg = eval(currentGem[nameOfCurrentGem]['quality'])
                    playerCharacteristics['damage'] = playerCharacteristics['damage'] * (addDmg / 100 + 1)
                }
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
    // UserDamage.Damage = result
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
    userAttack,
    calculateDamage,
    checkButtonAndAttack,
    checkAllGemsForSupportingThisGem
}