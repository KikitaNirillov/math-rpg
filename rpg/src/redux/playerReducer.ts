import { ActionWithoutPayload, ActionWithPayload, AppThunk, Improvement, InventoryItem, InventoryItemName } from "commonTypes"
import { HeroData, HeroName, requestHero } from "@base/heroes"
import { removeImprovementFromAvailableList } from "./locationReducer"
import settings from "settings"
import { freezeEnemy, poisonEnemy } from "./enemyReducer"
import { setDifficulty } from "./gameReducer"

enum playerActionList {
    SET_HERO = 'SET_HERO',
    SET_PLAYER_HEALTH_POINTS = 'SET_PLAYER_HEALTH_POINTS',
    SET_PLAYER_POSITION_ON_ARENA_SCREEN = 'SET_PLAYER_POSITION_ON_ARENA_SCREEN',
    SWAP_STATIC_AND_DEFAULT_IMG_FOR_PLAYER = 'SWAP_STATIC_AND_DEFAULT_IMG_FOR_PLAYER',
    SET_PLAYER_IMPROVEMENTS = 'SET_PLAYER_IMPROVEMENTS',
    RESET_PLAYER_IMPROVEMENTS = 'RESET_PLAYER_IMPROVEMENTS',
    ADD_INVENTORY_ITEM = 'ADD_INVENTORY_ITEM',
    REMOVE_INVENTORY_ITEM = 'REMOVE_INVENTORY_ITEM',
    SET_COINS = 'SET_COINS',
}

const initialState = {
    name: null as HeroName | null,
    defaultImg: undefined as string | undefined,
    staticImg: undefined as string | undefined, // img when attacked
    berserkModImg: undefined as string | undefined,
    healthPoints: settings.maxPlayerHelthPoints as number,
    inventory: [] as Array<InventoryItem>,
    improvements: [] as Array<Improvement>,
    damage: 12.5 as number, //12.5
    coins: 0 as number,
    positionOnArenaScreen: 11.6 as number,
}

type Actions = SetHero | SetPlayerHealthPoints | SetPlayerPositionOnArenaScreen |
    SwapStaticAndDefaultImgForPlayer | SetPlayerImprovements | ResetPlayerImprovements |
    RemoveInventoryItem | AddInventoryItem | SetCoins

const playerReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case playerActionList.SET_HERO:
            return {
                ...initialState,
                ...action.payload,
            }
        case playerActionList.SET_PLAYER_HEALTH_POINTS:
            return {
                ...state,
                healthPoints: action.payload,
            }
        case playerActionList.SET_PLAYER_POSITION_ON_ARENA_SCREEN:
            return {
                ...state,
                positionOnArenaScreen: initialState.positionOnArenaScreen + action.payload
            }
        case playerActionList.SET_PLAYER_IMPROVEMENTS:
            return {
                ...state,
                improvements: [...state.improvements, action.payload]
            }
        case playerActionList.RESET_PLAYER_IMPROVEMENTS:
            return {
                ...state,
                improvements: []
            }
        case playerActionList.ADD_INVENTORY_ITEM:
            return {
                ...state,
                inventory: state.inventory.some(item => item.name === action.payload) ?
                    state.inventory.map(item => item.name === action.payload ?
                        { name: item.name, count: item.count + 1 } : item
                    )
                    : [...state.inventory, { name: action.payload, count: 1 }]
            }
        case playerActionList.REMOVE_INVENTORY_ITEM:
            return {
                ...state,
                inventory: state.inventory.some(item => item.name === action.payload && item.count === 1) ?
                    state.inventory.filter(item => item.name !== action.payload)
                    : state.inventory.map(item => item.name === action.payload ?
                        { name: item.name, count: item.count - 1 } : item
                    )
            }
        case playerActionList.SWAP_STATIC_AND_DEFAULT_IMG_FOR_PLAYER:
            return {
                ...state,
                defaultImg: state.staticImg,
                staticImg: state.defaultImg,
            }
        case playerActionList.SET_COINS:
            return {
                ...state,
                coins: action.payload,
            }
        default:
            return state
    }
}

type SetHero = ActionWithPayload<playerActionList.SET_HERO, HeroData>
const setHero = (player: HeroData): SetHero => ({
    type: playerActionList.SET_HERO,
    payload: player,
})

type SetPlayerHealthPoints = ActionWithPayload<playerActionList.SET_PLAYER_HEALTH_POINTS, number>
export const setPlayerHealthPoints = (newHealthPoints: number): SetPlayerHealthPoints => ({
    type: playerActionList.SET_PLAYER_HEALTH_POINTS,
    payload: newHealthPoints
})

