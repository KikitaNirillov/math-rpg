import { EnemyName } from '@base/enemies';
export type LocationData = {
    locationName: LocationName,
    mapBackgroundImg: string,
    fightBackgroundImg: string,
    currencyImg: string,
    locationEnvironment: {
        lairIcon: string,
        innIcon: string,
        storeIcon: string,
    },
    livingMonsterNames: [EnemyName, EnemyName, EnemyName],
    mainBossName: EnemyName,
}

const locations = {
    location1: 'base/locations/location1',
    location2: 'base/locations/location2',
    location3: 'base/locations/location3',
}

export type LocationName = keyof typeof locations

const locationsNames = Object.keys(locations) as Array<LocationName>

export const requestLocationsNames = async (): Promise<Array<LocationName>> => (locationsNames)

export const requestLocation = async (locationName: LocationName): Promise<LocationData> => {
    let location = await import("" + locations[locationName])
    // delete require.cache[require.resolve("" + locations[locationName])];
    return location.data;
}