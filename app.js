const readlineSync = require('readline-sync');
const Action = require('./action');


let playerName = readlineSync.question(`What's your name? `);
    console.log('Game Started');
    let command = 'equip'
    let typeOfEquip = readlineSync.question(`Please set type of equip `);
    let nameOfEquip = readlineSync.question(`Please set name of equip `);
    let gameStartData = {
        playerName,
        command,
        typeOfEquip,
        nameOfEquip
    }
    const action = new Action(gameStartData)

action.actionLoad()

process.stdout.write("hello: ");



