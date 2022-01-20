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
        const input = 'equip body corruption_sanctuary';
        //when
        const result = action.parseCommand(input);
        //then
        const expectedRes = {
            "name": "corruption_sanctuary",
            "sockets": [
                {
                    "_id": 1,
                    "_color": "blue",
                    "_gem": {}
                },
                {
                    "_id": 2,
                    "_color": "red",
                    "_gem": {}
                },
                {
                    "_id": 3,
                    "_color": "blue",
                    "_gem": {}
                }
            ]
        }

        expect(result).toEqual(expectedRes);
    });

    test('add equipment to slots body, when it is an equip already on body => success replace: tabula_rasa to corruption_sanctuary', () => {
        //given
        const input = 'equip body corruption_sanctuary'
        //when
        character.equip( 'body', 'tabula_rasa');

        const result = action.parseCommand(input);

        const expectedRes = {
            "name": "corruption_sanctuary",
            "sockets": [
                {
                    "_id": 1,
                    "_color": "blue",
                    "_gem": {}
                },
                {
                    "_id": 2,
                    "_color": "red",
                    "_gem": {}
                },
                {
                    "_id": 3,
                    "_color": "blue",
                    "_gem": {}
                }
            ]
        };
        //then
        expect(result).toEqual(expectedRes);
    });
});


