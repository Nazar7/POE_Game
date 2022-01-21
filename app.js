const readlineSync = require('readline-sync');
const Character = require('./handlers/character')
const Action = require('./action');

class App {
    start() {
        const character = new Character();
        const action = new Action(character);
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
