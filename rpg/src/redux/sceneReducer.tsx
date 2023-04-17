import { CutsceneData, CutsceneName, requestCutscene, SlideData } from "@base/cutscenes"
import { opacityTransition } from "settings"
import { ActionWithoutPayload, ActionWithPayload, AppThunk } from "../commonTypes"
import { SceneName } from "../scenes"

enum sceneActionList {
    SET_SCENE = 'SET_SCENE',
    SET_OPACITY = 'SET_OPACITY',
    SET_SOMETHING_IS_LOADING = 'SET_SOMETHING_IS_LOADING',
    SET_OPACITY_TRANSITION_IS_OVER = 'SET_OPACITY_TRANSITION_IS_OVER',
    SET_OPACITY_TRANSITION_TO_ZERO_IS_OVER = 'SET_OPACITY_TRANSITION_TO_ZERO_IS_OVER',
    SET_CURRENT_SCENE_DID_MOUNT = 'SET_CURRENT_SCENE_DID_MOUNT',
    SET_CURRENT_CUTSCENE = 'SET_CURRENT_CUTSCENE',
    REMOVE_CURRENT_SLIDE_FROM_CUTSCENE_LIST = 'REMOVE_CURRENT_SLIDE_FROM_CUTSCENE_LIST',
    CHANGE_DOWNLOAD_QUANTITY = 'CHANGE_DOWNLOAD_QUANTITY',
    CHANGE_UNLOADED_IMAGES_QUANTITY = 'CHANGE_UNLOADED_IMAGES_QUANTITY'
}

const initialState = {
    downloadQuantity: 0 as number,
    unloadedImagesQuantity: 0 as number,
    opacityTransitionIsOver: true as boolean,
    opacityTransitionToZeroIsOver: true as boolean,
    currentScene: null as SceneName | null,
    currentSceneDidMount: false as boolean,
    opacity: 1 as number,
    currentCutscene: {
        slideList: [] as Array<SlideData>,
        nextSceneName: null as SceneName | null,
    } as CutsceneData,
}

export type SceneInitialState = typeof initialState

type Actions = SetScene | SetOpacity | SetOpacityTransitionIsOver | SetOpacityTransitionToZeroIsOver
    | SetCurrentSceneDidMount | SetCurrentCutscene | RemoveCurrentSlideFromCutsceneList | ChangeDownloadQuantity
    | ChangeUnloadedImagesQuantity

const sceneReducer = (state = initialState, action: Actions) => {
    switch (action.type) {
        case sceneActionList.SET_OPACITY_TRANSITION_IS_OVER:
            return {
                ...state,
                opacityTransitionIsOver: action.payload,
            }
        case sceneActionList.SET_OPACITY_TRANSITION_TO_ZERO_IS_OVER:
            return {
                ...state,
                opacityTransitionToZeroIsOver: action.payload,
            }
        case sceneActionList.SET_SCENE:
            return {
                ...state,
                currentScene: action.payload,
            }
        case sceneActionList.SET_OPACITY:
            return {
                ...state,
                opacity: action.payload,
            }
        case sceneActionList.SET_CURRENT_SCENE_DID_MOUNT:
            return {
                ...state,
                currentSceneDidMount: action.payload,
            }
        case sceneActionList.SET_CURRENT_CUTSCENE:
            return {
                ...state,
                currentCutscene: action.payload,
            }
        case sceneActionList.REMOVE_CURRENT_SLIDE_FROM_CUTSCENE_LIST:
            return {
                ...state,
                currentCutscene: {
                    ...state.currentCutscene,
                    slideList: state.currentCutscene.slideList.slice(1)
                },
            }
        case sceneActionList.CHANGE_DOWNLOAD_QUANTITY:
            return {
                ...state,
                downloadQuantity: action.payload === 'PLUS_ONE' ? state.downloadQuantity + 1 : state.downloadQuantity - 1
            }
        case sceneActionList.CHANGE_UNLOADED_IMAGES_QUANTITY:
            return {
                ...state,
                unloadedImagesQuantity: action.payload === 'PLUS_ONE' ? state.unloadedImagesQuantity + 1 : state.unloadedImagesQuantity - 1
            }
        default:
            return state;
    }
}


