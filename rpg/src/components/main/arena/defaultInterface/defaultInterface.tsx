import { FightInterfaceName } from '@redux/fightReducer'
import s from './defaultInterface.module.scss'

type DefaultInterfaceProps = {
    attack: () => void
    escape: () => void
    setDisplayingFightInterface: (intefaceName: FightInterfaceName) => void
    playerIsAttacker: boolean
    fightInfo: string
    enemyHealthPoints: number,
}

const DefaultInterface: React.FC<DefaultInterfaceProps> = ({ attack, escape, setDisplayingFightInterface, ...props }) => {
    return (
        <div className={`${s.defaultInterface} arenaInterfaceContainer`}>
            <div className={s.defaultInterface__buttons}>
                {(!props.playerIsAttacker && props.enemyHealthPoints > 0) ?
                    <button
                        className={`${s.defaultInterface__buttons_button} ${s.readyButton}`}
                        onClick={attack}
                    >
                        <p>Ready for the enemy attack</p>
                    </button>
                    :
                    <>
                        <button
                            className={s.defaultInterface__buttons_button}
                            onClick={attack}
                            disabled={!props.playerIsAttacker || props.enemyHealthPoints <= 0}
                        >
                            <p>Attack</p>
                        </button>
                        <button
                            className={s.defaultInterface__buttons_button}
                            onClick={() => setDisplayingFightInterface('inventoryInterface')}
                            disabled={!props.playerIsAttacker || props.enemyHealthPoints <= 0}
                        >
                            <p>Inventory</p>
                        </button>
                        <button
                            className={s.defaultInterface__buttons_button}
                            onClick={() => setDisplayingFightInterface('questionInterface')}
                            disabled={!props.playerIsAttacker || props.enemyHealthPoints <= 0}
                        >
                            <p>Talk</p>
                        </button>
                        <button
                            className={s.defaultInterface__buttons_button}
                            onClick={escape}
                            disabled={!props.playerIsAttacker || props.enemyHealthPoints <= 0}
                        >
                            <p>Escape</p>
                        </button>
                    </>
                }
            </div>
            <div className={s.defaultInterface__textField}>
                <div className={s.defaultInterface__textField_fightInfo}>
                    <p className={s.defaultInterface__textField_fightInfo_main}>
                        {props.fightInfo}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DefaultInterface