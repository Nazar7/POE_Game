const readlineSync = require('readline-sync');
const Character = require('./handlers/character')
const Action = require('./action');

class App {
    start() {
        const character = new Character();
        const action = new Action(character);

        // testint
        // character.equip('body', 'tabula_rasa');
        // character.equip( 'body', 'dendrobate_changed');
        //
        // seismicTrap
        // character.setGem(1, {gemName: 'iceNova', gemLevel: 1, gemQuality: 0}, 'body');
        // character.setGem(3, {gemName: 'spellEchoSupport', gemLevel: 1, gemQuality: 0}, 'body');
        // character.setGem(3, {gemName: 'empowerSupport', gemLevel: 1, gemQuality: 0}, 'body');
        // character.setGem(3, { gemName: 'frostbolt', gemLevel: 20, gemQuality: 20}, 'body');
        // character.setGem(4, { gemName: 'spellEchoSupport', gemLevel: 10, gemQuality: 10}, 'body');
        //character.setButton('key', 't', 'iceNova', 'body', 3);

        // character.setGem(2, { gemName: 'poisonousConcoction', gemLevel: 1, gemQuality: 0}, 'body');
        //
        // character.equip( 'body', 'corruption_sanctuary');
        // character.setGem(1, { gemName: 'poisonousConcoction', gemLevel: 10, gemQuality: 10}, 'body');
        // character.setGem(3, { gemName: 'addedLightningDamageSupport', gemLevel: 5, gemQuality: 5}, 'body');
        //
        //
        // character.setButton('key', 't', 'poisonousConcoction', 'body', 1);
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
