const Parser = require('expr-eval').Parser;
const conf = require('../conf');

class CastProcessor {
    
    calculateCast(gem, usedEquipment, equipment) {
        const [suitableGems, suitableEquipment, flasks] = this.getSuitableSupportGems(gem, usedEquipment, equipment);
        const result = this.processCalculations(gem, suitableGems, suitableEquipment, flasks);
        return result;
    }

    getSuitableSupportGems(gem, usedEquipment, equipment) {
        const suitableEquipment = [];
        const flasks = [];
        const linkedSocketsIds = usedEquipment.getAllLinkedSocketsIds(gem.socketId);

        let supportGems = [];
        for(const equipmentItem of equipment) {
            if (equipmentItem.type === 'flask') {
                flasks.push(equipmentItem);
            }
            if (equipmentItem.type === usedEquipment.type) {
                supportGems = equipmentItem.getAvailableSocketsGemsByType('support');
                supportGems.concat(supportGems);
                suitableEquipment.push(equipmentItem);
            }
        }

        const suitableGems = [];

        for (const gemTag of gem.tags.concat('Support')) {
            for (const supportGem of supportGems) {
                if (gemTag === 'Support' && supportGem.tags.length === 1 && supportGem.tags[0] === 'Support') {
                    if (!linkedSocketsIds.includes(supportGem.socketId)) continue;
                    suitableGems.push(supportGem);
                    continue;
                } else if (gemTag === 'Support') {
                    continue;
                }
                for(const supportGemTag of supportGem.tags) {
                    if (gemTag === supportGemTag) {
                        if (!linkedSocketsIds.includes(supportGem.socketId)) continue;
                        suitableGems.push(supportGem);
                    }
                }
            }
        }

        return [suitableGems, suitableEquipment, flasks];
    }

    processCalculations(gem, suitableGems, suitableEquipment, flasks) {
        const calculationFormulas = this.prepareCalculationFormulas(gem, suitableGems, suitableEquipment, flasks);
        const result = this.processCalculationsFormulas(calculationFormulas);
        return result;
    }

    checkEffectLevel(gem, suitableGems, suitableEquipment) {
        const affectGemsOrEquipment = suitableGems.concat(suitableEquipment);
        for(let affectGemOrEquipment of affectGemsOrEquipment) {
            if (affectGemOrEquipment.affectLevel) {
                //check if affect for skillGem level exist? calculate
                if (affectGemOrEquipment.affectLevel.skillGem) {
                    gem.level = Math.ceil(this.calculateFormula(
                        gem.level,
                        affectGemOrEquipment.getFormula('affectLevel','skillGem'),
                        { value: gem.level }
                    ));
                }
                //check if affect for suitableGems(support) level exist? calculate
                if (affectGemOrEquipment.affectLevel.supportGem) {
                    affectGemOrEquipment.skip = true;
                    for (const suitableGem of suitableGems) {
                        if (affectGemOrEquipment.skip) continue;
                        suitableGem.level = this.calculateFormula(
                            suitableGem.level,
                            affectGemOrEquipment.getFormula('affectLevel','supportGem'),
                            { value: suitableGem.level }
                        );
                    }
                    affectGemOrEquipment.skip = false;
                }
            }
        }
    }

    getFlasksDamage(flasks) {
        let flaskDamage = 0;
        for (const flask of flasks) {
            flaskDamage += flask.flaskDamage;
        }
        return flaskDamage;
    }

