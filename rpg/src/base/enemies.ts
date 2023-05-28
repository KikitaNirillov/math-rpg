export type EnemyQuestion = {
    question: string,
    answers: {
        correctAnswer: string,
        incorrectAnswer: string,
    }
}
export type EnemyData = {
    name: EnemyName,
    enemyType: 'miniBoss' | 'mainBoss',
    defaultImg: string,
    staticImg: string,
    questions?: Array<EnemyQuestion>,
}

const enemies = {
    //first loc:
    'Perplexer': "base/enemies/perplexer",
    'Socipher': "base/enemies/socipher",
    'Pubertaliod': "base/enemies/pubertaliod",
    'Arly': "base/enemies/arly", //boss
    //second loc:
    'Houamai': "base/enemies/houamai",
    'Issuegen': "base/enemies/issuegen",
    'Ambidasher': "base/enemies/ambidasher",
    'Midwai': "base/enemies/midwai", // boss
    //third loc:
    'Decaid': "base/enemies/decaid",
    'Abandoner': "base/enemies/abandoner",
    'Doombrace': "base/enemies/doombrace",
    'Lait': "base/enemies/lait", //boss
}

export type EnemyName = keyof typeof enemies

export const requestEnemy = async (enemyName: EnemyName): Promise<EnemyData> => {
    let enemy = await import("" + enemies[enemyName])
    // delete require.cache[require.resolve("" + enemies[enemyName])];
    return enemy.data;
}