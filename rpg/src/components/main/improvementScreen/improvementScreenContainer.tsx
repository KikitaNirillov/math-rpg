import { AppStateType } from "@redux/store"
import { connect } from "react-redux"
import ImprovementScreen from "./improvementScreen"
import { getImprovement } from "@redux/playerReducer"
import { Improvement } from "commonTypes"
import { setSceneWithTransition, setCurrentSceneDidMount } from "@redux/sceneReducer"
import { SceneName } from "scenes"

const mapStateToProps = (state: AppStateType) => ({
    currencyImg: state.location.currencyImg,
    availableImprovements: state.location.availableImprovements,
    unloadedImagesQuantity: state.scene.unloadedImagesQuantity,
    currentSceneDidMount: state.scene.currentSceneDidMount,
})

type MapDispatchToProps = {
    getImprovement: (improvementName: Improvement) => void
    setSceneWithTransition: (scene: SceneName) => void
    setCurrentSceneDidMount: (didMount: boolean) => void
}

export type ImprovementScreenProps = ReturnType<typeof mapStateToProps> & MapDispatchToProps

export default connect(mapStateToProps, { getImprovement, setSceneWithTransition, setCurrentSceneDidMount })(ImprovementScreen)