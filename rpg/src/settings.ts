const settings = {
    delayForScenes: 1000,
    opacityTransition: 1200, 
    opacityTransitionForUnblockScreen: 480, 
    mandatoryLoadingScreenTime: 1000,
    delayBeforeEnemyAttack: 5000,
    gameOverScreenTime: 2000,
    changingHealthPointsTransition: 1000,
    timeForEnemysDie: 2000,
    requiredTalkTime: 1000, // for talk  to the enemy when histype mainBoss or EnemyHealthPoints > requiredEnemyHealthPointsForConversation

    maxPlayerHelthPoints: 100,

    // Coins:
    defaultRewardForMiniBoss: 3,
    pricePerInn: 3,
    // other prices specified in rpg/src/common/inventoryItemsInfo.ts

    // Potions:
    addedHealthPointsByHealthPotion: 25,
    durationOfFreezing: 2, // 2 additional players attacks
    durationOfPoison: 3,
    additionalDamageByPoison: 10,

    requiredEnemyHealthPointsForConversation: 50,
}

export default settings