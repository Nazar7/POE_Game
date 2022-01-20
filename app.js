const readlineSync = require('readline-sync');
const Character = require('./handlers/character')
const Action = require('./action');

class App {
    start() {
        const character = new Character();
        const action = new Action(character);

        // testint
        // character.equip('body', 'tabula_rasa');

        // seismicTrap
        // character.setGem(1, {gemName: 'iceNova', gemLevel: 1, gemQuality: 0}, 'body');
        // character.setGem(3, {gemName: 'spellEchoSupport', gemLevel: 1, gemQuality: 0}, 'body');
        // character.setGem(3, {gemName: 'empowerSupport', gemLevel: 1, gemQuality: 0}, 'body');
        // character.setGem(3, { gemName: 'frostbolt', gemLevel: 20, gemQuality: 20}, 'body');
        // character.setGem(4, { gemName: 'spellEchoSupport', gemLevel: 10, gemQuality: 10}, 'body');
        // character.setButton('key', 't', 'frostbolt', 'body', 3);
        // character.press( 'key', 't');

        while (true) {
            let command = readlineSync.question(`Enter your action `);
            const result = action.parseCommand(command);
            console.log(result);
        }
    }
}

const app = new App();
app.start();

module.exports = App;
