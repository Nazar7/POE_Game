const readlineSync = require('readline-sync');
const Action = require('./action');
const Character = require('./handlers/character');
// const gems = require('./data/skillGems.json');

class App {

    start() {
        const character =  new Character();
        const action = new Action(character);

        //TO
        while (true) {
            let command = readlineSync.question(`Enter your action`);
            const result = action.parseCommand(command);
            console.log(result);

            // console.log(command)
            // switch (command) {
            //     case '1': {
            //         command = 'equip'
            //         let typeOfEquip = readlineSync.question(`Please set type of equip `);
            //         let nameOfEquip = readlineSync.question(`Please set name of equip `);
            //         let gameStartData = {
            //             playerName,
            //             command,
            //             typeOfEquip,
            //             nameOfEquip
            //         }
            //
            //         let action = new Action()
            //         action.actionLoad()
            //         break
            //     }
            //     case '2': {
            //         command = 'set gem'
            //         var gameStartData = ''
            //         var lvl = 0
            //         var quality = 0
            //         let typeOfEquip = readlineSync.question(`Please select type `);
            //         let placeInItem = readlineSync.question(`Please select place in item `)
            //         var gem = readlineSync.question(`Please select gem `);
            //
            //         gameStartData = {
            //             playerName,
            //             command,
            //             typeOfEquip,
            //             placeInItem,
            //             gem
            //         }
            //
            //         if (gem.includes("_")) {
            //
            //             gem = gem.split("_")
            //
            //             gameStartData = {
            //                 playerName,
            //                 command,
            //                 typeOfEquip,
            //                 placeInItem,
            //                 gem
            //             }
            //         }
            //
            //         var action = new Action(gameStartData)
            //         action.actionLoad()
            //         break
            //     }
            //     case '3': {
            //         command = 'bind'
            //         let setButton = readlineSync.question(`Please select button for bind spell `)
            //         let setSpell = readlineSync.question(`Please select gem for bind on button ${setButton} `)
            //
            //         let gameStartData = {
            //             playerName,
            //             command,
            //             setButton,
            //             setSpell
            //         }
            //         var action = new Action(gameStartData)
            //         action.actionLoad()
            //         break
            //     }
            //     case '5': {
            //         command = 'info'
            //         let gameStartData = {
            //             playerName,
            //             command
            //         }
            //
            //         var action = new Action(gameStartData)
            //         action.actionLoad()
            //         break
            //     }
            //     case '6': {
            //         command = 'binds info'
            //         let gameStartData = {
            //             playerName,
            //             command
            //         }
            //
            //         var action = new Action(gameStartData)
            //         action.actionLoad()
            //         break
            //     }
            //     case '7': {
            //         command = 'attack'
            //         let selectButtonForAttack = readlineSync.question(`Please select button for attack `)
            //         let gameStartData = {
            //             playerName,
            //             command,
            //             selectButtonForAttack
            //         }
            //
            //         var action = new Action(gameStartData)
            //         action.actionLoad()
            //         break
            //     }
            //     case '8': {
            //
            //         for (var i = 0; i < gems.Gems.length; i++) {
            //             if (Object.keys(gems.Gems[i])[1] == 'Frostbolt') {
            //                 console.log((Object.values(gems.Gems[i])[1]))
            //             }
            //         }
            //
            //         break
            //     }
            // }

        }
    }
}

const app = new App();
app.start();



