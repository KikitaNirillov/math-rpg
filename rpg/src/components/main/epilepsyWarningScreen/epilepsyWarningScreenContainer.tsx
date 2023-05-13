import { connect } from "react-redux";
import EpilepsyWarningScreen from "./epilepsyWarningScreen";
import { setSceneWithTransition, setCurrentSceneDidMount } from "@redux/sceneReducer";
import { SceneName } from "scenes";
import { AppStateType } from "@redux/store";

type MapDispatchToProps = {
    setSceneWithTransition: (scene: SceneName) => void
    setCurrentSceneDidMount: (didMount: boolean) => void
}
const mapStateToProps = (state: AppStateType) => ({
    currentSceneDidMount: state.scene.currentSceneDidMount,
})

export type EpilepsyWarningScreenProps = MapDispatchToProps & ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps, { setSceneWithTransition, setCurrentSceneDidMount })(EpilepsyWarningScreen)