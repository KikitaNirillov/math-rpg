import { EnemyData } from './../base/enemies';
import { EnemyName, requestEnemy } from "../base/enemies"
import { ActionWithoutPayload, ActionWithPayload, AppThunk } from "commonTypes"
import { changeDownloadQuantity } from './sceneReducer';
import settings from 'settings';
import { resetFightInfo } from './fightReducer';

enum enemyActionList {
    SET_ENEMY = 'SET_ENEMY',
    SET_ENEMY_HEALTH_POINTS = 'SET_ENEMY_HEALTH_POINTS',
    SET_ENEMY_POSITION_ON_ARENA_SCREEN = 'SET_ENEMY_POSITION_ON_ARENA_SCREEN',
    SWAP_STATIC_AND_DEFAULT_IMG_FOR_ENEMY = 'SWAP_STATIC_AND_DEFAULT_IMG_FOR_ENEMY',
    REMOVE_CURRENT_QUESTION = 'REMOVE_CURRENT_QUESTION',
    ADD_EFFECT_TO_ENEMY = 'ADD_EFFECT_TO_ENEMY',
    MINUS_ENEMY_EFFECTS_DURATION = 'MINUS_EFFECTS_DURATION',
}

export type EnemyQuestion = {
    question: string,
    answers: {
        correctAnswer: string,
        incorrectAnswer: string,
    }
}

export type Effect = {
    name: 'Frozen' | 'Poisoned',
    duration: number,
}

const initialState = {
    name: null as EnemyName | null,
    enemyType: null as 'miniBoss' | 'mainBoss' | null,
    defaultImg: undefined as string | undefined,
    staticImg: undefined as string | undefined, // img when attacked
    healthPoints: 100 as number,
    damage: 25 as number,
    questions: null as Array<EnemyQuestion> | null,
    currentEffects: [] as Array<Effect>,
    positionOnArenaScreen: 11.6 as number,
}

type Action = SetEnemy | SetEnemyHealthPoints | SetEnemyPositionOnArenaScreen |
    SwapStaticAndDefaultImgForEnemy | RemoveCurrentQuestion | AddEffectToEnemy |
    MinusEnemyEffectsDuration

const enemyReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case enemyActionList.SET_ENEMY:
            return {
                ...initialState,
                ...action.payload,
                healthPoints: action.payload.enemyType === 'mainBoss' ? 200 : 100,
                damage: action.payload.enemyType === 'mainBoss' ? 50 : 25,
                questions: (action.payload.enemyType === 'mainBoss' || !action.payload.questions) ? null : action.payload.questions
            }
        case enemyActionList.SET_ENEMY_HEALTH_POINTS:
            return {
                ...state,
                healthPoints: action.payload,
            }
        case enemyActionList.SET_ENEMY_POSITION_ON_ARENA_SCREEN:
            return {
                ...state,
                positionOnArenaScreen: initialState.positionOnArenaScreen + action.payload
            }
        case enemyActionList.SWAP_STATIC_AND_DEFAULT_IMG_FOR_ENEMY:
            return {
                ...state,
                defaultImg: state.staticImg,
                staticImg: state.defaultImg,
            }
        case enemyActionList.REMOVE_CURRENT_QUESTION:
            return {
                ...state,
                questions: (state.questions ? state.questions.slice(1) : state.questions)
            }
        case enemyActionList.ADD_EFFECT_TO_ENEMY:
            return {
                ...state,
                currentEffects: state.currentEffects.some(effect => effect.name === action.payload.name) ?
                    state.currentEffects.map(effect => effect.name === action.payload.name ?
                        { name: effect.name, duration: effect.duration + action.payload.duration } : effect
                    )
                    : [...state.currentEffects, action.payload]
            }
        case enemyActionList.MINUS_ENEMY_EFFECTS_DURATION:
            return {
                ...state,
                currentEffects: state.currentEffects.filter(effect => effect.duration > 1).map(effect =>
                    ({ name: effect.name, duration: effect.duration - 1 })
                )
            }
        default:
            return state
    }
}

type SetEnemy = { type: enemyActionList.SET_ENEMY, payload: EnemyData }
const setEnemy = (enemy: EnemyData): SetEnemy => ({
    type: enemyActionList.SET_ENEMY,
    payload: enemy,
})

type SetEnemyHealthPoints = ActionWithPayload<enemyActionList.SET_ENEMY_HEALTH_POINTS, number>
export const setEnemyHealthPoints = (newHealthPoints: number): SetEnemyHealthPoints => ({
    type: enemyActionList.SET_ENEMY_HEALTH_POINTS,
    payload: newHealthPoints
})

type SetEnemyPositionOnArenaScreen = ActionWithPayload<enemyActionList.SET_ENEMY_POSITION_ON_ARENA_SCREEN, number>
export const setEnemyPositionOnArenaScreen = (position: number): SetEnemyPositionOnArenaScreen => ({
    type: enemyActionList.SET_ENEMY_POSITION_ON_ARENA_SCREEN,
    payload: position
})

type SwapStaticAndDefaultImgForEnemy = ActionWithoutPayload<enemyActionList.SWAP_STATIC_AND_DEFAULT_IMG_FOR_ENEMY>
export const swapStaticAndDefaultImgForEnemy = (): SwapStaticAndDefaultImgForEnemy => ({
    type: enemyActionList.SWAP_STATIC_AND_DEFAULT_IMG_FOR_ENEMY,
})

type RemoveCurrentQuestion = ActionWithoutPayload<enemyActionList.REMOVE_CURRENT_QUESTION>
export const removeCurrentQuestion = (): RemoveCurrentQuestion => ({
    type: enemyActionList.REMOVE_CURRENT_QUESTION,
})

type AddEffectToEnemy = ActionWithPayload<enemyActionList.ADD_EFFECT_TO_ENEMY, Effect>
export const addEffectToEnemy = (effect: Effect): AddEffectToEnemy => ({
    type: enemyActionList.ADD_EFFECT_TO_ENEMY,
    payload: effect,
})

type MinusEnemyEffectsDuration = ActionWithoutPayload<enemyActionList.MINUS_ENEMY_EFFECTS_DURATION>
export const minusEnemyEffectsDuration = (): MinusEnemyEffectsDuration => ({
    type: enemyActionList.MINUS_ENEMY_EFFECTS_DURATION,
})

export const setNewEnemy = (enemyName: EnemyName): AppThunk => (dispatch) => {
    requestEnemy(enemyName).then(
        enemy => {
            dispatch(setEnemy(enemy))
            dispatch(resetFightInfo())
            dispatch(changeDownloadQuantity('MINUS_ONE'))
        }
    )
}

export const freezeEnemy = (): AppThunk => (dispatch) => {
    const effect: Effect = {
        name: 'Frozen',
        duration: settings.durationOfFreezing
    }
    dispatch(addEffectToEnemy(effect))
}

export const poisonEnemy = (): AppThunk => (dispatch) => {
    const effect: Effect = {
        name: 'Poisoned',
        duration: settings.durationOfPoison
    }
    dispatch(addEffectToEnemy(effect))
}

export default enemyReducer