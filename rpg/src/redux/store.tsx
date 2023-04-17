import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux"
import playerReducer from "./playerReducer"
import sceneReducer from "./sceneReducer"
import thunkMiddleware from "redux-thunk"
import gameReducer from "./gameReducer";
import enemyReducer from "./enemyReducer";
import locationReducer from "./locationReducer";
import fightReducer from "./fightReducer";

let reducers = combineReducers({
    game: gameReducer,
    location: locationReducer,
    scene: sceneReducer,
    player: playerReducer,
    enemy: enemyReducer,
    fight: fightReducer,
});
export type AppStateType = ReturnType<typeof reducers>

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));

//Расширение для Chrome - Redux DevTools:
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
)); 
export type AppDispatch = typeof store.dispatch

export default store;