const equipments = require('./data/equipments.json');
const gems = require('./data/gems.json');
const util = require('util')

module.exports = class Player {

    static Character = ''

    constructor(data) {
        this.data = data
    }

    setGemInItem(type, place, gem) {
        gems.Gems.forEach((item) => {
            for (let property in item) {
                if (property == gem) {
                    Player.Character['equipmentBody']['sockets'][`${place}` + "-W"] = item;
                }
            }
        })
        // console.log(Player.Character.equipmentBody.sockets)
        console.log(util.inspect(Player.Character.equipmentBody.sockets, {showHidden: false, depth: null, colors: true}))
        return Player.Character.equipmentBody.sockets
    }

    createPlayer() {
        let equipmentBodyData = this.getequipmentBodyData()
        let playerObject = {
            id: 1,
            playerName: this.data.playerName,
            equipmentBody: {
                name: equipmentBodyData.name,
                sockets: equipmentBodyData.sockets
            },
            equipmentHelm: {
                name: "",
                sockets: ""
            }
        }
        Player.Character = playerObject
        console.log(playerObject.equipmentBody)
        return playerObject
    }

    getequipmentBodyData() {
        let equipmentType = this.data.typeOfEquip;
        let equipmentName = this.data.nameOfEquip;
        console.log(equipmentType)
        console.log(equipmentName)
        switch (equipmentName) {
            case 'tabula_rasa' :
                let equipmentNameData = equipments[equipmentType].find(item => item.name === equipmentName)
                return equipmentNameData
                break;
        }
    }
}
