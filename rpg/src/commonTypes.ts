import { AnyAction } from "redux"
import { ThunkAction } from "redux-thunk"
import { AppStateType } from "@redux/store"

export type ActionWithPayload<type, payload> = {
    type: type
    payload: payload
}
export type ActionWithoutPayload<type> = {
    type: type
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  AnyAction
>

export type InventoryItemName = 'Healing potion' | 'Freezing potion' | 'Poison potion'
export type InventoryItem = {
  name: InventoryItemName,
  count: number,
}

export type Improvement = 'damageImprovement' | 'protectionImprovement' | 'timeImprovement'