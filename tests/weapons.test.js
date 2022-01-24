const Character = require('../handlers/character');
const Action = require('../action');

describe('pledge_of_hands', () => {
    test('frostbolt 20 0 | tabula_rasa + pledge_of_hands', () => {
        //given
        const character = new Character();
        const action = new Action(character);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.equip( 'weapon', 'pledge_of_hands');
        character.setGem(1, { gemName: 'frostbolt', gemLevel: 20, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'frostbolt', 'body', 1);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result).toEqual({
            "damage": {
                "cold": {
                    "value": 2930.4
                }
            },
            "nonDamage": {
                "castSpeed": {
                    "value": 0.18
                },
                "manaCost": {
                    "value": 37.5
                },
                "projectiles": {
                    "value": 2
                }
            }
        });
    });

    test('frostbolt (20|0) + Empower (20|0)| tabula_rasa + pledge_of_hands', () => {
        //given
        const character = new Character();
        const action = new Action(character);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.equip( 'weapon', 'pledge_of_hands');
        character.setGem(1, { gemName: 'frostbolt', gemLevel: 20, gemQuality: 0}, 'body');
        character.setGem(2, { gemName: 'empowerSupport', gemLevel: 20, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'frostbolt', 'body', 1);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result).toEqual({
            "damage": {
                "cold": {
                    "value": 0
                }
            },
            "nonDamage": {
                "castSpeed": {
                    "value": 0.18
                },
                "manaCost": {
                    "value": 0
                },
                "projectiles": {
                    "value": 2
                }
            }
        });
    });

    test('Frostbolt (20|0) – Empower (20|0) – Added Lightning Damage Support (20|20) | corruption_sanctuary + pledge_of_hands', () => {
        //given
        const character = new Character();
        const action = new Action(character);
        const input = 'press key t';
        character.equip( 'body', 'corruption_sanctuary');
        character.equip( 'weapon', 'pledge_of_hands');
        character.setGem(1, { gemName: 'frostbolt', gemLevel: 20, gemQuality: 0}, 'body');
        character.setGem(2, { gemName: 'empowerSupport', gemLevel: 20, gemQuality: 0}, 'body');
        character.setGem(3, { gemName: 'addedLightningDamageSupport', gemLevel: 20, gemQuality: 20}, 'body');
        character.setButton('key', 't', 'frostbolt', 'body', 1);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result).toEqual({
            "damage": {
                "cold": {
                    "value": 273.06
                }
            },
            "nonDamage": {
                "castSpeed": {
                    "value": 0.18
                },
                "manaCost": {
                    "value": 9
                },
                "projectiles": {
                    "value": 2
                }
            }
        });
    });
});
