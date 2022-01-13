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
                if (Array.isArray(gem)) {
                    if (property == gem[0]) {

                        Player.Character['equipmentBody']['sockets'][`${place}` + "-W"] = item
                        var lvl = gem[1]
                        var qua = gem[2]
                        Player.Character['equipmentBody']['sockets'][`${place}` + "-W"][gem[0]]['setLvl'] = lvl
                        Player.Character['equipmentBody']['sockets'][`${place}` + "-W"][gem[0]]['setQuality'] = qua
                    }
                } else {
                    if (property == gem) {

                        console.log("------------------")

                        for (var i = 0; i < Object.keys(Player.Character['equipmentBody']['sockets']).length; i++) {

                            var currentSocket = Object.keys(Player.Character['equipmentBody']['sockets'])[i]
                            // console.log(Object.keys(Player.Character['equipmentBody']['sockets'])[i])

                            if (currentSocket[0] == place) {
                                if (currentSocket[2] === 'W') {
                                    Player.Character['equipmentBody']['sockets'][currentSocket] = item
                                } else {
                                    for (let j = 0; j < gems.Gems.length; j++) {
                                        if (Object.keys(gems.Gems[j])[1] == gem) {
                                           if (currentSocket[2] == Object.values(gems.Gems[j])[1]['slot color'][0]){
                                               Player.Character['equipmentBody']['sockets'][currentSocket] = item
                                           } else {
                                               console.log("Cant add this gem in this socket !")
                                           }
                                        }
                                    }
                                }
                            }
                        }

                        console.log("------------------")

                        // Player.Character['equipmentBody']['sockets'][`${place}` + "-W"] = item;
                    }
                }
            }
        })
        // console.log(Player.Character.equipmentBody.sockets)
        console.log(util.inspect(Player.Character.equipmentBody.sockets, {
            showHidden: false,
            depth: null,
            colors: true
        }))
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
