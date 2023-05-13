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
            <div className={s.rulesScreen__rules}>
                <p className={s.rulesScreen__rules_title}>
                    SOME RULES & TIPS:
                </p>
                <p className={s.rulesScreen__rules_list}>
                    1) When writing decimals, you must use a dot. If there are several answers, write them separated by commas.<br />
                    For example if x=0.1 and x=2 you should write in x field 0.1,2<br />
                    2) To move to the next location, you must defeat the main boss of the location. After defeating the main boss, there is no going back.<br />
                    3) After escaping from fight, the enemy's health points are fully restored. The player, in order to restore health, will need to spend some coins.<br />
                    4) Talk is the second way to defeat the enemy. The ability to speak becomes available when the enemy has half or less health.<br />
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
        </div>
    )
}

export default RulesScreen