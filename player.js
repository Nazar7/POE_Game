const equipments = require('./data/equipments.json');

module.exports = class Player {
    constructor(data) {
        this.data = data
    }

    createPlayer() {
        let gemData = this.getGemData()
        let playerObjact = {
            id: 1,
            playerName: this.data.playerName,
            equipmentBody: {
                name : gemData.name,
                sockets : gemData.sockets
            },
            equipmentHelm: {
                name : "",
                sockets : ""
            }
        }
        console.log(playerObjact)
        return playerObjact
    }

    getGemData(){
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
