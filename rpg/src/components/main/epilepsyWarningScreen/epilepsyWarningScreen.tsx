import { EpilepsyWarningScreenProps } from "./epilepsyWarningScreenContainer"
import s from './epilepsyWarningScreen.module.scss'
import { useEffect } from "react"

const EpilepsyWarningScreen: React.FC<EpilepsyWarningScreenProps> = ({ setSceneWithTransition, setCurrentSceneDidMount, ...props }) => {
    useEffect(() => {
        if (!props.currentSceneDidMount) {
            setTimeout(() => {
                setCurrentSceneDidMount(true)
            }, 0)
        }
    }, [props.currentSceneDidMount])
    return (
        <div className={s.epilepsyWarningScreen}>
            <div className={s.epilepsyWarningScreen__info}>
                <p className={s.epilepsyWarningScreen__info_title}>EPILEPSY WARNING!</p>
                <p className={s.epilepsyWarningScreen__info_text}>
                    This game may contain flashing lights and images which can trigger seizures or other symptoms in people with photosensitive epilepsy.
                    Viewer discretion is advised.
                    If you or anyone in your family has a history of epilepsy or seizures, please consult with a medical professional before playing this game.
                    By continuing to play, you acknowledge and agree to the potential risks associated with playing this game.
                </p>
            </div>
            <p className={s.epilepsyWarningScreen__tip}>
                Click anywhere to continue
            </p>
            <button className={'transparentAbsoluteBtn'}
                onClick={() => setSceneWithTransition('RulesScreen')}
            ></button>
        </div>
    )
}

export default EpilepsyWarningScreen