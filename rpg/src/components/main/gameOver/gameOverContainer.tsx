import { connect } from "react-redux"
import GameOver from "./gameOver"
import { initializeGame } from "@redux/gameReducer"
import { setCurrentSceneDidMount } from "@redux/sceneReducer"

type DispatchPropsType = {
    initializeGame: () => void
    setCurrentSceneDidMount: (didMount: boolean) => void
}

export type GameOverProps = DispatchPropsType

export default connect(null, { initializeGame, setCurrentSceneDidMount})(GameOver)