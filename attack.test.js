const attack = require('./attack')
const buttons = require('./buttons')

test('Перевірка функції підрахунку damage скіла.', function () {

    var result = attack.calculateDamage('2 + lvl * 2', 50, 2)
    expect(result).toBe(9)
})


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Тест робочий, але функція checkAllGemsForSupportingThisGem не мокається і через це він не працює.
// Якщо її закоментити в коді, то все ок.
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
test('Перевірка функції, які підраховує характеристики ударі.' +
    'Вхідні дані - кнопка, яку натискає користувач.' +
    'Вихідні дані - характеристики удару.', function () {

    attack.checkAllGemsForSupportingThisGem = jest.fn(attack.checkAllGemsForSupportingThisGem).mockImplementationOnce(function () {

        console.log("Mock")
    })

    buttons.buttons = {
        q: {
            id: 1,
            Frostbolt: {
                key: 1,
                tags: ["Spell", "Projectile", "Cold"],
                'slot color': 'Blue',
                'non-damage parameters': {
                    "projectiles": 1,
                    "cast speed": 0.75,
                    "piercing": "",
                    "mana cost": "5 + lvl"
                },
                damage: {
                    "type": "cold",
                    "formula": "200 + 5 * lvl * lvl"
                },
                quality: 'lvl * qua',
                'button status': 'true',
                setQuality: 1,
                setLvl: 1
            }
        }
    }

    var result = attack.checkButtonAndAttack('q')
    expect(result).toBe(322)
})