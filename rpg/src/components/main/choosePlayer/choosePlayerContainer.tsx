import { connect } from "react-redux"
import ChoosePlayer from "./choosePlayer"
import { chooseHero } from "@redux/playerReducer"
import { setSceneWithTransition, setCurrentSceneDidMount} from "@redux/sceneReducer"
import { setNewLocation } from "@redux/locationReducer"
import { SceneName } from "scenes"
import { HeroName } from "base/heroes"
import { AppStateType } from "@redux/store"

const mapStateToProps = (state: AppStateType) => ({
    unloadedImagesQuantity: state.scene.unloadedImagesQuantity,
    currentSceneDidMount: state.scene.currentSceneDidMount,
})

type DispatchPropsType = {
    chooseHero: (heroName: HeroName) => void
    setSceneWithTransition: (scene: SceneName) => void
    setCurrentSceneDidMount: (didMount: boolean) => void
    setNewLocation: () => void
}

export type ChoosePlayerProps = DispatchPropsType & ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps, { chooseHero, setSceneWithTransition, setNewLocation, setCurrentSceneDidMount})(ChoosePlayer)