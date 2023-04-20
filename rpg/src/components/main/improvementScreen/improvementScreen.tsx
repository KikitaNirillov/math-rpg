import s from './improvementScreen.module.scss'
import damageImprovementImg from '@assets/imgs/improvements/increasedDamageDealtImg.jpg'
import protectionImprovementImg from '@assets/imgs/improvements/reductionOfDamageReceivedImg.jpg'
import timeImprovementImg from '@assets/imgs/improvements/increasedProtectionTimeImg.jpg'
import { useEffect, useState } from 'react'
import { ImprovementScreenProps } from './improvementScreenContainer'
import { Improvement } from 'commonTypes'
import { delayForScenes, opacityTransition } from 'settings'
import RenderImg from 'components/renderImg'

type FocusImprovement = 'none' | 'damageImprovement' | 'protectionImprovement' | 'timeImprovement'
const improvementInfo = {
    damageImprovement: {
        description: '(Increase damage dealt by 2x)',
        img: damageImprovementImg,
    },
    protectionImprovement: {
        description: '(Reduce damage taken by 2x)',
        img: protectionImprovementImg,
    },
    timeImprovement: {
        description: '(Increase defense time by 1,5x)',
        img: timeImprovementImg,
    },
}

const ImprovementScreen: React.FC<ImprovementScreenProps> = ({ getImprovement, setSceneWithTransition, ...props }) => {
    useEffect(() => {
        if (props.unloadedImagesQuantity === 0 && !props.currentSceneDidMount) {
            setTimeout(() => {
                props.setCurrentSceneDidMount(true)
            }, delayForScenes)
        }
    }, [props.unloadedImagesQuantity, props.currentSceneDidMount])
    
    const [focusImprovement, setFocusImprovement] = useState<FocusImprovement>('none')
    const improvementButton = (improvementName: Improvement) => {
        return (
            <button className={s.improvementScreen__improvements_list_button}
                key={improvementName}
                onMouseOver={() => setFocusImprovement(improvementName)}
                onMouseLeave={() => setFocusImprovement('none')}
                onClick={() => {
                    setSceneWithTransition('LocationMap')
                    setTimeout(() => getImprovement(improvementName), opacityTransition)
                }}
            >
                <RenderImg src={improvementInfo[improvementName].img} alt={improvementName} className={s.improvementScreen__improvements_list_button_img}/>
                {/* <img src={improvementInfo[improvementName].img} alt={improvementName} className={s.improvementScreen__improvements_list_button_img} /> */}
            </button>
        )
    }
    return (
        <div className={s.improvementScreen}>
            <h2 className={s.improvementScreen__title}>Enemy is overcome!</h2>
            <div className={s.improvementScreen__moneyInfo}>
                <p className={s.improvementScreen__moneyInfo_text}>You get 3</p>
                <RenderImg src={props.currencyImg} alt='currency on this location' className={s.improvementScreen__moneyInfo_currencyImg}/>
                {/* <img src={props.currencyImg} alt='currency on this location' className={s.improvementScreen__moneyInfo_currencyImg} /> */}
            </div>
            <div className={s.improvementScreen__improvements}>
                <p className={s.improvementScreen__improvements_text}>
                    Also, you get improvement for current location! Choose one of the available:
                </p>
                <div className={s.improvementScreen__improvements_list}>
                    {props.availableImprovements.map(improvement => improvementButton(improvement))}
                </div>
                <p>{
                    (focusImprovement !== 'none' ? improvementInfo[focusImprovement].description : "(You can't not take anything)")
                }</p>
            </div>
        </div>
    )
}
export default ImprovementScreen