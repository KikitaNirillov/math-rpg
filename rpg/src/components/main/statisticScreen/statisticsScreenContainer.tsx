import { connect } from "react-redux";
import StatisticsScreen from "./statisticsScreen";
import { initializeGame} from '@redux/gameReducer';
import { setCurrentSceneDidMount, setSceneWithTransition} from "@redux/sceneReducer";
import { AppStateType } from "@redux/store";

type MapDispatchToProps = {
    initializeGame: () => void
    setCurrentSceneDidMount: (didMount: boolean) => void
}

const mapStateToProps = (state: AppStateType) => ({
    currentSceneDidMount: state.scene.currentSceneDidMount,
    gameDifficulty: state.game.difficulty,
    stats: state.game.stats,
})

export type StatisticsScreenProps = MapDispatchToProps & ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps, { initializeGame, setCurrentSceneDidMount})(StatisticsScreen)