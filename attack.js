const fs = require('fs')
const buttons = require('./buttons')
const gems = require('./data/gems.json')

function userAttack(button) {

    checkButtonAndAttack(button)
}

function checkButtonAndAttack(button){


    for (var i = 0; i < Object.keys(buttons.buttons).length; i++){

        if (Object.keys(buttons.buttons)[i] == button){


            for (var j = 0; j < gems.Gems.length; j++) {

                if (Object.keys(gems.Gems[j])[1] == Object.values(buttons.buttons)[i]) {

                    console.log(`User press ${button} and attack`)
                    var damage = calculateDamage((Object.values(gems.Gems[j])[1])['damage']['formula'],(Object.values(gems.Gems[j])[1])['setQuality'],(Object.values(gems.Gems[j])[1])['setLvl'])
                    // var quantity = calculateDamage((Object.values(gems.Gems[j])[1])['setQuantity'])
                    // var lvl = calculateDamage((Object.values(gems.Gems[j])[1])['setLvl'])
                    console.log(`Damage: ${damage}`)
                    // console.log((Object.values(gems.Gems[j])[1])['damage']['formula'])
                }
            }
        }
    }
}

function calculateDamage(formula,_quantity,_lvl){

    var result = ''
    var qua = _quantity / 100 + 1
    var lvl = _lvl

    for (var i = 0; i < formula.length; i ++){

        result += formula[i]
    }

    "200", "+", "5", "*", "lvl", "*", "lvl"
    "200 + 5 * lvl * lvl"

    result = eval(result)

    result = result * qua

    return result
}

module.exports = {
    userAttack
}