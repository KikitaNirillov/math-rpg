import { LocationData } from "@base/locations";
import mapBackground from '@sprites/locations/location3/mapBackground.gif'
import fightBackground from '@sprites/locations/location3/fightBackground.png'
import inn from '@sprites/locations/location3/inn.gif'
import lair from '@sprites/locations/location3/lair.png'
import store from '@sprites/locations/location3/store.png'
import currency from '@sprites/locations/location3/currencyImg.png'
import toBoss from '@sprites/locations/location3/toBoss.png'

export const data: LocationData = {
    locationName: "location3",
    mapBackgroundImg: mapBackground,
    fightBackgroundImg: fightBackground,
    currencyImg: currency,
    locationEnvironment: {
        lairIcon: lair,
        innIcon: inn,
        storeIcon: store,
        toBossIcon: toBoss,
    },
    livingMonsterNames: ['Decaid', 'Abandoner', 'Doombrace'],
    mainBossName: 'Lait',
}