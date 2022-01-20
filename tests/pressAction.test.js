const Character = require('../handlers/character');
const Action = require('../action');

describe('press action / errors + 1 skill gem without support | tabula_rasa', () => {
    test('1 skill gem with default lv (1) and quality (0)  => receive all skill info ', () => {
        //given
        const character = new Character();
        const action = new Action(character);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(3, { gemName: 'frostbolt', gemLevel: 1, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'frostbolt', 'body', 3);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result).toEqual(
            {
                'damage': {
                    'cold': {
                        'value': 205
                    }
                },
                'nonDamage': {
                    'manaCost': {
                        'value': 6
                    },
                    'castSpeed': {
                        'value': 0.75
                    },
                    'projectiles': {
                        'value': 1
                    },
                }
            }
        );

    });
    test('1 skill gem with lv 20 and quality 20  => receive all skill info ', () => {
        //given
        const character = new Character();
        const action = new Action(character);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(3, { gemName: 'frostbolt', gemLevel: 20, gemQuality: 20}, 'body');
        character.setButton('key', 't', 'frostbolt', 'body', 3);
        //when
        const result = action.parseCommand(input);

        //then
        expect(result).toEqual(
            {
                'damage': {
                    'cold': {
                        'value': 2640
                    }
                },
                'nonDamage': {
                    'manaCost': {
                        'value': 25
                    },
                    'castSpeed': {
                        'value': 0.75
                    },
                    'projectiles': {
                        'value': 1
                    },
                }
            }
        );

    });
    test('1 skill gem with lv 20 and quality 20 and 1 non support gem => receive all skill info without any changes from support gem', () => {
        //given
        const character = new Character();
        const action = new Action(character);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(3, { gemName: 'frostbolt', gemLevel: 20, gemQuality: 20}, 'body');
        character.setGem(4, { gemName: 'chanceToPoisonSupport', gemLevel: 1, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'frostbolt', 'body', 3);
        //when
        const result = action.parseCommand(input);

        //then
        expect(result).toEqual(
            {
                'damage': {
                    'cold': {
                        'value': 2640
                    }
                },
                'nonDamage': {
                    'manaCost': {
                        'value': 25
                    },
                    'castSpeed': {
                        'value': 0.75
                    },
                    'projectiles': {
                        'value': 1
                    },
                }
            }
        );

    });
});

describe('gems on corruption_sanctuary', () => {
    test('iceNova 1 0 on corruption_sanctuary', () => {
        //given
        const character = new Character();
        const action = new Action(character);
        const input = 'press key t';
        character.equip( 'body', 'corruption_sanctuary');
        character.setGem(1, { gemName: 'iceNova', gemLevel: 1, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'iceNova', 'body', 1);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result).toEqual({
            'damage':
                {
                    'cold': {
                        'value': 114
                    },
                },
            'nonDamage':
                {
                    'manaCost': {
                        'value': 10
                    },
                    'castSpeed': {
                        'value': 0.7
                    },
                }
            });
    });
    test('iceNova 10 10 + spellEchoSupport 5 5 on corruption_sanctuary', () => {
        //given
        const character = new Character();
        const action = new Action(character);
        const input = 'press key t';
        character.equip( 'body', 'corruption_sanctuary');
        character.setGem(1, { gemName: 'iceNova', gemLevel: 10, gemQuality: 10}, 'body');
        character.setGem(3, { gemName: 'spellEchoSupport', gemLevel: 5, gemQuality: 5}, 'body');

        character.setButton('key', 't', 'iceNova', 'body', 1);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result).toEqual({
            'damage': {
                'cold': {
                    'value': 736.7
                }
            },
            'nonDamage': {
                'manaCost': {
                    'value': 21.75
                },
                'castSpeed': {
                    'value': 0.34
                },
            }
        });
    });
});

describe('gems on dendrobate_changed', () => {
    test('seismicTrap  1 0 on dendrobate_changed => does not influence on damage (physical)', () => {
        //given
        const character = new Character();
        const action = new Action(character);
        const input = 'press key t';
        character.equip( 'body', 'dendrobate_changed');
        character.setGem(2, { gemName: 'seismicTrap', gemLevel: 1, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'seismicTrap', 'body', 2);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result).toEqual({
            "damage": {
                "physical": {
                    "value": 151
                }
            },
            "nonDamage": {
                "manaCost": {
                    "value": 12.5
                }
            }
        });
    });
});

