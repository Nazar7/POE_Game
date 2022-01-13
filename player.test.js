const Player = require("./player")
const util = require("util");

describe('PlayerService Class', () => {
let player
    beforeEach(() => {
        const obj = {
            typeOfEquip : "body",
            nameOfEquip : "tabula_rasa",
            playerName: "Nazar"
        }
        player = new Player(obj);
    })

    test("Receiving type of bodyequipment and its data ", function () {
        let body = {
                "name": "tabula_rasa",
                "sockets": {
                    "1-W": "Empty",
                    "2-W": "Empty",
                    "3-W": "Empty",
                    "4-W": "Empty",
                    "5-W": "Empty",
                    "6-W": "Empty"
                }
            };
        let briskwrap =   {
            "name": "briskwtap",
            "sockets": {
                "1-G": "",
                "2-G": "",
                "3-G": "",
                "4-R": "",
                "5-G": "",
                "6 G": ""
            }
        }
        let equipmentBodyData = player.getequipmentBodyData()
        expect(equipmentBodyData).toEqual(body)
    });

    test("Setting gem in selected socket and receiving updated player object", function () {


    })


    test("Creating new player and receiving new player object", function () {
        let play = {
            id: 1,
            playerName: "Nazar",
            equipmentBody: {
                name: "tabula_rasa",
                sockets: {
                    '1-W': 'Empty',
                    '2-W': 'Empty',
                    '3-W': 'Empty',
                    '4-W': 'Empty',
                    '5-W': 'Empty',
                    '6-W': 'Empty'
                }
            },
            equipmentHelm: { name: '', sockets: '' }
        }
        let playerObj = player.createPlayer()
        console.log(util.inspect(playerObj, {showHidden: false, depth: null, colors: true}) + " !!!!!!!!!!!!!!!!!!!")
        expect(playerObj).toEqual(play)
    })


});