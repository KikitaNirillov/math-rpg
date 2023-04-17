import { connect } from "react-redux"
import ChoosePlayer from "./choosePlayer"
import { chooseHero } from "@redux/playerReducer"
import { setSceneWithTransition, setCurrentSceneDidMount, setCutscene } from "@redux/sceneReducer"
import { setNewLocation } from "@redux/locationReducer"
import { SceneName } from "scenes"
import { HeroName } from "base/heroes"
import { CutsceneName } from "@base/cutscenes"

type DispatchPropsType = {
    chooseHero: (heroName: HeroName) => void
    setSceneWithTransition: (scene: SceneName) => void
    setCurrentSceneDidMount: (didMount: boolean) => void
    setNewLocation: () => void
    setCutscene: (cutsceneName: CutsceneName) => void
}

export type ChoosePlayerProps = DispatchPropsType

export default connect(null, { chooseHero, setSceneWithTransition, setNewLocation, setCurrentSceneDidMount, setCutscene })(ChoosePlayer)