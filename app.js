const readlineSync = require('readline-sync');
const Action = require('./action');


let playerName = readlineSync.question(`What's your name? `);
console.log('Game Started');

while (true) {
    let command = readlineSync.question(`Select a command: 1 - Put on armor, 2 - Set gem in item, 3 - Bind spell on button, 5 - Character info, 
    6 - Character binds info, 7 - Attack `);
    // console.log(command)
    switch (command) {
        case '1': {
            command = 'equip'
            let typeOfEquip = readlineSync.question(`Please set type of equip `);
            let nameOfEquip = readlineSync.question(`Please set name of equip `);
            let gameStartData = {
                playerName,
                command,
                typeOfEquip,
                nameOfEquip
            }

            let action = new Action(gameStartData)
            action.actionLoad()
            break
        }
        case '2': {
            command = 'set gem'
            let typeOfEquip = readlineSync.question(`Please select type `);
            let placeInItem = readlineSync.question(`Please select place in item `)
            let gem = readlineSync.question(`Please select gem `);
            let gameStartData = {
                playerName,
                command,
                typeOfEquip,
                placeInItem,
                gem
            }

            var action = new Action(gameStartData)
            action.actionLoad()
            break
        }
        case '3': {
            command = 'bind'
            let setButton = readlineSync.question(`Please select button for bind spell `)
            let setSpell = readlineSync.question(`Please select gem for bind on button ${setButton} `)

            let gameStartData = {
                playerName,
                command,
                setButton,
                setSpell
            }
            var action = new Action(gameStartData)
            action.actionLoad()
            break
        }
        case '5': {
            command = 'info'
            let gameStartData = {
                playerName,
                command
            }

            var action = new Action(gameStartData)
            action.actionLoad()
            break
        }
        case '6': {
            command = 'binds info'
            let gameStartData = {
                playerName,
                command
            }

            var action = new Action(gameStartData)
            action.actionLoad()
            break
        }
        case '7': {
            command = 'attack'
            let selectButtonForAttack = readlineSync.question(`Please select button for attack `)
            let gameStartData = {
                playerName,
                command,
                selectButtonForAttack
            }

            var action = new Action(gameStartData)
            action.actionLoad()
            break
        }
    }

}

// let getItem = readlineSync.question(`Choose clothes for sockets`)
// command = getItem
// action = {
//     command,
//
// }
// action = new Action(getItem)
// action.actionLoad()

process.stdout.write("hello: ");



