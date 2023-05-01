import { LocationData } from "@base/locations";
import mapBackground from '@sprites/locations/location2/mapBackground.jpg'
import fightBackground from '@sprites/locations/location2/fightBackground.jpg'
import inn from '@sprites/locations/location2/inn.jpg'
import lair from '@sprites/locations/location2/lair.jpg'
import store from '@sprites/locations/location2/store.jpg'
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