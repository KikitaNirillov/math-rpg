import { LocationData } from "@base/locations";
import mapBackground from '@sprites/locations/location1/mapBackground.gif'
import fightBackground from '@sprites/locations/location1/fightBackground.jpg'
import inn from '@sprites/locations/location1/inn.png'
import lair from '@sprites/locations/location1/lair.png'
import store from '@sprites/locations/location1/store.png'
import currency from '@sprites/locations/location1/currencyImg.png'
import toBoss from '@sprites/locations/location1/toBoss.png'

export const data: LocationData = {
    locationName: "location1",
    mapBackgroundImg: mapBackground,
    fightBackgroundImg: fightBackground,
    currencyImg: currency,
    locationEnvironment: {
        lairIcon: lair,
        innIcon: inn,
        storeIcon: store,
        toBossIcon: toBoss,
    },
    livingMonsterNames: ['miniBoss1Loc1', 'miniBoss2Loc1', 'miniBoss3Loc1'],
    mainBossName: 'mainBossLoc1'
}