class Opponent {
    constructor(life) {
        this.Life = life;
        this.vulnerability = {};
    }

    findDamageType(gem) {
        if (gem.damage.fire) {
            return "fire"
        }
        if (gem.damage.cold) {
            return "cold"
        }
        if (gem.damage.chaos) {
            return "chaos"
        }
        if (gem.damage.lightning) {
            return "lightning"
        }
        if (gem.damage.physical) {
            return "physical";
        } else return 'cold';
    }

    addVulnerability(gem, damageType) {
        if (gem.vulnerability) {
            this.vulnerability[damageType] = 1 + gem.vulnerability[damageType].value;
            return this.vulnerability[damageType];
        }
    }

    checkResistance(resistance, damageType) {
        if (resistance[damageType] !== 0) {
            return (100 - resistance[damageType]) / 100;
        } else return 1;
    }

    findDamageValue(gem, damageType) {
        if (gem.damage[damageType]) {
            return gem.damage[damageType].value;
        } else return 0;
    }

    findProjectilesValue(gem) {
        if (gem.nonDamage.projectiles && gem.nonDamage.projectiles.value > 0) {
            return gem.nonDamage.projectiles.value;
        } else return 1;
    }

    reduceLife(gem, resistance) {
        const damageType = this.findDamageType(gem);
        this.addVulnerability(gem, damageType);
        const resistanceValue = this.checkResistance(resistance, damageType);
        const damage = this.findDamageValue(gem, damageType);
        const vulnerability = this.vulnerability[damageType] ? this.vulnerability[damageType] : 1;
        const projectiles = this.findProjectilesValue(gem);

        this.Life -= (damage * resistanceValue * vulnerability * projectiles);
        return this.Life;
    }
}

module.exports = Opponent;