const fs = require('fs')
const Player = require('./player')

var buttons = {}

function bindSpellOnButton(button, spell) {
    var result = checkGems(spell)
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
            return object_gem
        }
    }
}

module.exports = {
    bindSpellOnButton,
    buttons
}