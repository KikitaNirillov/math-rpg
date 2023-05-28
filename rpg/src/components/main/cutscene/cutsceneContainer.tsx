import { AppStateType } from "@redux/store";
import { connect } from "react-redux";
import Cutscene from "./cutscene";
import { setSceneWithTransition, setCurrentSceneDidMount } from "@redux/sceneReducer";
import { SceneName } from "scenes";

const mapStateToProps = (state: AppStateType) => ({
    typeWriterIsWriting: state.game.typeWriterIsWriting,
    unloadedImagesQuantity: state.scene.unloadedImagesQuantity,
    currentSceneDidMount: state.scene.currentSceneDidMount,
})

type DispatchToProps = {
    setSceneWithTransition: (scene: SceneName) => void
    setCurrentSceneDidMount: (didMount: boolean) => void
}

export type CutsceneProps = ReturnType<typeof mapStateToProps> & DispatchToProps

export default connect(mapStateToProps, {setCurrentSceneDidMount, setSceneWithTransition })(Cutscene)