import { connect } from "react-redux";
import RulesScreen from "./rulesScreen";
import { initializeGame, SoundValue, setSoundValue } from '@redux/gameReducer';
import { setCurrentSceneDidMount } from "@redux/sceneReducer";
import { AppStateType } from "@redux/store";

type MapDispatchToProps = {
    initializeGame: () => void
    setCurrentSceneDidMount: (didMount: boolean) => void
    setSoundValue: (value: SoundValue) => void
}

const mapStateToProps = (state: AppStateType) => ({
    currentSceneDidMount: state.scene.currentSceneDidMount,
    soundValue: state.game.soundValue,
})

export type RulesScreenProps = MapDispatchToProps & ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps, { initializeGame, setCurrentSceneDidMount, setSoundValue })(RulesScreen)