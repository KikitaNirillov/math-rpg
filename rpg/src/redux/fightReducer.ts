
import settings from 'settings';
import { EquationAnswer, EquationData, generateEquation } from 'common/equationCreator';
import fightInfoCreator from 'common/fightInfoCreator';
import { ActionWithoutPayload, AppThunk, ActionWithPayload } from 'commonTypes';
import { removeCurrentQuestion, setEnemyHealthPoints, setEnemyPositionOnArenaScreen, swapStaticAndDefaultImgForEnemy, minusEnemyEffectsDuration } from './enemyReducer';
import { addMonsterToDefeatedList, addMonsterToKilledList, plusCorrectlySolvedEquations, plusEquationQuantity } from './gameReducer';
import { removeMosterNameFromLivingList } from './locationReducer';
import { addCoins, setPlayerHealthPoints, setPlayerPositionOnArenaScreen, swapStaticAndDefaultImgForPlayer } from './playerReducer';
import { compareTwoArrays, fromStringToArrayOfNumbers } from 'common/otherFunctions';


enum fightActionList {
    SWAP_ATTACKER_AND_RECEIVING = 'SWAP_ATTACKER_AND_RECEIVING',
    SET_TIME_FOR_ANSWER = 'SET_TIME_FOR_ANSWER',
    SET_TIMER_RUNNING = 'SET_TIMER_RUNNING',
    SET_EQUATION_DATA = 'SET_EQUATION_DATA',
    RESET_EQUATION_DATA = 'RESET_EQUATION_DATA',
    SET_DISPLAYING_FIGHT_INTERFACE = 'SET_DISPLAYING_FIGHT_INTERFACE',
    SET_FIGHT_INFO = 'SET_FIGHT_INFO',
    RESET_FIGHT_DATA = 'RESET_FIGHT_DATA',
}

export type FightInterfaceName = 'defaultInterface' | 'equationInterface' | 'questionInterface' | 'inventoryInterface'

const initialState = {
    fightInfo: 'The fight has begun!' as string,
    attacker: 'player' as 'player' | 'enemy',
    receiving: 'enemy' as 'player' | 'enemy',

    equation: null as string | null,
    equationAnswer: null as EquationAnswer | null,
    timeForAnswer: 'NO LIMIT' as number | 'NO LIMIT',

    timerRunning: false as boolean,

    displayingFightInterface: 'defaultInterface' as FightInterfaceName,
}

type Action = SwapAttackerAndReceiving | SetTimeForAnswer | SetTimerRunning
    | SetEquationData | ResetEquationData
    | SetDisplayingFightInterface | SetFightInfo | ResetFightData

const fightReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case fightActionList.SWAP_ATTACKER_AND_RECEIVING:
            return {
                ...state,
                attacker: state.receiving,
                receiving: state.attacker,
            }
        case fightActionList.SET_EQUATION_DATA:
            return {
                ...state,
                equation: action.payload.equation,
                equationAnswer: action.payload.equationAnswer,
            }
        case fightActionList.RESET_EQUATION_DATA:
            return {
                ...state,
                equation: initialState.equation,
                equationAnswer: initialState.equationAnswer,
                timeForAnswer: initialState.timeForAnswer,
            }
        case fightActionList.SET_TIME_FOR_ANSWER:
            return {
                ...state,
                timeForAnswer: action.payload,
            }
        case fightActionList.SET_TIMER_RUNNING:
            return {
                ...state,
                timerRunning: action.payload,
            }
        case fightActionList.SET_DISPLAYING_FIGHT_INTERFACE:
            return {
                ...state,
                displayingFightInterface: action.payload,
            }
        case fightActionList.SET_FIGHT_INFO:
            return {
                ...state,
                fightInfo: action.payload,
            }
        case fightActionList.RESET_FIGHT_DATA:
            return {
                ...initialState,
            }
        default:
            return state
    }
}

type SwapAttackerAndReceiving = ActionWithoutPayload<fightActionList.SWAP_ATTACKER_AND_RECEIVING>
export const swapAttackerAndReceiving = (): SwapAttackerAndReceiving => ({
    type: fightActionList.SWAP_ATTACKER_AND_RECEIVING,
})

type SetTimeForAnswer = ActionWithPayload<fightActionList.SET_TIME_FOR_ANSWER, number | 'NO LIMIT'>
const setTimeForAnswer = (time: number | 'NO LIMIT'): SetTimeForAnswer => ({
    type: fightActionList.SET_TIME_FOR_ANSWER,
    payload: time,
})

type SetTimerRunning = ActionWithPayload<fightActionList.SET_TIMER_RUNNING, boolean>
const setTimerRunning = (isRunning: boolean): SetTimerRunning => ({
    type: fightActionList.SET_TIMER_RUNNING,
    payload: isRunning,
})

type SetEquationData = ActionWithPayload<fightActionList.SET_EQUATION_DATA, EquationData>
const setEquationData = (equationData: EquationData): SetEquationData => ({
    type: fightActionList.SET_EQUATION_DATA,
    payload: equationData,
})

