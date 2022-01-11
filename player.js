const equipments = require('./data/equipments.json');

module.exports = class Player {

    static Character = ''

    constructor(data) {
        this.data = data
    }


    playerSkillsVisualisation () {
        let playerData = this.createPlayer()

    }

    showAllSockets(sockets){

        // var socket_color = []
        // var socket_info = []

        var _sockets = []

        for (var i = 0; i < sockets.length; i++){

            _sockets.push(Object.keys(sockets[i]))
            _sockets.push(Object.values(sockets[i]))
        }

        return _sockets
    }

    createPlayer() {
        var x = ""
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
        console.log(playerObject)
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
