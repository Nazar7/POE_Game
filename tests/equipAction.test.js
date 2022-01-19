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
        const input = 'equip body tabula_rasa';
        //when
        const result = action.parseCommand(input);
        //then
        expect(result).toEqual('Equipment Added: {"_name":"tabula_rasa","_info":{},"_sockets":[{"_id":1,"_color":"white","_gem":{}},{"_id":2,"_color":"white","_gem":{}},{"_id":3,"_color":"white","_gem":{}},{"_id":4,"_color":"white","_gem":{}},{"_id":5,"_color":"white","_gem":{}},{"_id":6,"_color":"white","_gem":{}}],"_type":"body","_affectLevel":false,"_useFlask":false,"_damage":false,"_nonDamage":false,"_quality":false,"_flaskDamage":false}');
    });

    test('add equipment to slots body, when it is an equip already on body => success replace: tabula_rasa to corruption_sanctuary', () => {
        //given
        const input = 'equip body corruption_sanctuary'
        //when
        character.equip( 'body', 'tabula_rasa');

        const result = action.parseCommand(input);
        //then
        expect(result).toEqual('Equipment Added: {"_name":"corruption_sanctuary","_info":{},"_sockets":[{"_id":1,"_color":"blue","_gem":{}},{"_id":2,"_color":"blue","_gem":{}},{"_id":3,"_color":"red","_gem":{}}],"_type":"body","_affectLevel":{"skillGem":{"formula":"value + 3"},"supportGem":{"formula":"value + 3"}},"_useFlask":false,"_damage":{"lightning":{"formula":"value + 5"}},"_nonDamage":false,"_quality":{"damage":{"lightning":{"increase":{"formula":"value + 40"}}}},"_flaskDamage":false}');
    });
});


