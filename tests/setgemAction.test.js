const Character = require('../handlers/character');
const Action = require('../action');

const character = new Character();
const action = new Action(character);

describe('setgem actions: errors', () => {
    test('try to set gem without equipment => receive error message', () => {
        //given
        const input = 'setgem 1 frostbolt  body';
        //when
        const result = action.parseCommand(input);
        //then
        const errorMessage = 'Unable to comply, add equipment first';

        expect(result).toBe(errorMessage);

    });
    test('try to set unknown gem => receive error message', () => {
        //given
        const input = 'setgem 1 falseName body';
        //when
        character.equip('body', 'tabula_rasa');
        const result = action.parseCommand(input);
        //then
        const errorMessage = 'Unable to comply, unknown gem';

        expect(result).toBe(errorMessage);

    });
    test('try to set gem on socketId which is not exist => receive error message', () => {
        //given
        const input = 'setgem 7 frostbolt_2_2 body';
        //when
        character.equip('body', 'tabula_rasa');
        const result = action.parseCommand(input);
        //then
        const errorMessage = 'Unable to comply, socketId is not exist';

        expect(result).toBe(errorMessage);
    });

    //need fix!
    test('try to set gem on not appropriate color => receive error message', () => {
        //given
        const input = 'setgem 1 greaterMultipleProjectilesSupport body';
        //when
        character.equip('body', 'corruption_sanctuary');
        const result = action.parseCommand(input);
        //then
        const errorMessage = `Unable to comply, color green is not appropriate`;

        expect(result).toBe(errorMessage);
    });
});

describe('setgem actions: success cases', () => {
    //need fix!
    test('add gem on empty equipment with all white slots (tabula_rasa)', () => {
        //given
        const input = 'setgem 1 frostbolt body';
        //when
        character.equip('body', 'tabula_rasa');
        const result = action.parseCommand(input);
        //then
        const resultMessage = [
            {
                "_color": "white",
                "_gem": {
                    "_name": "frostbolt",
                    "_type": "skill"
                },
                "_id": 1
            },
            {
                "_color": "white",
                "_gem": {},
                "_id": 2
            },
            {
                "_color": "white",
                "_gem": {},
                "_id": 3
            },
            {
                "_color": "white",
                "_gem": {},
                "_id": 4
            },
            {
                "_color": "white",
                "_gem": {},
                "_id": 5
            },
            {
                "_color": "white",
                "_gem": {},
                "_id": 6
            }
        ];
        expect(result).toEqual(resultMessage);
    });
    //need fix!
    test('add gem on empty equipment with color slot (corruption_sanctuary)', () => {
        //given
        const input = 'setgem 1 frostbolt body';
        //when
        character.equip('body', 'corruption_sanctuary');
        const result = action.parseCommand(input);
        //then
        const resultMessage = [
            {
                "_color": "blue",
                "_gem": {
                    "_name": "frostbolt",
                    "_type": "skill"
                },
                "_id": 1
            },
            {
                "_color": "red",
                "_gem": {},
                "_id": 2
            },
            {
                "_color": "blue",
                "_gem": {},
                "_id": 3
            }
        ];
        expect(result).toEqual(resultMessage);
    });
});