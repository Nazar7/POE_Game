const fs = require('fs')
const buttons = require('./buttons')
const gems = require('./data/gems.json')

function userAttack(button) {
    checkButtonAndAttack(button)
}

function checkButtonAndAttack(button){
    for (let i = 0; i < Object.keys(buttons.buttons).length; i++){
        if (Object.keys(buttons.buttons)[i] == button){
            for (let j = 0; j < gems.Gems.length; j++) {
                if (Object.keys(gems.Gems[j])[1] == Object.values(buttons.buttons)[i]) {
                    console.log(`User press ${button} and attack`)
                    let damage = calculateDamage((Object.values(gems.Gems[j])[1])['damage']['formula'],(Object.values(gems.Gems[j])[1])['setQuality'],(Object.values(gems.Gems[j])[1])['setLvl'])
                    console.log(`Damage: ${damage}`)
                }
            }
        }
    }
}

function calculateDamage(formula,_quantity,_lvl){
    let result = ''
    const qua = _quantity / 100 + 1
    const lvl = _lvl
        result = eval(formula)
        result = result * qua
    return result
}

module.exports = {
    userAttack
}