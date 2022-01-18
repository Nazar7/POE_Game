const Player = require("../player");
const util = require("util");
const gems = require('../data/skillGems.json');

describe('PlayerService Class', () => {
    test('', () => {

    })
// let player
//     beforeEach(() => {
//         const obj = {
//             typeOfEquip : "body",
//             nameOfEquip : "tabula_rasa",
//             playerName: "Nazar"
//         }
//         player = new Player(obj);
//     })
//
//     test("Receiving type of player equipment and empty data object of this equipment ", function () {
//         let body = {
//                 "name": "tabula_rasa",
//                 "sockets": {
//                     "1-W": "Empty",
//                     "2-W": "Empty",
//                     "3-W": "Empty",
//                     "4-W": "Empty",
//                     "5-W": "Empty",
//                     "6-W": "Empty"
//                 }
//             };
//         let briskwrap =   {
//             "name": "briskwtap",
//             "sockets": {
//                 "1-G": "",
//                 "2-G": "",
//                 "3-G": "",
//                 "4-R": "",
//                 "5-G": "",
//                 "6 G": ""
//             }
//         }
//         let equipmentBodyData = player.getequipmentBodyData()
//         expect(equipmentBodyData).toEqual(body)
//     });
//
//     test("Setting gem in selected socket and receiving updated player object", function () {
//         let type = "body"
//         let place = 2
//         let gem = "Frostbolt"
//
//         let playerDataObjact1 = {
//             "2-W": {
//                 "Frostbolt": {
//                     "button status": "true",
//                     "damage": {
//                         "formula": "200 + 5 * lvl * lvl",
//                         "type": "cold"
//                     },
//                     "key": 1,
//                     "non-damage parameters": {
//                         "cast speed": 0.75,
//                         "piercing, mana cost": "5 + lv",
//                         "projectiles": 1
//                     },
//                     "quality": "lvl * qua",
//                     "setLvl": 1,
//                     "setQuality": 1,
//                     "slot color": "blue",
//                     "tags": [
//                         "Spell",
//                         "Projectile",
//                         "Cold"
//                     ]
//                 },
//                 "id": 1
//             }
//         }
//
//         let playerDataObjact20 = {
//             "2-W": {
//                 "Frostbolt": {
//                     "button status": "true",
//                     "damage": {
//                         "formula": "200 + 5 * lvl * lvl",
//                         "type": "cold"
//                     },
//                     "key": 1,
//                     "non-damage parameters": {
//                         "cast speed": 0.75,
//                         "piercing, mana cost": "5 + lv",
//                         "projectiles": 1
//                     },
//                     "quality": "lvl * qua",
//                     "setLvl": 20,
//                     "setQuality": 20,
//                     "slot color": "blue",
//                     "tags": [
//                         "Spell",
//                         "Projectile",
//                         "Cold"
//                     ]
//                 },
//                 "id": 1
//             }
//         }
//
//         let playerOb = player.setGemInItem(type, place, gem)
//         console.log(util.inspect(playerOb, {showHidden: false, depth: null, colors: true}))
//         expect(playerOb).toEqual(playerDataObjact1)
//     })
//
//
//     test("Creating new player and receiving new player object", function () {
//         let playerDataObjact = {
//             id: 1,
//             playerName: "Nazar",
//             equipmentBody: {
//                 name: "tabula_rasa",
//                 sockets: {
//                     '1-W': 'Empty',
//                     '2-W': 'Empty',
//                     '3-W': 'Empty',
//                     '4-W': 'Empty',
//                     '5-W': 'Empty',
//                     '6-W': 'Empty'
//                 }
//             },
//             equipmentHelm: { name: '', sockets: '' }
//         }
//         let playerObj = player.createPlayer()
//         console.log(util.inspect(playerObj, {showHidden: false, depth: null, colors: true}) + " !!!!!!!!!!!!!!!!!!!")
//         expect(playerObj).toEqual(playerDataObjact)
//     })


});