type ResetEquationData = ActionWithoutPayload<fightActionList.RESET_EQUATION_DATA>
const resetEquationData = (): ResetEquationData => ({
    type: fightActionList.RESET_EQUATION_DATA,
})

type SetDisplayingFightInterface = ActionWithPayload<fightActionList.SET_DISPLAYING_FIGHT_INTERFACE, FightInterfaceName>
export const setDisplayingFightInterface = (intefaceName: FightInterfaceName): SetDisplayingFightInterface => ({
    type: fightActionList.SET_DISPLAYING_FIGHT_INTERFACE,
    payload: intefaceName,
})

type SetFightInfo = ActionWithPayload<fightActionList.SET_FIGHT_INFO, string>
export const setFightInfo = (text: string): SetFightInfo => ({
    type: fightActionList.SET_FIGHT_INFO,
    payload: text,
})

// export const resetFightInfo = (): AppThunk => (dispatch) => dispatch(setFightInfo(initialState.fightInfo))

type ResetFightData = ActionWithoutPayload<fightActionList.RESET_FIGHT_DATA>
export const resetFightData = (): ResetFightData => ({
    type: fightActionList.RESET_FIGHT_DATA
})

const startTimer = (): AppThunk => (dispatch, getState) => {
    if (getState().fight.timeForAnswer !== 'NO LIMIT') {
        dispatch(setTimerRunning(true))
        var timer = setInterval(() => {
            if (getState().fight.timeForAnswer === 0 || !getState().fight.timerRunning) {
                clearInterval(timer)
            }
            else {
                dispatch(setTimeForAnswer(+getState().fight.timeForAnswer - 1))
            }
        }, 1000)
    }
    else {
        console.warn('Timer cannot start because there is no time limit')
    }
}

const giveDamage = (attacker: 'player' | 'enemy', receiving: 'player' | 'enemy'): AppThunk => (dispatch, getState) => {
    const currentReceivingHealthPoints = getState()[`${receiving}`].healthPoints
    let attackerDamage = getState()[`${attacker}`].damage
    const playerName = getState().player.name
    const playerImprovements = getState().player.improvements
    const enemyName = getState().enemy.name
    const currentEnemyEffects = getState().enemy.currentEffects
    if (receiving === 'player') {
        if (playerImprovements.some(improvement => improvement === 'protectionImprovement')) {
            attackerDamage = attackerDamage / 2
        }
        if (currentReceivingHealthPoints < attackerDamage) dispatch(setPlayerHealthPoints(0))
        else dispatch(setPlayerHealthPoints(currentReceivingHealthPoints - attackerDamage))
    }
    else if (receiving === 'enemy') {
        if (playerImprovements.some(improvement => improvement === 'damageImprovement')) {
            attackerDamage = attackerDamage * 2
        }
        if (currentEnemyEffects.some(effect => effect.name === 'Poisoned')) {
            attackerDamage = attackerDamage + settings.additionalDamageByPoison
        }
        if (currentReceivingHealthPoints < attackerDamage) dispatch(setEnemyHealthPoints(0))
        else dispatch(setEnemyHealthPoints(currentReceivingHealthPoints - attackerDamage))
    }
    dispatch(shakeReceiver(receiving))
    const newFightInfo = fightInfoCreator(attacker, playerName || 'Player', enemyName || 'Enemy', currentEnemyEffects, attackerDamage)
    dispatch(setFightInfo(newFightInfo))
}

export const makeAttack = (): AppThunk => (dispatch, getState) => {
    let timeForTimer: number
    const gameDifficulty = getState().game.difficulty
    const playerImprovements = getState().player.improvements
    const locationName = getState().location.locationName
    if (locationName === 'location1') { timeForTimer = 30 }
    else if (locationName === 'location2') { timeForTimer = 80 }
    else { timeForTimer = 90 }
    dispatch(setDisplayingFightInterface('equationInterface'))
    if (locationName) {
        generateEquation(locationName, gameDifficulty).then(
            equation => {
                dispatch(setEquationData(equation))
                dispatch(plusEquationQuantity())
                console.log('x=' + equation.equationAnswer.x + (equation.equationAnswer.y ? ', y=' + equation.equationAnswer.y : '')) //FOR DEVELOPMENT
            }
        ).then(() => {
            if (getState().fight.attacker === 'enemy') {
                if (playerImprovements.some(improvement => improvement === 'timeImprovement')) {
                    timeForTimer = timeForTimer * 1.5
                }
                dispatch(setTimeForAnswer(timeForTimer))
                dispatch(startTimer())
            }
            else {
                dispatch(setTimeForAnswer('NO LIMIT'))
            }
        })
    } else console.warn('Location not defined')
}

