const Character = require('../handlers/character');
const Action = require('../action');
const Opponent = require('../handlers/opponent');

describe('Opponent life', () => {
    test('frostbolt', () => {
        //given
        const character = new Character();
        const opponent = new Opponent(10000);
        const action = new Action(character, opponent);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(3, { gemName: 'frostbolt', gemLevel: 1, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'frostbolt', 'body', 3);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result['opponent life']).toEqual(9795);
    })
})