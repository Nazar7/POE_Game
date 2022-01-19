const readlineSync = require('readline-sync');
const Character = require('./handlers/character')
const Action = require('./action');

class App {


    start() {
        const character = new Character();
        const action = new Action(character);

        // testint
        character.equip('body', 'tabula_rasa');

        // seismicTrap
        character.setGem(2, {gemName: 'iceNova', gemLevel: 1, gemQuality: 0}, 'body');
        character.setGem(3, {gemName: 'spellEchoSupport', gemLevel: 1, gemQuality: 0}, 'body');
        // character.setGem(3, {gemName: 'empowerSupport', gemLevel: 1, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'iceNova', 'body', 2);
        character.press( 'key', 't');

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