export const answerQuestion = (enteredAnswer: string): AppThunk => (dispatch, getState) => {
    const questions = getState().enemy.questions
    if (questions) {
        const correctAnswer = questions[0].answers.correctAnswer
        if (enteredAnswer === correctAnswer) {
            dispatch(removeCurrentQuestion())
            dispatch(shakeReceiver('enemy'))
        }
        else {
            dispatch(giveDamage('enemy', 'player'))
            dispatch(setDisplayingFightInterface('defaultInterface'))
        }
    }
    else {
        console.warn('no enemyQuestions found')
        dispatch(setDisplayingFightInterface('defaultInterface'))
    }
}

export type EnteredEquationAnswer = { x: string, y: string } | 'noAnswer'
export const answerEquation = (enteredAnswer: EnteredEquationAnswer): AppThunk => (dispatch, getState) => {
    const timeForAnswer = getState().fight.timeForAnswer
    const correctAnswer = getState().fight.equationAnswer
    const currentEnemyEffects = getState().enemy.currentEffects
    const playerName = getState().player.name
    const enemyName = getState().enemy.name
    const attacker = getState().fight.attacker
    if (!correctAnswer) console.warn('Correct answer not defined')
    else {
        if (timeForAnswer !== 'NO LIMIT') {
            // if Enemy attacked
            if (
                timeForAnswer === 0 || // if timer ran out or...
                enteredAnswer === 'noAnswer' ||
                !compareTwoArrays(correctAnswer.x, fromStringToArrayOfNumbers(enteredAnswer.x)) ||
                (correctAnswer.y && !compareTwoArrays(correctAnswer.y, fromStringToArrayOfNumbers(enteredAnswer.y)))
                // or if timer is not finished and answer isn't correct
            ) {
                dispatch(giveDamage('enemy', 'player'))
            }
            else {
                dispatch(plusCorrectlySolvedEquations())
                const newFightInfo = fightInfoCreator(attacker, playerName || 'Player', enemyName || 'Enemy', currentEnemyEffects, 0)
                dispatch(setFightInfo(newFightInfo))
            }
            dispatch(setTimerRunning(false))
        }
        else {
            // if Player attacked
            if (
                enteredAnswer !== 'noAnswer' &&
                compareTwoArrays(correctAnswer.x, fromStringToArrayOfNumbers(enteredAnswer.x)) &&
                (!correctAnswer.y || compareTwoArrays(correctAnswer.y, fromStringToArrayOfNumbers(enteredAnswer.y)))
                // if answer is correct
            ) {
                dispatch(giveDamage('player', 'enemy'))
                dispatch(plusCorrectlySolvedEquations())
            }
            else {
                const newFightInfo = fightInfoCreator(attacker, playerName || 'Player', enemyName || 'Enemy', currentEnemyEffects, 0)
                dispatch(setFightInfo(newFightInfo))
            }
            if (currentEnemyEffects.length !== 0) dispatch(minusEnemyEffectsDuration())
        }
    }
    dispatch(setDisplayingFightInterface('defaultInterface'))
    dispatch(resetEquationData())
    if (!currentEnemyEffects.some(effect => effect.name === 'Frozen')) dispatch(swapAttackerAndReceiving())
}

export const overcomeCurrentEnemy = (method: 'talk' | 'kill'): AppThunk => (dispatch, getState) => {
    const currentEnemyName = getState().enemy.name
    const currentEnemyType = getState().enemy.enemyType
    if (currentEnemyName) {
        if (currentEnemyType === 'miniBoss') {
            dispatch(addCoins(settings.defaultRewardForMiniBoss))
            dispatch(removeMosterNameFromLivingList(currentEnemyName))
            if (method === 'talk') {
                dispatch(addMonsterToDefeatedList(currentEnemyName))
            }
            else {
                dispatch(addMonsterToKilledList(currentEnemyName))
            }
        }
    }
    else console.warn('no currentEnemy found')
}

export const shakeReceiver = (person: 'player' | 'enemy'): AppThunk => (dispatch) => {
    const displacement = 0.3
    if (person === 'player') {
        setTimeout(() => {
            dispatch(setPlayerPositionOnArenaScreen(+displacement))
        }, 25)
        setTimeout(() => dispatch(setPlayerPositionOnArenaScreen(-displacement)), 50)
        setTimeout(() => dispatch(setPlayerPositionOnArenaScreen(+displacement)), 100)
        setTimeout(() => dispatch(setPlayerPositionOnArenaScreen(-displacement)), 150)
        setTimeout(() => {
            dispatch(setPlayerPositionOnArenaScreen(0))
        }, 175)
    }
    else {
        setTimeout(() => {
            dispatch(setEnemyPositionOnArenaScreen(+displacement))
            dispatch(swapStaticAndDefaultImgForEnemy())
        }, 25)
        setTimeout(() => dispatch(setEnemyPositionOnArenaScreen(-displacement)), 50)
        setTimeout(() => dispatch(setEnemyPositionOnArenaScreen(+displacement)), 100)
        setTimeout(() => dispatch(setEnemyPositionOnArenaScreen(-displacement)), 150)
        setTimeout(() => {
            dispatch(setEnemyPositionOnArenaScreen(0))
            dispatch(swapStaticAndDefaultImgForEnemy())
        }, 175)
    }
}

export default fightReducer