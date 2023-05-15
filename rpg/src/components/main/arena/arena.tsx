import React, { useCallback, useContext, useEffect, useState } from "react"
import s from './arena.module.scss'
import { ArenaProps } from "./arenaContainer"
import settings from 'settings'
import DefaultInterface from "./defaultInterface/defaultInterface"
import EquationInterface from "./equationInterface/equationInterface"
import QuestionInterface from "./questionInterface/questionInterface"
import TypeWriterTransparentBtn from "components/typeWriter/typeWriterTransparentBtn"
import InventoryInterface from "./inventoryInterface/inventoryInterface"
import RenderImg from "components/renderImg"
import bossfightBackground from '@assets/imgs/bossfightBackground.gif'


const Arena: React.FC<ArenaProps> = ({ swapAttackerAndReceiving, makeAttack, answerEquation, answerQuestion, setSceneWithTransition, overcomeCurrentEnemy, setNewLocation, setDisplayingFightInterface, employInventoryItem, ...props }) => {
    const playerIsAttacker = (props.attacker === 'player' && props.playerHealthPoints > 0)
    const enemyBeatenEnough = true // props.enemyHealthPoints <= requiredEnemyHealthPointsForConversation
    const escape = () => setSceneWithTransition("LocationMap")
    const [enemysOpacity, setEnemysOpacity] = useState<number>(1)

    useEffect(() => {
        if (props.unloadedImagesQuantity === 0 && !props.currentSceneDidMount) {
            setTimeout(() => {
                props.setCurrentSceneDidMount(true)
            }, settings.delayForScenes)
        }
    }, [props.unloadedImagesQuantity, props.currentSceneDidMount])

    // logic of the timer end: 
    useEffect(() => {
        if (props.timeForAnswer === 0) {
            answerEquation('noAnswer')
        }
    }, [props.timeForAnswer])

    // logic of the end of the battle:
    useEffect(() => { //if player died
        if (props.playerHealthPoints !== null && props.playerHealthPoints <= 0) {
            setTimeout(() => {
                setSceneWithTransition('GameOver')
            }, settings.changingHealthPointsTransition)
        }
    }, [props.playerHealthPoints])

    useEffect(() => { //if victoryMethod === 'kill'
        if (props.enemyHealthPoints !== null && props.enemyHealthPoints <= 0) {
            overcomeCurrentEnemy("kill")
            setTimeout(() => {
                setEnemysOpacity(0)
            }, settings.changingHealthPointsTransition)
            setTimeout(() => {
                if (props.enemyType === "mainBoss") {
                    setSceneWithTransition('LocationMap')
                }
                else setSceneWithTransition('ImprovementScreen')
            }, settings.changingHealthPointsTransition + settings.timeForEnemysDie)
            setTimeout(() => {
                if (props.enemyType === "mainBoss") {
                    setNewLocation()
                }
            }, settings.changingHealthPointsTransition + settings.timeForEnemysDie + settings.opacityTransition)
        }
    }, [props.enemyHealthPoints])
    useEffect(() => { //if victoryMethod === 'talk'
        if (props.enemyQuestions !== null && props.enemyQuestions.length === 0) { // if enemyType==='mainBoss' this expression return false
            overcomeCurrentEnemy("talk")
            setTimeout(() => {
                setEnemysOpacity(0)
            }, settings.changingHealthPointsTransition) // i can use any amount of time there
            setTimeout(() => {
                setSceneWithTransition('ImprovementScreen')
            }, settings.changingHealthPointsTransition + settings.timeForEnemysDie)
            setTimeout(() => {
                setDisplayingFightInterface("defaultInterface")
            }, settings.changingHealthPointsTransition + settings.timeForEnemysDie + settings.opacityTransition)
        }
    }, [props.enemyQuestions])

    return (
        <div className={s.arena} >
            <div className={s.arena__scene}>
                <RenderImg src={props.enemyType === "mainBoss" ? bossfightBackground : props.fightBackgroundImg} alt="background" className={s.arena__scene_backgroundImg} />
                {props.enemyEffects.length > 0 &&
                    <div className={s.arena__scene_enemyEffects}>
                        {props.enemyEffects.map(ef =>
                            <div className={s.arena__scene_enemyEffects_effect} key={ef.name}>
                                <p className={s.arena__scene_enemyEffects_effect_name}>
                                    {ef.name}:
                                </p>
                                <p className={s.arena__scene_enemyEffects_effect_number}
                                    style={{ width: `${ef.duration.toString().length * 2.15}vh` }}
                                >
                                    {ef.duration}
                                </p>
                            </div>
                        )}
                    </div>
                }
                <div className={s.arena__scene_content}>
                    <div className={s.arena__scene_content_healthBars}>
                        <div className={`${s.arena__scene_content_healthBars_container} ${playerIsAttacker ? s.attacker : ``}`}>
                            <div className={s.arena__scene_content_healthBars_container_health} style={{ width: `${props.playerHealthPoints}%`, transition: `all ${settings.changingHealthPointsTransition}ms` }} />
                            <p className={s.arena__scene_content_healthBars_container_name}>{props.playerHealthPoints}</p>
                        </div>
                        <div className={`${s.arena__scene_content_healthBars_container}`}>
                            <div className={s.arena__scene_content_healthBars_container_health} style={{ width: `0%` }} />
                            <p className={s.arena__scene_content_healthBars_container_name}>
                                {props.enemyHealthPoints === 0 ? 'PLAYER' :
                                    props.playerHealthPoints === 0 ? 'ENEMY' :
                                        props.attacker.toUpperCase()}'S TURN
                            </p>
                        </div>
                        <div className={`${s.arena__scene_content_healthBars_container} ${!playerIsAttacker ? s.attacker : ``}`}>
                            <div className={s.arena__scene_content_healthBars_container_health} style={{ width: `${(props.enemyType === 'mainBoss' ? props.enemyHealthPoints / 2 : props.enemyHealthPoints)}%`, transition: `all ${settings.changingHealthPointsTransition}ms` }} />
                            <p className={s.arena__scene_content_healthBars_container_name}>{props.enemyHealthPoints}</p>
                        </div>
                    </div>
                    <div className={s.arena__scene_content_figthers}>
                        <div className={s.arena__scene_content_figthers_fighter} style={{ left: `${props.playerPositionOnScreen}%` }}>
                            <div className={s.arena__scene_content_figthers_fighter_relativeContainer}>
                                <img src={props.playerDefaultImg} alt="Player" className={s.arena__scene_content_figthers_fighter_relativeContainer_img} />
                            </div>
                        </div>
                        <div className={s.arena__scene_content_figthers_fighter} style={{ right: `${props.enemyPositionOnScreen}%`, opacity: `${enemysOpacity}`, transition: `opacity ${settings.timeForEnemysDie}ms` }}>
                            <div className={s.arena__scene_content_figthers_fighter_relativeContainer}>
                                <img src={props.enemyDefaultImg} alt="Enemy" className={s.arena__scene_content_figthers_fighter_relativeContainer_img} id={s.enemyImg}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.arena__interface}>
                {
                    props.displayingFightInterface === 'questionInterface' ?
                        <QuestionInterface answerQuestion={answerQuestion} enemyQuestions={props.enemyQuestions} setDisplayingFightInterface={setDisplayingFightInterface} enemyBeatenEnough={enemyBeatenEnough} />
                        : (
                            props.displayingFightInterface === "equationInterface" ?
                                <EquationInterface answerEquation={answerEquation} timeForAnswer={props.timeForAnswer} equation={props.equation} />
                                : (
                                    props.displayingFightInterface === "inventoryInterface" ?
                                        <InventoryInterface setDisplayingFightInterface={setDisplayingFightInterface} inventory={props.inventory} employInventoryItem={employInventoryItem} />
                                        : <DefaultInterface attack={makeAttack} playerIsAttacker={playerIsAttacker} playerHealthPoints={props.playerHealthPoints} enemyHealthPoints={props.enemyHealthPoints} escape={escape} setDisplayingFightInterface={setDisplayingFightInterface} fightInfo={props.fightInfo} />
                                )
                        )
                }
                <TypeWriterTransparentBtn /> {/*diplay: 'none' if TypeWriter doesn't write*/}
            </div>
        </div>
    )
}

export default Arena