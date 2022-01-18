//PATH
const conf = {};

conf.dataPath = './data/';

//GEMS CONFIGURATIONS
conf.gemTypes = ['skill', 'support'];

//EQUIPMENT CONFIGURATIONS
conf.equipmentTypes = ['body', 'flask'];

//ALLOWED DEVICES
conf.allowedDevices = ['mouse', 'key'];

//DAMAGE TYPES
conf.damageTypes = ['cold', 'chaos', 'lightning', 'physical', 'all'];

//GEM PARAMS
conf.nonDamageParams = ['manaCost', 'castSpeed', 'attackSpeed', 'projectiles'];
conf.damageParams = ['damage'];

module.exports = conf;