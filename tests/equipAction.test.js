const Character = require('../handlers/character');
const Action = require('../action');

const character = new Character();
const action = new Action(character);

describe('tests for equip action', () => {

    test('add unknown equipment => expect receive error unknown equip', () => {
        //given
        const input = 'equip body false_name_of_equip'
        //when
        const result = action.parseCommand(input);

        //then
        expect(result).toBe('Unable to comply, there is no such equipment')
    });
    test('add equipment to slots body, when it is no equip on body => success result message', () => {
        //given
        const input = 'equip body tabula_rasa'
        //when
        const result = action.parseCommand(input);
        //then
        expect(result).toBe('Equipment Added');
    });
});


