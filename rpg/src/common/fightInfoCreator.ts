import { EnemyName } from "@base/enemies"
import { HeroName } from "@base/heroes"
import settings from "settings"
import { Effect } from "@redux/enemyReducer"

type MainInfoVariablesKeys = 'warriorIsAttacker' | 'magicianIsAttacker'
type Info = {
    beforeEnemyName: string,
    afterEnemyName?: string,
}

const mainInfoVariables: Record<MainInfoVariablesKeys, Array<Info>> = {
    warriorIsAttacker: [
        {
            beforeEnemyName: ' took out the "Dawn Resonator" sword from the bag and hit ',
            afterEnemyName: ' on the back, leaving there a trail in the shape of a smiling sun and dealing '
        },
        {
            beforeEnemyName: ' took two cheeses out of the bag, ran up to ',
            afterEnemyName: ' and pushed them into his face with both hands, leaving the smell of cheese on him for a long time and inflicting '
        },
        {
            beforeEnemyName: ' took out two small swords "Ukhokhot" and "Ukhokhot 2" from the bag and hit ',
            afterEnemyName: ' with them, leaving him feeling that he was being bitten by dogs and causing '
        },
        {
            beforeEnemyName: ' took a mace out of the bag and threw it at ',
            afterEnemyName: ', hurting it and inflicting '
        },
        {
            beforeEnemyName: ', frowning, shouted a battle cry, rushed at ',
            afterEnemyName: ' and hit him with a powerful uppercut, causing '
        },
        {
            beforeEnemyName: ' quickly ran up to ',
            afterEnemyName: ', made a side jump and hit it with his carrot (which he accidentally took from the bag), dealing '
        },
    ],
    magicianIsAttacker: [
        {
            beforeEnemyName: ' shouted out a random word, ran to ',
            afterEnemyName: ', who was waiting for something, and hit it with his fist, causing '
        },
        {
            beforeEnemyName: ' took a teddy bear out of the bag and threw it at ',
            afterEnemyName: '. The bear was so cute that it gave the enemy a heart attack and dealt it '
        },
        {
            beforeEnemyName: " took the dragon's tooth from the bag and threw it into the air. The tooth turned into a meteorite and fell on ",
            afterEnemyName: "'s head, inflicting to it surprisingly only "
        },
        {
            beforeEnemyName: ' took out a scroll "Chicken" from the bag, read it and saw how a huge chicken beak appeared above ',
            afterEnemyName: ', which hit it, causing '
        },
        {
            beforeEnemyName: ' took a magic ball out of the bag and threw it to ',
            afterEnemyName: ' to play with it, but he did not have time to catch it and the ball hit it right in the face, causing '
        },
        {
            beforeEnemyName: ' took out the "Fireball" scroll from the bag and threw it at ',
            afterEnemyName: '. After the throw, he realized that the scroll needed to be read, but to his surprise, enemy received '
        },
    ],
}

type EffectInfoKeys = 'Frozen' | 'Poisoned'
const effectInfo: Record<EffectInfoKeys, Info> = {
    'Frozen': {
        beforeEnemyName: 'Due to the action of the freezing potion, ',
        afterEnemyName: ' cannot move'
    },
    'Poisoned': {
        beforeEnemyName: 'Due to the effect of the poison, ',
        afterEnemyName: ' receives an additional ' + settings.additionalDamageByPoison + ' damage'
    },
}

const fightInfoCreator = (
    attacker: 'player' | 'enemy',
    playerClass: HeroName | 'Player',
    enemyName: EnemyName | 'Enemy',
    enemyEffects: Array<Effect>,
    damage = 0,
): string => {
    let newFightMainInfo = ''
    let newFightAdditionalInfo = ''
    if (attacker === "player") {
        const array = mainInfoVariables[(playerClass + 'IsAttacker') as MainInfoVariablesKeys]
        const randomIndex = Math.floor(Math.random() * array.length)
        const info = array[randomIndex]
        if (damage === 0) {
            newFightMainInfo = playerClass + " missed. It's a pity."
        }
        else if (info.afterEnemyName) {
            newFightMainInfo = playerClass + ' ' + info.beforeEnemyName + ' ' + enemyName + ' ' + info.afterEnemyName + ' ' + damage + ' damage.'
        }
        else {
            newFightMainInfo = playerClass + ' ' + info.beforeEnemyName + ' ' + damage + ' damage to ' + enemyName + '.'
        }
        if (enemyEffects.length !== 0) {
            const arrayOfAdditionalInfo = enemyEffects.map(effect => effectInfo[effect.name].beforeEnemyName
                + enemyName + effectInfo[effect.name].afterEnemyName + '.')
            newFightAdditionalInfo = arrayOfAdditionalInfo.join(' ')
        }
    }
    else { // attacker === "enemy"
        if (damage === 0) {
            newFightMainInfo = playerClass + ' was able to dodge ' + enemyName + "'s blow."
        }
        else {
            newFightMainInfo = enemyName + ' inexplicably inflicted ' + damage + ' damage to ' + playerClass + '.'
        }
    }
    return stringToUpperCase(newFightMainInfo + ' ' + newFightAdditionalInfo)
}

const stringToUpperCase = (string: string) => {
    const newString = string.charAt(0).toUpperCase() + string.slice(1);
    return newString;
}

export default fightInfoCreator