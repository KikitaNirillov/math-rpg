export type HeroData = {
    name: HeroName,
    defaultImg: string,
    staticImg: string,
}

const heroes = {
    warrior: 'base/heroes/warrior',
    magician: 'base/heroes/magician'
}

export type HeroName = keyof typeof heroes

export const requestHero = async (heroName: HeroName): Promise<HeroData> => {
    let hero = await import("" + heroes[heroName])
    // delete require.cache[require.resolve("" + heroes[heroName])];
    return hero.data;
}