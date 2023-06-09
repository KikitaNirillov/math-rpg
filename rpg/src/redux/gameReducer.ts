import { AppThunk, ActionWithPayload, ActionWithoutPayload } from 'commonTypes';
import { LocationName } from '@base/locations';
import { requestLocationsNames } from "@base/locations";
import { changeDownloadQuantity, setSceneWithTransition } from './sceneReducer';
import { EnemyName } from '@base/enemies';

enum gameActionsList {
    SET_DIFFICULTY = 'SET_DIFFICULTY',
    DISCOVER_CURRENT_LOCATION = 'DISCOVER_LOCATION',
    SET_UNDISCOVERED_LOCATIONS = 'SET_UNDISCOVERED_LOCATIONS',
    ADD_MONSTER_TO_KILLED_LIST = 'ADD_MONSTER_TO_KILLED_LIST',
    ADD_MONSTER_TO_DEREATED_LIST = 'ADD_MONSTER_TO_DEREATED_LIST',
    SET_TIPEWRITER_IS_WORKING = 'SET_TIPEWRITER_IS_WORKING',
    SET_TIPEWRITER_STOPPED = 'SET_TIPEWRITER_STOPPED',
    RESET_ALL_GAME_DATA = 'RESET_ALL_GAME_DATA',
    SET_SOUND_VALUE = 'SET_SOUND_VALUE',
    SET_ENDING = 'SET_ENDING',
    PLUS_EQUATION_QUANTITY = 'PLUS_EQUATION_QUANTITY',
    PLUS_CORRECTLY_SOLVED_EQUATIONS = 'PLUS_CORRECTLY_SOLVED_EQUATIONS '
}

export type Difficulty = 'easy' | 'hard'
export type SoundValue = 'ON' | 'OFF'
export type Ending = 'Good' | 'Bad' | 'Secret'

const initialState = {
    soundValue: 'OFF' as SoundValue,
    difficulty: 'easy' as Difficulty,
    undiscoveredLocations: [] as Array<LocationName>,
    stats: {
        killedMonsters: [] as Array<EnemyName>,
        defeatedMonsters: [] as Array<EnemyName>,
        equationsQuantity: 0 as number,
        correctlySolvedEquations: 0 as number,
        ending: null as Ending | null,
    },
    typeWriterIsWriting: false as boolean,
    typeWriterStopped: false as boolean,
}

type Action = SetUndiscoveredLocations | DiscoverCurrentLocation | AddMonsterToKilledList |
    AddMonsterToDefeatedList | SetTipeWritterIsWriting | SetTipeWritterStopped | SetDifficulty
    | ResetAllGameData | SetEnding | SetSoundValue | PlusEquationQuantity | PlusCorrectlySolvedEquations
const gameReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case gameActionsList.SET_SOUND_VALUE:
            return {
                ...state,
                soundValue: action.payload
            }
        case gameActionsList.SET_DIFFICULTY:
            return {
                ...state,
                difficulty: action.payload
            }
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
        case gameActionsList.RESET_ALL_GAME_DATA:
            return {
                ...initialState,
                soundValue: state.soundValue,
            }
        case gameActionsList.SET_ENDING:
            return {
                ...state,
                stats: {
                    ...state.stats,
                    ending: action.payload,
                },
            }
        case gameActionsList.PLUS_EQUATION_QUANTITY:
            return {
                ...state,
                stats: {
                    ...state.stats,
                    equationsQuantity: state.stats.equationsQuantity + 1,
                },
            }
        case gameActionsList.PLUS_CORRECTLY_SOLVED_EQUATIONS:
            return {
                ...state,
                stats: {
                    ...state.stats,
                    correctlySolvedEquations: state.stats.correctlySolvedEquations + 1,
                },
            }
        default:
            return state;
    }
}

type SetDifficulty = ActionWithPayload<gameActionsList.SET_DIFFICULTY, Difficulty>
export const setDifficulty = (difficulty: Difficulty): SetDifficulty => ({
    type: gameActionsList.SET_DIFFICULTY,
    payload: difficulty,
})

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

type ResetAllGameData = ActionWithoutPayload<gameActionsList.RESET_ALL_GAME_DATA>
const resetAllGameData = (): ResetAllGameData => ({
    type: gameActionsList.RESET_ALL_GAME_DATA,
})

type SetEnding = ActionWithPayload<gameActionsList.SET_ENDING, Ending>
const setEnding = (ending: Ending): SetEnding => ({
    type: gameActionsList.SET_ENDING,
    payload: ending,
})

type SetSoundValue = ActionWithPayload<gameActionsList.SET_SOUND_VALUE, SoundValue>
export const setSoundValue = (value: SoundValue): SetSoundValue => ({
    type: gameActionsList.SET_SOUND_VALUE,
    payload: value,
})

type PlusEquationQuantity = ActionWithoutPayload<gameActionsList.PLUS_EQUATION_QUANTITY>
export const plusEquationQuantity = (): PlusEquationQuantity => ({
    type: gameActionsList.PLUS_EQUATION_QUANTITY,
})

type PlusCorrectlySolvedEquations = ActionWithoutPayload<gameActionsList.PLUS_CORRECTLY_SOLVED_EQUATIONS>
export const plusCorrectlySolvedEquations = (): PlusCorrectlySolvedEquations => ({
    type: gameActionsList.PLUS_CORRECTLY_SOLVED_EQUATIONS,
})

export const initializeGame = (): AppThunk => (dispatch) => {
    dispatch(changeDownloadQuantity('PLUS_ONE'))
    dispatch(resetAllGameData())
    dispatch(setSceneWithTransition('ChoosePlayer'))
    requestLocationsNames().then(locationsNames => {
        dispatch(setUndiscoveredLocations(locationsNames))
        dispatch(changeDownloadQuantity('MINUS_ONE'))
    })
}

export const finishGame = (): AppThunk => (dispatch, getState) => {
    dispatch(changeDownloadQuantity('PLUS_ONE'))
    const stats = getState().game.stats
    let ending: Ending
    if (stats.defeatedMonsters.length === 0 && stats.killedMonsters.length === 0) { ending = 'Secret' }
    else if (stats.killedMonsters.length < 5) { ending = 'Good' }
    else { ending = 'Bad' }
    dispatch(setEnding(ending))
    dispatch(setSceneWithTransition('StatisticsScreen'))
    dispatch(changeDownloadQuantity('MINUS_ONE'))
}

export default gameReducer

