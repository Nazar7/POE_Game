const Character = require('../handlers/character');
const Action = require('../action');

const character = new Character();
const action = new Action(character);

describe('tests for equip action', () => {
    test('add unknown equipment => expect receive error unknown equip', () => {
        //given
        const input = 'equip body false_name_of_equip';
        //when
        const result = action.parseCommand(input);
        //then
        expect(result).toBe('Unable to comply, there is no such equipment');
    });

    test('add equipment to slots body, when it is no equip on body => success result message with info of equip', () => {
        //given
        const input = 'equip body tabula_rasa';
        //when
        const result = action.parseCommand(input);
        //then
        expect(result).toBe('Equipment Added: {"sockets_qty":6,"linked":6,"color":{"white":6,"blue":0,"green":0,"red":0},"name":"tabula_rasa","type":"body"}');
    });

    test('add equipment to slots body, when it is an equip already on body => success replace: tabula_rasa to briskwrap', () => {
        //given
        const input = 'equip body briskwrap'
        //when
        character.equip( 'body', 'tabula_rasa');

        const result = action.parseCommand(input);
        //then
        expect(result).toBe('Equipment Added: {"sockets_qty":6,"linked":5,"color":{"white":0,"blue":0,"green":5,"red":1},"name":"briskwrap","type":"body"}');
    });
});


