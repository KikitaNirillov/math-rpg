import { AppThunk, ActionWithPayload } from 'commonTypes';
import { LocationName } from '@base/locations';
import { requestLocationsNames } from "@base/locations";
import { changeDownloadQuantity, setSceneWithTransition } from './sceneReducer';
import { EnemyName } from '@base/enemies';

enum gameActionsList {
    DISCOVER_CURRENT_LOCATION = 'DISCOVER_LOCATION',
    SET_UNDISCOVERED_LOCATIONS = 'SET_UNDISCOVERED_LOCATIONS',
    ADD_MONSTER_TO_KILLED_LIST = 'ADD_MONSTER_TO_KILLED_LIST',
    ADD_MONSTER_TO_DEREATED_LIST = 'ADD_MONSTER_TO_DEREATED_LIST',
    SET_TIPEWRITER_IS_WORKING = 'SET_TIPEWRITER_IS_WORKING',
    SET_TIPEWRITER_STOPPED = 'SET_TIPEWRITER_STOPPED',
}

const initialState = {
    undiscoveredLocations: [] as Array<LocationName>,
    stats: {
        killedMonsters: [] as Array<EnemyName>,
        defeatedMonsters: [] as Array<EnemyName>,
    },
    typeWriterIsWriting: false as boolean,
    typeWriterStopped: false as boolean,
}

type Action = SetUndiscoveredLocations | DiscoverCurrentLocation | AddMonsterToKilledList |
    AddMonsterToDefeatedList | SetTipeWritterIsWriting | SetTipeWritterStopped

const gameReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case gameActionsList.SET_UNDISCOVERED_LOCATIONS:
            return {
                ...state,
                undiscoveredLocations: action.payload,
            }
        case gameActionsList.DISCOVER_CURRENT_LOCATION:
            return {
                ...state,
                undiscoveredLocations: state.undiscoveredLocations.filter(locationName => locationName !== action.payload)
            }
        case gameActionsList.ADD_MONSTER_TO_KILLED_LIST:
            return {
                ...state,
                stats: {
                    ...state.stats,
                    killedMonsters: [...state.stats.killedMonsters, action.payload],
                },
            }
        case gameActionsList.ADD_MONSTER_TO_DEREATED_LIST:
            return {
                ...state,
                stats: {
                    ...state.stats,
                    defeatedMonsters: [...state.stats.defeatedMonsters, action.payload],
                },
            }
        case gameActionsList.SET_TIPEWRITER_IS_WORKING:
            return {
                ...state,
                typeWriterIsWriting: action.payload,
            }
        case gameActionsList.SET_TIPEWRITER_STOPPED:
            return {
                ...state,
                typeWriterStopped: action.payload,
            }
        default:
            return state;
    }
}

type SetUndiscoveredLocations = ActionWithPayload<gameActionsList.SET_UNDISCOVERED_LOCATIONS, Array<LocationName>>
const setUndiscoveredLocations = (locationsNames: Array<LocationName>): SetUndiscoveredLocations => ({
    type: gameActionsList.SET_UNDISCOVERED_LOCATIONS,
    payload: locationsNames,
})

type DiscoverCurrentLocation = ActionWithPayload<gameActionsList.DISCOVER_CURRENT_LOCATION, string>
export const discoverCurrentLocation = (currentLocationName: string): DiscoverCurrentLocation => ({
    type: gameActionsList.DISCOVER_CURRENT_LOCATION,
    payload: currentLocationName,
})

type AddMonsterToKilledList = ActionWithPayload<gameActionsList.ADD_MONSTER_TO_KILLED_LIST, EnemyName>
export const addMonsterToKilledList = (monsterName: EnemyName): AddMonsterToKilledList => ({
    type: gameActionsList.ADD_MONSTER_TO_KILLED_LIST,
    payload: monsterName,
})

type AddMonsterToDefeatedList = ActionWithPayload<gameActionsList.ADD_MONSTER_TO_DEREATED_LIST, EnemyName>
export const addMonsterToDefeatedList = (monsterName: EnemyName): AddMonsterToDefeatedList => ({
    type: gameActionsList.ADD_MONSTER_TO_DEREATED_LIST,
    payload: monsterName,
})

type SetTipeWritterIsWriting = ActionWithPayload<gameActionsList.SET_TIPEWRITER_IS_WORKING, boolean>
export const setTypeWriterIsWriting = (isWriting: boolean): SetTipeWritterIsWriting => ({
    type: gameActionsList.SET_TIPEWRITER_IS_WORKING,
    payload: isWriting,
})

type SetTipeWritterStopped = ActionWithPayload<gameActionsList.SET_TIPEWRITER_STOPPED, boolean>
export const setTypeWriterStopped = (wasStop: boolean): SetTipeWritterStopped => ({
    type: gameActionsList.SET_TIPEWRITER_STOPPED,
    payload: wasStop,
})

export const initializeGame = (): AppThunk => (dispatch) => {
    dispatch(changeDownloadQuantity('PLUS_ONE'))
    dispatch(setSceneWithTransition('ChoosePlayer'))
    requestLocationsNames().then(locationsNames => {
        dispatch(setUndiscoveredLocations(locationsNames))
        dispatch(changeDownloadQuantity('MINUS_ONE'))
    })
}

export default gameReducer

