const equipments = require('./data/equipments.json');
const gems = require('./data/gems.json');

module.exports = class Player {

    static Character = ''

    constructor(data) {
        this.data = data
    }

    setGemInItem(type,place,gem){
        console.log(gems.Gems)
        Player.Character['equipmentBody']['sockets'][`${place}` + "-W"] = gem;

        console.log(gem)
        // let obj = Object.keys(gems.Gems).find(key => gems.Gems[key] === gem);


        console.log(obj)

        console.log(Player.Character)
    }


    playerSkillsVisualisation () {
        let playerData = this.createPlayer()

    }

    showAllSockets(sockets){
        var _sockets = []
        for (var i = 0; i < sockets.length; i++){
            _sockets.push(Object.keys(sockets[i]))
            _sockets.push(Object.values(sockets[i]))
        }
        return _sockets
    }

    createPlayer() {
        let equipmentBodyData = this.getequipmentBodyData()
        let playerObject = {
            id: 1,
            playerName: this.data.playerName,
            equipmentBody: {
                name : equipmentBodyData.name,
                sockets :  equipmentBodyData.sockets
            },
            equipmentHelm: {
                name : "",
                sockets : ""
            }
        }
        Player.Character = playerObject
        console.log(playerObject.equipmentBody)
        return playerObject
    }

    getequipmentBodyData(){
            let equipmentType = this.data.typeOfEquip;
            let equipmentName = this.data.nameOfEquip;
        switch (equipmentName) {
            case 'tabula_rasa' :
                let equipmentNameData = equipments[equipmentType].find(item => item.name === equipmentName)
                return equipmentNameData
                break;
            case 'setgem' :
                break;
            case 'setbutton' :
                break;
        }
    }
}
