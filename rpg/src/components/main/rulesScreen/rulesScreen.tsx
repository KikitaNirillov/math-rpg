import { RulesScreenProps } from "./rulesScreenContainer"
import s from './rulesScreen.module.scss'
import { useEffect } from "react"

const RulesScreen: React.FC<RulesScreenProps> = ({ initializeGame, setCurrentSceneDidMount, setSoundValue, ...props }) => {
    const switchSoundValue = () => setSoundValue(props.soundValue === "OFF" ? 'ON' : 'OFF')
    useEffect(() => {
        if (!props.currentSceneDidMount) {
            setTimeout(() => {
                setCurrentSceneDidMount(true)
            }, 0)
        }
    }, [props.currentSceneDidMount])
    return (
        <div className={s.rulesScreen}>
            <div className={s.rulesScreen__gameTitle}>
                <h1 className={s.rulesScreen__gameTitle_game}>MATH RPG</h1>
                <p className={s.rulesScreen__gameTitle_author}>by Kikita Nirillov</p>
            </div>
            <div className={s.rulesScreen__rules}>
                <p className={s.rulesScreen__rules_title}>
                    SOME RULES & TIPS:
                </p>
                <p className={s.rulesScreen__rules_list}>
                    1) When writing decimals, you must use a dot. If there are several answers, write them separated by commas.<br />
                    For example if x=0.1 and x=2 you should write in x field 0.1,2<br />
                    2) Talk is the second way to defeat the enemy. The ability to speak becomes available when the enemy has half or less health.<br />
                </p>
                <p className={s.rulesScreen__rules_tip}>
                    You'll figure out the rest yourself. Good luck, have fun!
                </p>
            </div>
            <div className={s.rulesScreen__buttonsList}>
                <button className={s.rulesScreen__buttonsList_button}
                    onClick={switchSoundValue}
                >
                    Sound: {props.soundValue}
                </button>
                <button className={s.rulesScreen__buttonsList_button}
                    onClick={() => initializeGame()}
                >
                    Let's go!
                </button>
            </div>
            <a href="https://boosty.to/kikita_nirillov/donate" target="blank" className={s.rulesScreen__supportLink}>My Boosty (Donate)</a>
        </div>
    )
}

export default RulesScreen