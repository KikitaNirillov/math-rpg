import settings from 'settings'
import s from './inn.module.scss'
import { InnProps } from './innContainer'

const Inn: React.FC<InnProps> = ({ setPlayerHealthPoints, closeLocationMapWindow, ...props }) => {
    const disableYesBtn = props.coins < settings.pricePerInn || props.playerHealthPoints === 100
    const sleep = () => {
        setPlayerHealthPoints(100)
    }
    return (
        <div className={`${s.inn} locationMapWindow`}>
            <div className={s.inn__healthInfo}>
                <p className={s.inn__healthInfo_title}>Your health:</p>
                <div className={s.inn__healthInfo_bar}>
                    <div className={s.inn__healthInfo_bar_stripe} style={{ width: `${props.playerHealthPoints}%`, transition: `all ${settings.changingHealthPointsTransition}ms` }} />
                    <p className={s.inn__healthInfo_bar_points}>{props.playerHealthPoints}</p>
                </div>
            </div>
            <div className={s.inn__title}>
                <p className={s.inn__title_text}>Do you want restore your healt by 3</p>
                <img src={props.currencyImg || ''} alt="currency" className={s.inn__title_img} />
                <p className={s.inn__title_text}>?</p>
            </div>
            <div className={s.inn__buttonList}>
                <button className={s.inn__buttonList_button} onClick={sleep} disabled={disableYesBtn}>
                    Yes
                </button>
                <button className={s.inn__buttonList_button} onClick={() => closeLocationMapWindow()}>
                    No
                </button>
            </div>
        </div>
    )
}

export default Inn