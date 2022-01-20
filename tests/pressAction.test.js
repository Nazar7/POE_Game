
const Character = require('../handlers/character');
const Action = require('../action');

describe('press action / errors + 1 skill gem without support', () => {
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
                        'value': 0.3975
                    },
                    'projectiles': {
                        'value': 2
                    },
                }
            }
        );

    });
    test('1 skill gem with lv 20 and quality 20 with spellEchoSupport 10 lv & 10 quality | tabula_rasa ', () => {

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
                        'value': 2376.05
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
});

describe('1 skill gem with two support gem', () => {
    test('1 skill gem with lv 1 and quality 0 with addedLightningDamageSupport 1 lv & 0 quality  + spellEchoSupport', () => {

        //given
        const character = new Character();
        const action = new Action(character);
        const input = 'press key t';
        character.equip( 'body', 'tabula_rasa');
        character.setGem(3, { gemName: 'frostbolt', gemLevel: 1, gemQuality: 0}, 'body');
        character.setGem(4, { gemName: 'addedLightningDamageSupport', gemLevel: 1, gemQuality: 0}, 'body');
        character.setGem(4, { gemName: 'spellEchoSupport', gemLevel: 1, gemQuality: 0}, 'body');
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
                        'value': 0.3975
                    },
                    'projectiles': {
                        'value': 2
                    },
                }
            }
        );
    });
});