type SetPlayerPositionOnArenaScreen = ActionWithPayload<playerActionList.SET_PLAYER_POSITION_ON_ARENA_SCREEN, number>
export const setPlayerPositionOnArenaScreen = (position: number): SetPlayerPositionOnArenaScreen => ({
    type: playerActionList.SET_PLAYER_POSITION_ON_ARENA_SCREEN,
    payload: position
})

type SwapStaticAndDefaultImgForPlayer = ActionWithoutPayload<playerActionList.SWAP_STATIC_AND_DEFAULT_IMG_FOR_PLAYER>
export const swapStaticAndDefaultImgForPlayer = (): SwapStaticAndDefaultImgForPlayer => ({
    type: playerActionList.SWAP_STATIC_AND_DEFAULT_IMG_FOR_PLAYER,
})

type SetPlayerImprovements = ActionWithPayload<playerActionList.SET_PLAYER_IMPROVEMENTS, Improvement>
const setPlayerImprovements = (improvementName: Improvement): SetPlayerImprovements => ({
    type: playerActionList.SET_PLAYER_IMPROVEMENTS,
    payload: improvementName,
})

type ResetPlayerImprovements = ActionWithoutPayload<playerActionList.RESET_PLAYER_IMPROVEMENTS>
export const resetPlayerImprovements = (): ResetPlayerImprovements => ({
    type: playerActionList.RESET_PLAYER_IMPROVEMENTS,
})

type AddInventoryItem = ActionWithPayload<playerActionList.ADD_INVENTORY_ITEM, InventoryItemName>
const addInventoryItem = (itemName: InventoryItemName): AddInventoryItem => ({
    type: playerActionList.ADD_INVENTORY_ITEM,
    payload: itemName,
})

type RemoveInventoryItem = ActionWithPayload<playerActionList.REMOVE_INVENTORY_ITEM, InventoryItemName>
export const removeInventoryItem = (itemName: InventoryItemName): RemoveInventoryItem => ({
    type: playerActionList.REMOVE_INVENTORY_ITEM,
    payload: itemName,
})

type SetCoins = ActionWithPayload<playerActionList.SET_COINS, number>
const setCoins = (count: number): SetCoins => ({
    type: playerActionList.SET_COINS,
    payload: count,
})

export const chooseHero = (heroName: HeroName): AppThunk => (dispatch) => {
    const gameDifficulty = (heroName === "warrior") ? 'easy' : 'hard'
    dispatch(setDifficulty(gameDifficulty))
    requestHero(heroName).then(
        hero => {
            dispatch(setHero(hero))
        }
    )
}

export const addCoins = (count: number): AppThunk => (dispatch, getState) => {
    const currentCoins = getState().player.coins
    dispatch(setCoins(currentCoins + count))
}

export const resetCoins = (): AppThunk => (dispatch) => dispatch(setCoins(0))

const spendCoins = (cost: number): AppThunk => (dispatch, getState) => {
    const currentCoins = getState().player.coins
    dispatch(setCoins(currentCoins - cost))
}

export const buyInventoryItem = (itemName: InventoryItemName, cost: number): AppThunk => (dispatch) => {
    dispatch(spendCoins(cost))
    dispatch(addInventoryItem(itemName))
}

export const buyFullHeal = (): AppThunk => (dispatch) => {
    dispatch(spendCoins(settings.pricePerInn))
    dispatch(setPlayerHealthPoints(100))
}

const restorePlayerHealthPoints = (addedHealthPoints: number): AppThunk => (dispatch, getState) => {
    const currentPlayerHealthPoints = getState().player.healthPoints
    if (addedHealthPoints > settings.maxPlayerHelthPoints - currentPlayerHealthPoints)
        dispatch(setPlayerHealthPoints(settings.maxPlayerHelthPoints))
    else
        dispatch(setPlayerHealthPoints(currentPlayerHealthPoints + addedHealthPoints))
}

export const employInventoryItem = (itemName: InventoryItemName): AppThunk => (dispatch, getState) => {
    const currentInventory = getState().player.inventory
    if (currentInventory.some(item => item.name === itemName)) {
        dispatch(removeInventoryItem(itemName))
        if (itemName === "Healing potion") {
            dispatch(restorePlayerHealthPoints(settings.addedHealthPointsByHealthPotion))
        }
        else if (itemName === "Freezing potion") {
            dispatch(freezeEnemy())
        }
        else if (itemName === "Poison potion") {
            dispatch(poisonEnemy())
        }
    }
    else console.warn('no found this item in the inventory')
}

export const getImprovement = (improvementName: Improvement): AppThunk => (dispatch) => {
    dispatch(removeImprovementFromAvailableList(improvementName))
    dispatch(setPlayerImprovements(improvementName))
}

export default playerReducer