import { EnemyName } from "@base/enemies";
import { LocationData, LocationName, requestLocation } from "@base/locations";
import { ActionWithPayload, AppThunk, Improvement } from "commonTypes";
import { discoverCurrentLocation } from "./gameReducer";
import { resetCoins, resetPlayerImprovements } from "./playerReducer";
import { changeDownloadQuantity } from "./sceneReducer";

enum locationActionList {
    SET_LOCATION = 'SET_LOCATION',
    REMOVE_MONSTER_NAME_FROM_LIVING_LIST = 'REMOVE_MONSTER_NAME_FROM_LIVING_LIST',
    REMOVE_IMPROVEMENT_FROM_AVAILABLE_LIST = 'REMOVE_IMPROVEMENT_FROM_AVAILABLE_LIST',
}

const initialState = {
    locationName: null as LocationName | null,
    mapBackgroundImg: undefined as string | undefined,
    fightBackgroundImg: undefined as string | undefined,
    locationEnvironment: {
        lairIcon: undefined as string | undefined,
        innIcon: undefined as string | undefined,
        storeIcon: undefined as string | undefined,
    },
    currencyImg: undefined as string | undefined,
    availableImprovements: ['damageImprovement', 'protectionImprovement', 'timeImprovement'] as Array<Improvement>,
    livingMonsterNames: [] as Array<EnemyName>,
    mainBossName: null as EnemyName | null,
}

type Action = SetLocation | RemoveMosterNameFromLivingList | RemoveImprovementFromAvailableList

const locationReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case locationActionList.SET_LOCATION:
            return {
                ...state,
                ...action.payload,
                availableImprovements: [...initialState.availableImprovements],
            }
        case locationActionList.REMOVE_MONSTER_NAME_FROM_LIVING_LIST:
            return {
                ...state,
                livingMonsterNames: state.livingMonsterNames.filter(monsterName => monsterName !== action.payload)
            }
        case locationActionList.REMOVE_IMPROVEMENT_FROM_AVAILABLE_LIST:
            return {
                ...state,
                availableImprovements: state.availableImprovements.filter(improvement => improvement !== action.payload)
            }
        default:
            return state;
    }
}

type SetLocation = ActionWithPayload<locationActionList.SET_LOCATION, LocationData>
const setLocation = (location: LocationData): SetLocation => ({
    type: locationActionList.SET_LOCATION,
    payload: location,
})

type RemoveMosterNameFromLivingList = ActionWithPayload<locationActionList.REMOVE_MONSTER_NAME_FROM_LIVING_LIST, EnemyName>
export const removeMosterNameFromLivingList = (enemyName: EnemyName): RemoveMosterNameFromLivingList => ({
    type: locationActionList.REMOVE_MONSTER_NAME_FROM_LIVING_LIST,
    payload: enemyName,
})

type RemoveImprovementFromAvailableList = ActionWithPayload<locationActionList.REMOVE_IMPROVEMENT_FROM_AVAILABLE_LIST, Improvement>
export const removeImprovementFromAvailableList = (improvementName: Improvement): RemoveImprovementFromAvailableList => ({
    type: locationActionList.REMOVE_IMPROVEMENT_FROM_AVAILABLE_LIST,
    payload: improvementName,
})

export const setNewLocation = (): AppThunk => (dispatch, getState) => {
    dispatch(changeDownloadQuantity("PLUS_ONE"))
    const newLocationName = getState().game.undiscoveredLocations[0]
    if (!newLocationName) console.warn('No undiscovered location found')
    else {
        dispatch(discoverCurrentLocation(newLocationName))
        requestLocation(newLocationName).then(location => {
            dispatch(setLocation(location))
            dispatch(resetCoins())
            dispatch(resetPlayerImprovements())
            dispatch(changeDownloadQuantity("MINUS_ONE"))
        })
    }
}

export default locationReducer