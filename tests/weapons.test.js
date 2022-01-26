const Character = require('../handlers/character');
const Action = require('../action');

describe('Pledge of Hands', () => {
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
                "angles":  {
                    "value": "[-10, -5, 0, 5, 10]",
                },
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
                    "value": 4102.56
                }
            },
            "nonDamage": {
                "angles":  {
                    "value": "[-10, -5, 0, 5, 10]",
                },
                "castSpeed": {
                    "value": 0.18
                },
                "manaCost": {
                    "value": 56.55
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
                    "value": 5121.54
                },
                "lightning": {
                    "value": 799.2,
                },
            },
            "nonDamage": {
                "angles":  {
                    "value": "[-10, -5, 0, 5, 10]",
                },
                "castSpeed": {
                    "value": 0.18
                },
                "manaCost": {
                    "value": 74.88
                },
                "projectiles": {
                    "value": 2
                }
            }
        });
    });
});

describe('Cold Iron Point', () => {
    test('frostbolt | tabula_rasa | cold_iron_point', () => {
        //given
        const character = new Character();
        const action = new Action(character);
        const input = 'press key t';
        character.equip('body', 'tabula_rasa');
        character.equip('weapon', 'cold_iron_point');
        character.setGem(1, { gemName: 'frostbolt', gemLevel: 20, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'frostbolt', 'body', 1);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result).toEqual({
            "damage": {
                "cold": {
                    "value": 2236
                }
            },
            "nonDamage": {
                "castSpeed": {
                    "value": 0.75
                },
                "manaCost": {
                    "value": 25
                },
                "projectiles": {
                    "value": 1
                }
            }
        });
    });
    test('seismicTrap | tabula_rasa | cold_iron_point', () => {
        //given
        const character = new Character();
        const action = new Action(character);
        const input = 'press key t';
        character.equip('body', 'tabula_rasa');
        character.equip('weapon', 'cold_iron_point');
        character.setGem(1, { gemName: 'seismicTrap', gemLevel: 20, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'seismicTrap', 'body', 1);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result).toEqual({
            "damage": {
                "physical": {
                    "value": 2722.99
                }
            },
            "nonDamage": {
                "manaCost": {
                    "value": 23.5
                }
            }
        });
    });
});

describe('Dread Bane', () => {
    test('frostbolt | tabula_rasa | dread_bane', () => {
        //given
        const character = new Character();
        const action = new Action(character);
        const input = 'press key t';
        character.equip('body', 'tabula_rasa');
        character.equip('weapon', 'dread_bane');
        character.setGem(1, { gemName: 'frostbolt', gemLevel: 20, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'frostbolt', 'body', 1);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result).toEqual({
            "damage": {
                "cold": {
                    "value": 2594.4//3422.4
                }
            },
            "nonDamage": {
                "castSpeed": {
                    "value": 0.75//1.2375
                },
                "manaCost": {
                    "value": 25
                },
                "projectiles": {
                    "value": 1
                }
            }
        });
    });
});