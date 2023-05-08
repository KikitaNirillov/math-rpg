import { LocationData } from "@base/locations";
import mapBackground from '@sprites/locations/location2/mapBackground.png'
import fightBackground from '@sprites/locations/location2/fightBackground.png'
import inn from '@sprites/locations/location2/inn.png'
import lair from '@sprites/locations/location2/lair.png'
import store from '@sprites/locations/location2/store.png'
import currency from '@sprites/locations/location2/currencyImg.png'
import toBoss from '@sprites/locations/location2/toBoss.png'

export const data: LocationData = {
    locationName: "location2",
    mapBackgroundImg: mapBackground,
    fightBackgroundImg: fightBackground,
    currencyImg: currency,
    locationEnvironment: {
        lairIcon: lair,
        innIcon: inn,
        storeIcon: store,
        toBossIcon: toBoss,
    },
    livingMonsterNames: ['miniBoss1Loc2', 'miniBoss2Loc2', 'miniBoss3Loc2'],
    mainBossName: 'mainBossLoc2',
}