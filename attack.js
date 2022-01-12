const fs = require('fs')
const buttons = require('./buttons')

function userAttack(button) {

    checkButtonAndAttack(button)
}

function checkButtonAndAttack(button){

    for (var i = 0; i < Object.keys(buttons.buttons).length; i++){

        if (Object.keys(buttons.buttons)[i] == button){
            console.log(`User press ${button} and attack {damage:50...}`)
        }
    }
}

module.exports = {
    userAttack
}