    prepareCalculationFormulas(gem, suitableGems, suitableEquipment, flasks) {
        this.checkEffectLevel(gem, suitableGems, suitableEquipment);
        const flaskDamage = this.getFlasksDamage(flasks);

        const calculationFormulas = {};

        let affectGemsOrEquipment = [];
        affectGemsOrEquipment.push(gem);
        affectGemsOrEquipment = affectGemsOrEquipment.concat(suitableGems);
        affectGemsOrEquipment = affectGemsOrEquipment.concat(suitableEquipment);

        for (const affectGemOrEquipment of affectGemsOrEquipment) {


            /*** GET FORMULAS  FOR DAMAGE START*/
            //get Formulas For damage
            for (const damageType of conf.damageTypes) {
                if (affectGemOrEquipment.damage && affectGemOrEquipment.damage[damageType]) {
                    if (!calculationFormulas.damage) {
                        calculationFormulas.damage = {};
                    }
                    if (!calculationFormulas.damage[damageType]) {
                        calculationFormulas.damage[damageType] = { formulas: [] };
                    }
                    let formula = affectGemOrEquipment.getFormula('damage', damageType);
                    if (affectGemOrEquipment.useFlask) {
                        formula = formula.replace('flask damage', flaskDamage);
                    }
                    calculationFormulas.damage[damageType].formulas.push(formula);
                }

                // quality damage ****
                if (affectGemOrEquipment.quality
                    && affectGemOrEquipment.quality.damage
                    && affectGemOrEquipment.quality.damage[damageType]) {
                    if (!calculationFormulas.quality) {
                        calculationFormulas.quality = {};
                    }
                    if (!calculationFormulas.quality.damage) {
                        calculationFormulas.quality.damage = {};
                    }
                    if (!calculationFormulas.quality.damage[damageType]) {
                        calculationFormulas.quality.damage[damageType] =
                            {
                                increase: { formulas: [] },
                                decrease: { formulas: [] }
                            }
                    }
                    let formula = affectGemOrEquipment.getFormula('damage', damageType, true);
                    if (affectGemOrEquipment.useFlask) {
                        formula = formula.replace('flask damage', flaskDamage);
                    }
                    calculationFormulas.quality.damage[damageType].increase.formulas.push(formula.increase);
                    calculationFormulas.quality.damage[damageType].decrease.formulas.push(formula.decrease);
                }
                // quality ****
            }
            /*** GET FORMULAS  FOR DAMAGE END*/


            /*** GET FORMULAS  FOR NON DAMAGE START*/
            //get formulas for non damage
            for (const nonDamageParam of conf.nonDamageParams) {
                if (affectGemOrEquipment.nonDamage && affectGemOrEquipment.nonDamage[nonDamageParam]) {
                    if (!calculationFormulas.nonDamage) {
                        calculationFormulas.nonDamage = {};
                    }
                    if (!calculationFormulas.nonDamage[nonDamageParam]) {
                        calculationFormulas.nonDamage[nonDamageParam] = { formulas: [] };
                    }
                    let formula = affectGemOrEquipment.getFormula('nonDamage', nonDamageParam);
                    if (affectGemOrEquipment.useFlask) {
                        // formula = formula.replace('flask damage', ); add flask logic
                    }
                    calculationFormulas.nonDamage[nonDamageParam].formulas.push(formula);
                }

                //quality damage ****
                if (affectGemOrEquipment.quality
                    && affectGemOrEquipment.quality.nonDamage
                    && affectGemOrEquipment.quality.nonDamage[nonDamageParam]) {
                    if (!calculationFormulas.quality) {
                        calculationFormulas.quality = {};
                    }
                    if (!calculationFormulas.quality.nonDamage) {
                        calculationFormulas.quality.nonDamage = {};
                    }
                    if (!calculationFormulas.quality.nonDamage[nonDamageParam]) {
                        calculationFormulas.quality.nonDamage[nonDamageParam] =
                            {
                                increase: { formulas: [] },
                                decrease: { formulas: [] }
                            };
                    }
                    let formula = affectGemOrEquipment.getFormula('nonDamage', nonDamageParam, true);
                    if (affectGemOrEquipment.useFlask) {
                        // formula = formula.replace('flask damage', ); add flask logic
                    }
                    calculationFormulas.quality.nonDamage[nonDamageParam].increase.formulas.push(formula.increase);
                    calculationFormulas.quality.nonDamage[nonDamageParam].decrease.formulas.push(formula.decrease);
                }
                //quality ****
            }
            /*** GET FORMULAS  FOR NON DAMAGE END*/
            //get formulas for quality (increase decrease)
        }

        return calculationFormulas;
    }