describe('1 skill gem with one support gem', () => {
    test('1 skill gem frostbolt with lv 20 and quality 20 with spellEchoSupport default lv & quality (two support tag) | tabula_rasa', () => {
        //given
        const character = new Character();
        const action = new Action(character);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(3, { gemName: 'frostbolt', gemLevel: 20, gemQuality: 20}, 'body');
        character.setGem(4, { gemName: 'spellEchoSupport', gemLevel: 1, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'frostbolt', 'body', 3);
        //when
        const result = action.parseCommand(input);

        //then
        expect(result).toEqual(
            {
                'damage': {
                    'cold': {
                        'value': 2376
                    }
                },
                'nonDamage': {
                    'manaCost': {
                        'value': 37.5
                    },
                    'castSpeed': {
                        'value': 0.4
                    },
                    'projectiles': {
                        'value': 2
                    },
                }
            }
        );

    });
    test('1 skill gem frostbolt with lv 20 and quality 20 with spellEchoSupport 10 lv & 10 quality | tabula_rasa ', () => {

        //given
        const character = new Character();
        const action = new Action(character);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(3, { gemName: 'frostbolt', gemLevel: 20, gemQuality: 20}, 'body');
        character.setGem(4, { gemName: 'spellEchoSupport', gemLevel: 10, gemQuality: 10}, 'body');
        character.setButton('key', 't', 'frostbolt', 'body', 3);
        //when
        const result = action.parseCommand(input);

        //then
        expect(result).toEqual(
            {
                'damage': {
                    'cold': {
                        'value': 2494.8
                    }
                },
                'nonDamage': {
                    'manaCost': {
                        'value': 37.5
                    },
                    'castSpeed': {
                        'value': 0.33
                    },
                    'projectiles': {
                        'value': 2
                    },
                }
            }
        );
    });
    test('1 skill gem with lv 1 and quality 0 with addedLightningDamageSupport 1 lv & 0 quality ', () => {
        //given
        const character = new Character();
        const action = new Action(character);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(3, { gemName: 'frostbolt', gemLevel: 1, gemQuality: 0}, 'body');
        character.setGem(4, { gemName: 'addedLightningDamageSupport', gemLevel: 1, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'frostbolt', 'body', 3);
        //when
        const result = action.parseCommand(input);

        //then
        expect(result).toEqual(
            {
                'damage': {
                    'cold': {
                        'value': 205
                    },
                    'lightning': {
                        'value': 1
                    }
                },
                'nonDamage': {
                    'manaCost': {
                        'value': 7.2
                    },
                    'castSpeed': {
                        'value': 0.75
                    },
                    'projectiles': {
                        'value': 1
                    },
                }
            }
        );
    });
    test('iceNova 1 0 + spellEchoSupport 10 20 | tabula_rasa', () => {
        //given
        const character = new Character();
        const action = new Action(character);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(3, { gemName: 'iceNova', gemLevel: 1, gemQuality: 0}, 'body');
        character.setGem(4, { gemName: 'spellEchoSupport', gemLevel: 10, gemQuality: 20}, 'body');
        character.setButton('key', 't', 'iceNova', 'body', 3);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result).toEqual({
            "damage": {
                "cold": {
                    "value": 53.46
                }
            },
            "nonDamage": {
                "castSpeed": {
                    "value": 0.31
                },
                "manaCost": {
                    "value": 12.75
                }
            }
        });
    });
});

describe('1 skill gem with two support gem', () => {
    test('1 skill gem frostbolt 1 0 + addedLightningDamageSupport 1 0  + spellEchoSupport 1 0 | tabula_rasa', () => {
        //given
        const character = new Character();
        const action = new Action(character);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(3, { gemName: 'frostbolt', gemLevel: 1, gemQuality: 0}, 'body');
        character.setGem(4, { gemName: 'addedLightningDamageSupport', gemLevel: 1, gemQuality: 0}, 'body');
        character.setGem(5, { gemName: 'spellEchoSupport', gemLevel: 1, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'frostbolt', 'body', 3);
        //when
        const result = action.parseCommand(input);

        //then
        expect(result).toEqual(
            {
                'damage': {
                    'cold': {
                        'value': 184.5
                    },
                    'lightning': {
                        'value': 0.9
                    }
                },
                'nonDamage': {
                    'manaCost': {
                        'value': 10.8
                    },
                    'castSpeed': {
                        'value': 0.4
                    },
                    'projectiles': {
                        'value': 2
                    },
                }
            }
        );
    });
});

describe('from examples: full complicated equipment on tabula_rasa: Poisonous Concoction – Ice Nova – Frostbolt – Empower – Spell Cascade – Greater Multiple Projectiles', () => {
    test('Poisonous Concoction – Empower 6 0 – GMP | tabula_rasa', () => {
        //given
        const character = new Character();
        const action = new Action(character);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(1, { gemName: 'poisonousConcoction', gemLevel: 1, gemQuality: 0}, 'body');
        character.setGem(2, { gemName: 'iceNova', gemLevel: 1, gemQuality: 0}, 'body');
        character.setGem(3, { gemName: 'frostbolt', gemLevel: 1, gemQuality: 0}, 'body');
        character.setGem(4, { gemName: 'empowerSupport', gemLevel: 6, gemQuality: 0}, 'body');
        character.setGem(5, { gemName: 'spellCascadeSupport', gemLevel: 1, gemQuality: 0}, 'body');
        character.setGem(6, { gemName: 'greaterMultipleProjectilesSupport', gemLevel: 1, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'poisonousConcoction', 'body', 1);
        //when
        const result = action.parseCommand(input);

        //then
        expect(result).toEqual({
            "damage": {
                "chaos": {
                    "value": 31.14
                }
            },
            "nonDamage": {
                "attackSpeed": {
                    "value": 1.5
                },
                "manaCost": {
                    "value": 12.27
                },
                "projectiles": {
                    "value": 5
                }
            }
        });
    });
    // test('Ice Nova – Empower 6 0 – Spell Cascade | tabula_rasa', () => {
    //     //given
    //     const character = new Character();
    //     const action = new Action(character);
    //     const input = 'press key t';
    //     character.equip( 'body', 'tabula_rasa');
    //     character.setGem(1, { gemName: 'poisonousConcoction', gemLevel: 1, gemQuality: 0}, 'body');
    //     character.setGem(2, { gemName: 'iceNova', gemLevel: 1, gemQuality: 0}, 'body');
    //     character.setGem(3, { gemName: 'frostbolt', gemLevel: 1, gemQuality: 0}, 'body');
    //     character.setGem(4, { gemName: 'empowerSupport', gemLevel: 6, gemQuality: 0}, 'body');
    //     character.setGem(5, { gemName: 'spellCascadeSupport', gemLevel: 1, gemQuality: 0}, 'body');
    //     character.setGem(6, { gemName: 'greaterMultipleProjectilesSupport', gemLevel: 1, gemQuality: 0}, 'body');
    //     character.setButton('key', 't', 'iceNova', 'body', 2);
    //     //when
    //     const result = action.parseCommand(input);
    //     //then
    //     expect(result).toEqual();
    // });
    // test('Frostbolt – Empower 6 0 - GMP | tabula_rasa', () => {
    //     //given
    //     const character = new Character();
    //     const action = new Action(character);
    //     const input = 'press key t';
    //     character.equip( 'body', 'tabula_rasa');
    //     character.setGem(1, { gemName: 'poisonousConcoction', gemLevel: 1, gemQuality: 0}, 'body');
    //     character.setGem(2, { gemName: 'iceNova', gemLevel: 1, gemQuality: 0}, 'body');
    //     character.setGem(3, { gemName: 'frostbolt', gemLevel: 1, gemQuality: 0}, 'body');
    //     character.setGem(4, { gemName: 'empowerSupport', gemLevel: 6, gemQuality: 0}, 'body');
    //     character.setGem(5, { gemName: 'spellCascadeSupport', gemLevel: 1, gemQuality: 0}, 'body');
    //     character.setGem(6, { gemName: 'greaterMultipleProjectilesSupport', gemLevel: 1, gemQuality: 0}, 'body');
    //     character.setButton('key', 't', 'frostbolt', 'body', 3);
    //     //when
    //     const result = action.parseCommand(input);
    //     //then
    //     expect(result).toEqual();
    // });

    test('Frostbolt – greaterMultipleProjectilesSupport 0 0 | tabula_rasa', () => {
        //given
        const character = new Character();
        const action = new Action(character);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(3, { gemName: 'frostbolt', gemLevel: 1, gemQuality: 0}, 'body');
        character.setGem(4, { gemName: 'greaterMultipleProjectilesSupport', gemLevel: 1, gemQuality: 0}, 'body');
        character.setButton('key', 't', 'frostbolt', 'body', 3);
        //when
        const result = action.parseCommand(input);
        //then
        expect(result).toEqual({
            "damage": {
                "cold": {
                    "value": 133.46
                }
            },
            "nonDamage": {
                "castSpeed": {
                    "value": 0.75
                },
                "manaCost": {
                    "value": 9
                },
                "projectiles": {
                    "value": 5
                }
            }
        });
    });
});

// describe('Empower', () => {
//     test('', () => {
//
//     });
// });