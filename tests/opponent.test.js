const Character = require('../handlers/character');
const Action = require('../action');
const Opponent = require('../handlers/opponent');

describe('Opponent life | no resistance | reduce 100% damage', () => {
    test('frostbolt 1 0', () => {
        //given
        const character = new Character();
        const opponent = new Opponent(10000, {"cold": 0});
        const action = new Action(character, opponent);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(3, { gemName: 'frostbolt', gemLevel: 1, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'frostbolt', 'body', 3);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result['opponent life']).toEqual(9795);
    });
    test('frostbolt 20 20', () => {
        //given
        const character = new Character();
        const opponent = new Opponent(10000, {"cold": 0});
        const action = new Action(character, opponent);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(3, { gemName: 'frostbolt', gemLevel: 20, gemQuality: 20}, 'body');
        character.setButton('key', 't', 'frostbolt', 'body', 3);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result['opponent life']).toEqual(7360);
    });
});

describe('Opponent life | 40% resistance | reduce 60% damage', () => {
    test('frostbolt 1 0', () => {
        //given
        const character = new Character();
        const opponent = new Opponent(10000, {"cold": 40});
        const action = new Action(character, opponent);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(3, { gemName: 'frostbolt', gemLevel: 1, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'frostbolt', 'body', 3);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result['opponent life']).toEqual(9877);
    });
    test('frostbolt 20 20', () => {
        //given
        const character = new Character();
        const opponent = new Opponent(10000, {"cold": 40});
        const action = new Action(character, opponent);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(3, { gemName: 'frostbolt', gemLevel: 20, gemQuality: 20}, 'body');
        character.setButton('key', 't', 'frostbolt', 'body', 3);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result['opponent life']).toEqual(8416);
    });
});

describe('Opponent life | 100% resistance | reduce no damage', () => {
    test('frostbolt 1 0', () => {
        //given
        const character = new Character();
        const opponent = new Opponent(10000, {"cold": 100});
        const action = new Action(character, opponent);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(3, { gemName: 'frostbolt', gemLevel: 1, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'frostbolt', 'body', 3);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result['opponent life']).toEqual(10000);
    });
    test('frostbolt 20 20 ', () => {
        //given
        const character = new Character();
        const opponent = new Opponent(10000, {"cold": 100});
        const action = new Action(character, opponent);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(3, { gemName: 'frostbolt', gemLevel: 20, gemQuality: 20}, 'body');
        character.setButton('key', 't', 'frostbolt', 'body', 3);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result['opponent life']).toEqual(10000);
    });
});

describe('Opponent life | no resistance | reduce 140% damage', () => {
    test('frostbolt 1 0 + frostbite 1 0', () => {
        //given
        const character = new Character();
        const opponent = new Opponent(10000, {"cold": 0});
        const action = new Action(character, opponent);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(3, { gemName: 'frostbolt', gemLevel: 1, gemQuality: 0}, 'body');
        character.setGem(4, { gemName: 'frostbite', gemLevel: 1, gemQuality: 0}, 'body');

        character.setButton('key', 't', 'frostbolt', 'body', 3);
        character.setButton('key', 'q', 'frostbite', 'body', 4);

        //when
        action.parseCommand('press key q');
        const result = action.parseCommand(input);
        //then
        expect(result['opponent life']).toEqual(9713); // 10000 - 205*1.4
    });
});

describe('Opponent life | no resistance | reduce (100% x 5) damage | 5 Projectiles', () => {
    test('frostbolt 1 0 + greaterMultipleProjectilesSupport 1 0', () => {
        //given
        const character = new Character();
        const opponent = new Opponent(10000, {"cold": 0});
        const action = new Action(character, opponent);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(3, { gemName: 'frostbolt', gemLevel: 1, gemQuality: 0}, 'body');
        character.setGem(4, { gemName: 'greaterMultipleProjectilesSupport', gemLevel: 1, gemQuality: 0}, 'body');

        character.setButton('key', 't', 'frostbolt', 'body', 3);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result['opponent life']).toEqual(9642.25); // 10000 - 133.455 * 5 = 9332,725
    });
});