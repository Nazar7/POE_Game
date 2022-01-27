//PATH
const conf = {};

conf.dataPath = './data/';

//GEMS CONFIGURATIONS
conf.gemTypes = ['skill', 'support'];

//EQUIPMENT CONFIGURATIONS
conf.equipmentTypes = ['body', 'flask', 'weapon'];

//ALLOWED DEVICES
conf.allowedDevices = ['mouse', 'key'];

//DAMAGE TYPES
conf.damageTypes = ['fire', 'cold', 'chaos', 'lightning', 'physical', 'all'];

//GEM PARAMS
conf.nonDamageParams = ['manaCost', 'castSpeed', 'attackSpeed', 'projectiles', 'angles'];
conf.damageParams = ['damage'];

module.exports = conf;