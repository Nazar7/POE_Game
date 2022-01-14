const readlineSync = require("readline-sync");
const Action = require("./action");


test('',function () {

    var command = 'equip'
    var playerName = 'Name'
    var typeOfEquip = 'body'
    var nameOfEquip = 'tabula_rasa'
    let gameStartData = {
        playerName,
        command,
        typeOfEquip,
        nameOfEquip
    }

    let action = new Action(gameStartData)
    var result = action.actionLoad()
    expect(result).toBe('equip')
})