const Character = require('../handlers/character');
const Action = require('../action');
const Opponent = require('../handlers/opponent');

describe('Wild Strike | tabula_rasa', () => {
    test('Wild Strike 1 0 without weapon => receive error about needed weapon', () => {
        //given
        const character = new Character();
        const opponent = new Opponent(10000, {"fire": 0});
        const action = new Action(character, opponent);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(3, { gemName: 'wildStrike', gemLevel: 1, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'wildStrike', 'body', 3);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result).toEqual('This gem wildStrike required equipped weapon!');
    });

    test('Wild Strike 1 0 => press key t 4 times => every hit replace ELEMENTAL damage', () => {
        //given
        const character = new Character();
        const opponent = new Opponent(10000, {"fire": 0, "lightning": 0, "cold": 0});
        const action = new Action(character, opponent);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.equip( 'weapon', 'cold_iron_point');
        character.setGem(3, { gemName: 'wildStrike', gemLevel: 1, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'wildStrike', 'body', 3);

        //when
        const result1 = action.parseCommand(input);
        const result2 = action.parseCommand(input);
        const result3 = action.parseCommand(input);
        const result4 = action.parseCommand(input);

        //then
        expect(result1.result).toEqual(
            {"damage": {"fire": {"value": 258}},   "nonDamage": {
                    "attackSpeed": {
                        "value": 1
                    },
                    "castSpeed": {
                        "value": 1800
                    },
                    "manaCost": {
                        "value": 6
                    },
                    "projectiles": {
                        "value": 2
                    }
                }}
        );
        expect(result2.result).toEqual(
            {"damage": {"lightning": {"value": 258}},   "nonDamage": {
                    "attackSpeed": {
                        "value": 1
                    },
                    "castSpeed": {
                        "value": 1800
                    },
                    "manaCost": {
                        "value": 6
                    },
                    "projectiles": {
                        "value": 2
                    }
                }}
        );
        expect(result3.result).toEqual(
            {"damage": {"cold": {"value": 258}},   "nonDamage": {
                    "attackSpeed": {
                        "value": 1
                    },
                    "castSpeed": {
                        "value": 1800
                    },
                    "manaCost": {
                        "value": 6
                    },
                    "projectiles": {
                        "value": 2
                    }
                }}
        );
        expect(result4.result).toEqual(
            {"damage": {"fire": {"value": 258}},   "nonDamage": {
                    "attackSpeed": {
                        "value": 1
                    },
                    "castSpeed": {
                        "value": 1800
                    },
                    "manaCost": {
                        "value": 6
                    },
                    "projectiles": {
                        "value": 2
                    }
                }}
        );
    });
});

describe('Frostbite | tabula_rasa', () => {
    test('frostbite 1 0 => vulnerability = 30 + 1  \ opponent life does not change, ', () => {
        //given
        const character = new Character();
        const opponent = new Opponent(10000, {"fire": 0});
        const action = new Action(character, opponent);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(3, { gemName: 'frostbite', gemLevel: 1, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'frostbite', 'body', 3);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result.result).toEqual({
            "damage": {},
            "nonDamage": {
                "manaCost": {
                    "value": 26
                }
            },
            "vulnerability": {
                "cold": {
                    "value": 0.31
                }
            }
        });
        expect(result['opponent life']).toEqual(10000);
    });
});