import { LocationData } from "@base/locations";
import mapBackgroundLoc1 from '@sprites/locations/location1/backgrounds/mapBackgroundLoc1.jpg'
import fightBackgroundLoc1 from '@sprites/locations/location1/backgrounds/fightBackgroundLoc1.jpg'
import innIconLoc1 from '@sprites/locations/location1/environment/innIconLoc1.jpg'
import lairIconLoc1 from '@sprites/locations/location1/environment/lairIconLoc1.jpg'
import storeIconLoc1 from '@sprites/locations/location1/environment/storeIconLoc1.jpg'
import currencyImgLoc1 from '@sprites/locations/location1/currencyImgLoc1.png'

export const data: LocationData = {
    locationName: "location1",
    mapBackgroundImg: mapBackgroundLoc1,
    fightBackgroundImg: fightBackgroundLoc1,
    currencyImg: currencyImgLoc1,
    locationEnvironment: {
        lairIcon: lairIconLoc1,
        innIcon: innIconLoc1,
        storeIcon: storeIconLoc1,
    },
    livingMonsterNames: ['miniBoss1Loc1', 'miniBoss2Loc1', 'miniBoss3Loc1'],
    mainBossName: 'mainBossLoc1'
}