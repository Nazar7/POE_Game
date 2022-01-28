const readlineSync = require('readline-sync');
const util = require('util');
const Character = require('./handlers/character')
const Action = require('./action');
const Opponent = require('./handlers/opponent');
const opponentData = require('./data/opponent.json');
const resistance = opponentData["resistance"];

class App {
    start() {
        const character = new Character();
        const opponent = new Opponent(10000, resistance);
        const action = new Action(character, opponent);

        while (true) {
            let command = readlineSync.question(`Enter your action `);
            const result = action.parseCommand(command);

            console.log(util.inspect(result,  {showHidden: false, depth: null, colors: true}))
        }
    }
}

const app = new App();
app.start();

module.exports = App;
