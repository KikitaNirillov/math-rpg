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
    miniBoss1Loc1: "base/enemies/location1/miniBoss1Loc1",
    miniBoss2Loc1: "base/enemies/location1/miniBoss2Loc1", 
    miniBoss3Loc1: "base/enemies/location1/miniBoss3Loc1",
    mainBossLoc1: "base/enemies/location1/mainBossLoc1",
    miniBoss1Loc2: "base/enemies/location2/miniBoss1Loc2",
    miniBoss2Loc2: "base/enemies/location2/miniBoss2Loc2",
    miniBoss3Loc2: "base/enemies/location2/miniBoss3Loc2",
    mainBossLoc2: "base/enemies/location2/mainBossLoc2",
    miniBoss1Loc3: "base/enemies/location3/miniBoss1Loc3",
    miniBoss2Loc3: "base/enemies/location3/miniBoss2Loc3",
    miniBoss3Loc3: "base/enemies/location3/miniBoss3Loc3",
    mainBossLoc3: "base/enemies/location3/mainBossLoc3",
}

export type EnemyName = keyof typeof enemies

export const requestEnemy = async (enemyName: EnemyName): Promise<EnemyData> => {
    let enemy = await import("" + enemies[enemyName])
    // delete require.cache[require.resolve("" + enemies[enemyName])];
    return enemy.data;
}