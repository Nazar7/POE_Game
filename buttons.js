const fs = require('fs')
const Player = require('./player')

var buttons = {}

function bindSpellOnButton(button, spell) {
    var result = checkGems(spell)

    if (result === 'support'){
        return
    }

    if (result !== undefined) {
        buttons[button] = result
    } else {
        console.log(`User dont have ${spell} in this item`)
    }
}

function checkGems(spell) {

    for (var i = 0; i < Object.keys(Player.Character['equipmentBody']['sockets']).length; i++) {
        var object_gem = Object.values(Player.Character['equipmentBody']['sockets'])[i]
        if (Object.keys(object_gem)[1] === spell) {
            var checkResult = checkOnSupportGem(spell)
            if (checkResult === 'Support') {
                console.log("You cant add support gem in socket !")
                return 'support'
            } else {
                return object_gem
            }
        }
    }
}

function checkOnSupportGem(name) {
    var n = name.split(" ");
    return n[n.length - 1];

}

module.exports = {
    bindSpellOnButton,
    buttons
}