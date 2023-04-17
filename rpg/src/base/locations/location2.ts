import { LocationData } from "@base/locations";
import mapBackgroundLoc2 from '@sprites/locations/location2/backgrounds/mapBackgroundLoc2.jpg'
import fightBackgroundLoc2 from '@sprites/locations/location2/backgrounds/fightBackgroundLoc2.jpg'
import innIconLoc2 from '@sprites/locations/location2/environment/innIconLoc2.jpg'
import lairIconLoc2 from '@sprites/locations/location2/environment/lairIconLoc2.jpg'
import storeIconLoc2 from '@sprites/locations/location2/environment/storeIconLoc2.jpg'
import currencyImgLoc2 from '@sprites/locations/location2/currencyImgLoc2.png'

export const data: LocationData = {
    locationName: "location2",
    mapBackgroundImg: mapBackgroundLoc2,
    fightBackgroundImg: fightBackgroundLoc2,
    currencyImg: currencyImgLoc2,
    locationEnvironment: {
        lairIcon: lairIconLoc2,
        innIcon: innIconLoc2,
        storeIcon: storeIconLoc2,
    },
    livingMonsterNames: ['miniBoss1Loc2', 'miniBoss2Loc2', 'miniBoss3Loc2'],
    mainBossName: 'mainBossLoc2'
}