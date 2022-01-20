const Character = require('../handlers/character');
const Action = require('../action');

const character = new Character();
const action = new Action(character);

describe('setbutton action: errors', () => {
    test('try to set gem which not added on equip => receive error message', () => {
        //given
        const input = 'setbutton key t frostbolt body 1';
        //when
        character.equip('body', 'tabula_rasa');
        const result = action.parseCommand(input);
        //then
        const errorMessage = 'Unable to comply, add gem first'

        expect(result).toBe(errorMessage);
    });
    test('try to set support gem => receive error message', () => {
        //given
        const input = 'setbutton key t spellEchoSupport body 1';
        //when
        character.equip('body', 'tabula_rasa');
        character.setGem(1, { gemName: 'spellEchoSupport', gemLevel: 1, gemQuality: 0}, 'body');
        const result = action.parseCommand(input);
        //then
        const errorMessage = 'Unable to comply, cannot set support gem, select an active one';

        expect(result).toBe(errorMessage);
    });
});

describe('setbutton action: success cases', () => {
    test('add button to active gem | key device', () => {
        //given
        const input = 'setbutton key t frostbolt body 1';
        //when
        character.equip('body', 'tabula_rasa');
        character.setGem(1, { gemName: 'frostbolt', gemLevel: 1, gemQuality: 0}, 'body');
        const result = action.parseCommand(input);
        //then
        const expectedRes = {
            "key": [
                {
                    "equipmentType": "body",
                    "gemName": "frostbolt",
                    "key": "t",
                    "level": 1,
                    "quality": {
                        "damage": {
                            "cold": {
                                "increase": {
                                    "formula": "value + (quality/100)"
                                }
                            }
                        }
                    },
                    "socketId": 1
                }
            ],
            "mouse": []
        };

        expect(result).toEqual(expectedRes);
    });

    test('add button to active gem | mouse device', () => {
        //given
        const input = 'setbutton mouse right frostbolt body 1';
        //when
        const characterTests = new Character();
        const action = new Action(characterTests);

        characterTests.equip('body', 'tabula_rasa');
        characterTests.setGem(1, { gemName: 'frostbolt', gemLevel: 1, gemQuality: 0}, 'body');
        const result = action.parseCommand(input);
        //then
        const expectedRes = {
            "key": [],
            "mouse": [{
                "equipmentType": "body",
                "gemName": "frostbolt",
                "key": "right",
                "level": 1,
                "quality": {
                    "damage": {
                        "cold": {
                            "increase": {
                                "formula": "value + (quality/100)"
                            }
                        }
                    }
                },
                "socketId": 1
            }]
        };
        expect(result).toEqual(expectedRes);
    });

    test('set button to active gem, when it is already setbutton to some key', () => {
        //given
        const input = 'setbutton key q iceNova body 2';
        //when
        character.equip('body', 'tabula_rasa');
        character.setGem(1, { gemName: 'frostbolt', gemLevel: 1, gemQuality: 0}, 'body');
        character.setGem(2, { gemName: 'iceNova', gemLevel: 1, gemQuality: 0}, 'body');

        const result = action.parseCommand(input);
        //then
        const expectedRes = {
            "key": [
                {
                    "equipmentType": "body",
                    "gemName": "frostbolt",
                    "key": "t",
                    "level": 1,
                    "quality": {
                        "damage": {
                            "cold": {
                                "increase": {
                                    "formula": "value + (quality/100)"
                                }
                            }
                        }
                    },
                    "socketId": 1
                },
                {
                    "equipmentType": "body",
                    "gemName": "iceNova",
                    "key": "q",
                    "level": 1,
                    "quality": {
                        "damage": {
                            "cold": {
                                "increase": {
                                    "formula": "value + (quality/100)"
                                }
                            }
                        }
                    },
                    "socketId": 2
                }
            ],
            "mouse": []
        };
        expect(result).toEqual(expectedRes);
    })
});