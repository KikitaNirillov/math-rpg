import { connect } from "react-redux";
import { SceneName } from "scenes";
import LocationMap from "./locationMap";
import { setSceneWithTransition, setCurrentSceneDidMount } from "@redux/sceneReducer"
import { AppStateType } from "@redux/store";
import { setNewEnemy } from "@redux/enemyReducer";
import { EnemyName } from "@base/enemies";
import { changeDownloadQuantity } from "@redux/sceneReducer";

export type LocationMapProps = DispatchPropsType & StatePropsType

const mapStateToProps = (state: AppStateType) => ({
    locationName: state.location.locationName,
    mapBackgroundImg: state.location.mapBackgroundImg,
    fightBackgroundImg: state.location.fightBackgroundImg,
    lairIcon: state.location.locationEnvironment.lairIcon,
    innIcon: state.location.locationEnvironment.innIcon,
    storeIcon: state.location.locationEnvironment.storeIcon,
    livingMonsterNames: state.location.livingMonsterNames,
    mainBossName: state.location.mainBossName,
    coins: state.player.coins,
    currencyImg: state.location.currencyImg,
    unloadedImagesQuantity: state.scene.unloadedImagesQuantity,
    currentSceneDidMount: state.scene.currentSceneDidMount,
})
type StatePropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    setSceneWithTransition: (scene: SceneName) => void
    setCurrentSceneDidMount: (didMount: boolean) => void
    setNewEnemy: (enemyName: EnemyName) => void
    changeDownloadQuantity: (action: 'PLUS_ONE' | 'MINUS_ONE') => void
}

export default connect(mapStateToProps, { setSceneWithTransition, setNewEnemy, changeDownloadQuantity, setCurrentSceneDidMount })(LocationMap)