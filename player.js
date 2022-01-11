const equipments = require('./data/equipments.json');

module.exports = class Player {
    constructor(data) {
        this.data = data
    }


    playerSkillsVisualisation () {
        let playerData = this.createPlayer()

    }

    createPlayer() {
        let equipmentBodyData = this.getequipmentBodyData()
        let playerObjact = {
            id: 1,
            playerName: this.data.playerName,
            equipmentBody: {
                name : equipmentBodyData.name,
                sockets : equipmentBodyData.sockets
            },
            equipmentHelm: {
                name : "",
                sockets : ""
            }
        }
        console.log(playerObjact)
        return playerObjact
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
