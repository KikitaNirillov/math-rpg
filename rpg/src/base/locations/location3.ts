import { LocationData } from "@base/locations";
import mapBackgroundLoc3 from '@sprites/locations/location3/backgrounds/mapBackgroundLoc3.jpg'
import fightBackgroundLoc3 from '@sprites/locations/location3/backgrounds/fightBackgroundLoc3.jpg'
import innIconLoc3 from '@sprites/locations/location3/environment/innIconLoc3.jpg'
import lairIconLoc3 from '@sprites/locations/location3/environment/lairIconLoc3.jpg'
import storeIconLoc3 from '@sprites/locations/location3/environment/storeIconLoc3.jpg'
import currencyImgLoc3 from '@sprites/locations/location3/currencyImgLoc3.png'

export const data: LocationData = {
    locationName: "location3",
    mapBackgroundImg: mapBackgroundLoc3,
    fightBackgroundImg: fightBackgroundLoc3,
    currencyImg: currencyImgLoc3,
    locationEnvironment: {
        lairIcon: lairIconLoc3,
        innIcon: innIconLoc3,
        storeIcon: storeIconLoc3,
    },
    livingMonsterNames: ['miniBoss1Loc3', 'miniBoss2Loc3', 'miniBoss3Loc3'],
    mainBossName: 'mainBossLoc3'
}