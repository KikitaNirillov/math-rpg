import { AppStateType } from "redux/store"
import { connect } from "react-redux"
import Arena from "./arena"
import { swapAttackerAndReceiving, makeAttack, answerEquation, answerQuestion, EnteredEquationAnswer, overcomeCurrentEnemy, setDisplayingFightInterface, FightInterfaceName } from "@redux/fightReducer"
import { employInventoryItem } from "@redux/playerReducer"
import { setSceneWithTransition, setCurrentSceneDidMount } from "@redux/sceneReducer"
import { SceneName } from "scenes"
import { setNewLocation } from "@redux/locationReducer"
import { InventoryItemName } from "commonTypes"

export type ArenaProps = StatePropsType & DispatchPropsType

const mapStateToProps = (state: AppStateType) => ({
    playerName: state.player.name,
    playerDefaultImg: state.player.defaultImg,
    playerHealthPoints: state.player.healthPoints,
    enemyName: state.enemy.name,
    enemyType: state.enemy.enemyType,
    enemyDefaultImg: state.enemy.defaultImg,
    enemyHealthPoints: state.enemy.healthPoints,
    enemyQuestions: state.enemy.questions,
    attacker: state.fight.attacker,
    inventory: state.player.inventory,

    fightInfo: state.fight.fightInfo,

    equation: state.fight.equation,
    timeForAnswer: state.fight.timeForAnswer,

    playerPositionOnScreen: state.player.positionOnArenaScreen,
    enemyPositionOnScreen: state.enemy.positionOnArenaScreen,

    displayingFightInterface: state.fight.displayingFightInterface,

    unloadedImagesQuantity: state.scene.unloadedImagesQuantity,
    currentSceneDidMount: state.scene.currentSceneDidMount,
})
type StatePropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    setSceneWithTransition: (scene: SceneName) => void
    setCurrentSceneDidMount: (didMount: boolean) => void
    swapAttackerAndReceiving: () => void
    makeAttack: () => void
    answerEquation: (enteredAnswer: EnteredEquationAnswer) => void
    answerQuestion: (enteredAnswer: string) => void
    overcomeCurrentEnemy: (method: 'talk' | 'kill') => void
    setNewLocation: () => void
    setDisplayingFightInterface: (intefaceName: FightInterfaceName) => void
    employInventoryItem: (itemName: InventoryItemName) => void
}

export default connect(mapStateToProps, { swapAttackerAndReceiving, employInventoryItem, makeAttack, answerEquation, answerQuestion, setSceneWithTransition, overcomeCurrentEnemy, setNewLocation, setDisplayingFightInterface, setCurrentSceneDidMount })(Arena)