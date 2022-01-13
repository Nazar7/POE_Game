const player = require("./player")

describe('PlayerService Class', () => {

    test("Checkin getTipsValue function if tips value are 0 or 10 ", function () {
        let result = tips.getTipsValue();
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(10);
    });
});