type SetOpacity = ActionWithPayload<sceneActionList.SET_OPACITY, number>
export const setOpacity = (opacity: number): SetOpacity => ({
    type: sceneActionList.SET_OPACITY,
    payload: opacity,
})

type SetOpacityTransitionIsOver = ActionWithPayload<sceneActionList.SET_OPACITY_TRANSITION_IS_OVER, boolean>
export const setOpacityTransitionIsOver = (isOver: boolean): SetOpacityTransitionIsOver => ({
    type: sceneActionList.SET_OPACITY_TRANSITION_IS_OVER,
    payload: isOver,
})

type SetOpacityTransitionToZeroIsOver = ActionWithPayload<sceneActionList.SET_OPACITY_TRANSITION_TO_ZERO_IS_OVER, boolean>
export const setOpacityTransitionToZeroIsOver = (isOver: boolean): SetOpacityTransitionToZeroIsOver => ({
    type: sceneActionList.SET_OPACITY_TRANSITION_TO_ZERO_IS_OVER,
    payload: isOver,
})

type SetScene = ActionWithPayload<sceneActionList.SET_SCENE, SceneName>
export const setScene = (scene: SceneName): SetScene => ({
    type: sceneActionList.SET_SCENE,
    payload: scene,
})

type SetCurrentSceneDidMount = ActionWithPayload<sceneActionList.SET_CURRENT_SCENE_DID_MOUNT, boolean>
export const setCurrentSceneDidMount = (didMount: boolean): SetCurrentSceneDidMount => ({
    type: sceneActionList.SET_CURRENT_SCENE_DID_MOUNT,
    payload: didMount,
})

type SetCurrentCutscene = ActionWithPayload<sceneActionList.SET_CURRENT_CUTSCENE, CutsceneData>
const setCurrentCutscene = (cutsceneData: CutsceneData) => ({
    type: sceneActionList.SET_CURRENT_CUTSCENE,
    payload: cutsceneData,
})

type RemoveCurrentSlideFromCutsceneList = ActionWithoutPayload<sceneActionList.REMOVE_CURRENT_SLIDE_FROM_CUTSCENE_LIST>
export const removeCurrentSlideFromCutsceneList = (): RemoveCurrentSlideFromCutsceneList => ({
    type: sceneActionList.REMOVE_CURRENT_SLIDE_FROM_CUTSCENE_LIST,
})

type ChangeDownloadQuantity = ActionWithPayload<sceneActionList.CHANGE_DOWNLOAD_QUANTITY, 'PLUS_ONE' | 'MINUS_ONE'>
export const changeDownloadQuantity = (action: 'PLUS_ONE' | 'MINUS_ONE'): ChangeDownloadQuantity => ({
    type: sceneActionList.CHANGE_DOWNLOAD_QUANTITY,
    payload: action,
})

type ChangeUnloadedImagesQuantity = ActionWithPayload<sceneActionList.CHANGE_UNLOADED_IMAGES_QUANTITY, 'PLUS_ONE' | 'MINUS_ONE'>
export const changeUnloadedImagesQuantity = (action: 'PLUS_ONE' | 'MINUS_ONE'): ChangeUnloadedImagesQuantity => ({
    type: sceneActionList.CHANGE_UNLOADED_IMAGES_QUANTITY,
    payload: action,
})

export const setSceneWithTransition = (scene: SceneName): AppThunk => (dispatch) => {
    dispatch(setOpacityTransitionIsOver(false))
    dispatch(setOpacityTransitionToZeroIsOver(false))
    dispatch(setOpacity(0))
    setTimeout(() => {
        dispatch(setScene(scene))
        dispatch(setOpacityTransitionToZeroIsOver(true))
    }, opacityTransition)
}

export const setCutscene = (cutsceneName: CutsceneName): AppThunk => (dispatch) => {
    dispatch(changeDownloadQuantity("PLUS_ONE"))
    dispatch(setSceneWithTransition('Cutscene'))
    requestCutscene(cutsceneName)
        .then(cutsceneData => {
            dispatch(setCurrentCutscene(cutsceneData))
            dispatch(changeDownloadQuantity("MINUS_ONE"))
        }
        )
}

export default sceneReducer