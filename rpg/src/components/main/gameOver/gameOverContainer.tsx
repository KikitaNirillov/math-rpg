import { connect } from "react-redux"
import GameOver from "./gameOver"
import { initializeGame } from "@redux/gameReducer"
import { setCurrentSceneDidMount } from "@redux/sceneReducer"
import { AppStateType } from "@redux/store"

const mapStateToProps = (state: AppStateType) => ({
    unloadedImagesQuantity: state.scene.unloadedImagesQuantity,
    currentSceneDidMount: state.scene.currentSceneDidMount,
})

type DispatchPropsType = {
    initializeGame: () => void
    setCurrentSceneDidMount: (didMount: boolean) => void
}

export type GameOverProps = DispatchPropsType & ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps, { initializeGame, setCurrentSceneDidMount })(GameOver)