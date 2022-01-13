const player = require("./player")

describe('PlayerService Class', () => {
    test("Receiving type of body equipment and its data ", function () {
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
        let briskwtap =   {
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
        let result = player.getequipmentBodyData();
        expect(result).toBe(body);
    });
});