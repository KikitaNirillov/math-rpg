import { AppStateType } from "@redux/store";
import { connect } from "react-redux";
import Cutscene from "./cutscene";
import { removeCurrentSlideFromCutsceneList, setSceneWithTransition, setOpacity, setCurrentSceneDidMount } from "@redux/sceneReducer";
import { SceneName } from "scenes";

const mapStateToProps = (state: AppStateType) => ({
    slideList: state.scene.currentCutscene.slideList,
    nextSceneName: state.scene.currentCutscene.nextSceneName,
    typeWriterIsWriting: state.game.typeWriterIsWriting,
    unloadedImagesQuantity: state.scene.unloadedImagesQuantity,
    currentSceneDidMount: state.scene.currentSceneDidMount,
})

type DispatchToProps = {
    removeCurrentSlideFromCutsceneList: () => void
    setSceneWithTransition: (scene: SceneName) => void
    setOpacity: (opacity: number) => void
    setCurrentSceneDidMount: (didMount: boolean) => void
}

export type CutsceneProps = ReturnType<typeof mapStateToProps> & DispatchToProps

export default connect(mapStateToProps, {setCurrentSceneDidMount, removeCurrentSlideFromCutsceneList, setSceneWithTransition, setOpacity })(Cutscene)