    processCalculationsFormulas(calculationFormulas) {
        const calculationResult = {};

        /*** CALCULATING DAMAGE START*/
        if (calculationFormulas.damage) {
            for (const damageType of conf.damageTypes) {
                if (damageType === 'all') continue;
                if (!calculationFormulas.damage[damageType]) continue;
                if (calculationFormulas.damage[damageType].formulas) {
                    if (!calculationResult.damage) {
                        calculationResult.damage = {};
                    }
                    if (!calculationResult.damage[damageType]) {
                        calculationResult.damage[damageType] = { value: 0 };
                    }

                    for(const formula of calculationFormulas.damage[damageType].formulas) {
                        calculationResult.damage[damageType].value = this.calculateFormula(
                            calculationResult.damage[damageType].value,
                            formula,
                            { value: calculationResult.damage[damageType].value }
                        );
                    }
                }
            }

            if (calculationFormulas.damage.all && calculationFormulas.damage.all.formulas) {
                for(const formula of calculationFormulas.damage.all.formulas) {
                    for (const damageType of conf.damageTypes) {
                        if (calculationResult.damage[damageType]) {
                            calculationResult.damage[damageType].value = this.calculateFormula(
                                calculationResult.damage[damageType].value,
                                formula,
                                { value: calculationResult.damage[damageType].value }
                            );
                        }
                    }
                }
            }
        }
        /*** CALCULATING DAMAGE END*/

        /*** CALCULATING NON DAMAGE START*/
        if (calculationFormulas.nonDamage) {
            for (const nonDamageParam of conf.nonDamageParams) {
                if (!calculationFormulas.nonDamage[nonDamageParam]) continue;
                if (calculationFormulas.nonDamage[nonDamageParam].formulas) {
                    if (!calculationResult.nonDamage) {
                        calculationResult.nonDamage = {};
                    }
                    if (!calculationResult.nonDamage[nonDamageParam]) {
                        calculationResult.nonDamage[nonDamageParam] = { value: 0 };
                    }

                    for(const formula of calculationFormulas.nonDamage[nonDamageParam].formulas) {
                        calculationResult.nonDamage[nonDamageParam].value = this.calculateFormula(
                            calculationResult.nonDamage[nonDamageParam].value,
                            formula,
                            { value: calculationResult.nonDamage[nonDamageParam].value }
                        );
                    }
                }
            }
        }
        /*** CALCULATING NON DAMAGE END*/


        /*** CALCULATING QUALITY START*/
        if (calculationFormulas.quality) {
            //check quality damage ******
            for (const damageType of conf.damageTypes) {
                if (!calculationFormulas.quality.damage[damageType]) continue;
                if (calculationFormulas.quality.damage[damageType]) {
                    if (!calculationResult.quality) {
                        calculationResult.quality = {};
                    }
                    if (!calculationResult.quality.damage) {
                        calculationResult.quality.damage = {};
                    }
                    if (!calculationResult.quality.damage[damageType]) {
                        calculationResult.quality.damage[damageType] = { increase_value: 0, decrease_value: 0 };
                    }

                    //increase
                    for(const formula of calculationFormulas.quality.damage[damageType].increase.formulas) {
                        calculationResult.quality.damage[damageType].increase_value = this.calculateFormula(
                            calculationResult.quality.damage[damageType].increase_value,
                            formula,
                            { value: calculationResult.quality.damage[damageType].increase_value }
                        );
                    }
                    //decrease
                    for(const formula of calculationFormulas.quality.damage[damageType].decrease.formulas) {
                        calculationResult.quality.damage[damageType].decrease_value = this.calculateFormula(
                            calculationResult.quality.damage[damageType].decrease_value,
                            formula,
                            { value: calculationResult.quality.damage[damageType].decrease_value }
                        );
                    }
                    //
                }
            }
            //check quality damage ******


            //check quality non damage ******
            for (const nonDamageParam of conf.nonDamageParams) {
                if (!calculationFormulas.quality.nonDamage) continue;
                if (!calculationFormulas.quality.nonDamage[nonDamageParam]) continue;
                if (calculationFormulas.quality.nonDamage[nonDamageParam]) {
                    if (!calculationResult.quality.nonDamage) {
                        calculationResult.quality.nonDamage = {};
                    }
                    if (!calculationResult.quality.nonDamage[nonDamageParam]) {
                        calculationResult.quality.nonDamage[nonDamageParam] = { increase_value: 0, decrease_value: 0 };
                    }

                    for(const formula of calculationFormulas.quality.nonDamage[nonDamageParam].increase.formulas) {
                        calculationResult.quality.nonDamage[nonDamageParam].increase_value = this.calculateFormula(
                            calculationResult.quality.nonDamage[nonDamageParam].increase_value,
                            formula,
                            { value: calculationResult.quality.nonDamage[nonDamageParam].increase_value }
                        );
                    }

                    for(const formula of calculationFormulas.quality.nonDamage[nonDamageParam].decrease.formulas) {
                        calculationResult.quality.nonDamage[nonDamageParam].decrease_value = this.calculateFormula(
                            calculationResult.quality.nonDamage[nonDamageParam].decrease_value,
                            formula,
                            { value: calculationResult.quality.nonDamage[nonDamageParam].decrease_value }
                        );
                    }
                }
            }
            //check quality non damage ******
        }

        /*** CALCULATING QUALITY END*/


        /*** CALCULATING DAMAGE INCREAE DESCRESE START*/
        //base damage increase
        for (const damageType of conf.damageTypes) {
            if (damageType === 'all') continue;
            if (calculationResult.damage[damageType]
                && calculationResult.damage[damageType].value
                && calculationResult.quality.damage
                && calculationResult.quality.damage[damageType]
                && calculationResult.quality.damage[damageType].increase_value) {
                calculationResult.damage[damageType].value =
                    calculationResult.damage[damageType].value
                    * (1 + calculationResult.quality.damage[damageType].increase_value/100);
            }

            if (calculationResult.quality.damage
                && calculationResult.quality.damage.all
                && calculationResult.quality.damage.all.increase_value) {
                calculationResult.damage[damageType].value =
                    calculationResult.damage[damageType].value
                    * (1 + calculationResult.quality.damage.all.increase_value/100);
            }

        }

        //base damage decrease
        for (const damageType of conf.damageTypes) {
            if (damageType === 'all') continue;
            if (calculationResult.damage[damageType]
                && calculationResult.damage[damageType].value
                && calculationResult.quality.damage
                && calculationResult.quality.damage[damageType]
                && calculationResult.quality.damage[damageType].decrease_value) {
                calculationResult.damage[damageType].value =
                    calculationResult.damage[damageType].value
                    * (1 + calculationResult.quality.damage[damageType].decrease_value/100);
            }

            if (calculationResult.quality.damage
                && calculationResult.quality.damage.all
                && calculationResult.quality.damage.all.decrease_value) {
                calculationResult.damage[damageType].value =
                    calculationResult.damage[damageType].value
                    * (1 + calculationResult.quality.damage.all.decrease_value/100);
            }

        }
        /*** CALCULATING DAMAGE INCREAE DESCRESE END*/

        /*** CALCULATING NON DAMAGE INCREAE DESCRESE START*/
        //non damage increase
        for (const nonDamageParam of conf.nonDamageParams) {
            if (nonDamageParam === 'all') continue;
            if (calculationResult.nonDamage[nonDamageParam]
                && calculationResult.nonDamage[nonDamageParam].value
                && calculationResult.quality.nonDamage
                && calculationResult.quality.nonDamage[nonDamageParam]
                && calculationResult.quality.nonDamage[nonDamageParam].increase_value) {
                calculationResult.nonDamage[nonDamageParam].value =
                    calculationResult.nonDamage[nonDamageParam].value
                    * (1 + calculationResult.quality.nonDamage[nonDamageParam].increase_value/100);
            }

            if (calculationResult.quality.nonDamage
                && calculationResult.quality.nonDamage.all
                && calculationResult.quality.nonDamage.all.increase_value) {
                calculationResult.nonDamage[nonDamageParam].value =
                    calculationResult.nonDamage[nonDamageParam].value
                    * (1 + calculationResult.quality.nonDamage.all.increase_value/100);
            }

        }
        //non damage decrese
        for (const nonDamageParam of conf.nonDamageParams) {
            if (nonDamageParam === 'all') continue;
            if (calculationResult.nonDamage[nonDamageParam]
                && calculationResult.nonDamage[nonDamageParam].value
                && calculationResult.quality.nonDamage
                && calculationResult.quality.nonDamage[nonDamageParam]
                && calculationResult.quality.nonDamage[nonDamageParam].decrease_value) {
                calculationResult.nonDamage[nonDamageParam].value =
                    calculationResult.nonDamage[nonDamageParam].value
                    * (1 + calculationResult.quality.nonDamage[nonDamageParam].decrease_value/100);
            }

            if (calculationResult.quality.nonDamage
                && calculationResult.quality.nonDamage.all
                && calculationResult.quality.nonDamage.all.decrease_value) {
                calculationResult.nonDamage[nonDamageParam].value =
                    calculationResult.nonDamage[nonDamageParam].value
                    * (1 + calculationResult.quality.nonDamage.all.decrease_value/100);
            }
        }
        /*** CALCULATING NON DAMAGE INCREAE DESCRESE END*/

        return calculationResult;
    }

    calculateFormula(value, formula, params) {
        const parser = new Parser();
        let expr = parser.parse(formula);
        value = expr.evaluate(params);
        const m = Math.pow(10,5);
        return Math.round(value*m)/m;
    }
}

module.exports = CastProcessor;