import { EnemyQuestion } from '@redux/enemyReducer'
import { FightInterfaceName } from '@redux/fightReducer'
import s from './defaultInterface.module.scss'

type DefaultInterfaceProps = {
    attack: () => void
    escape: () => void
    setDisplayingFightInterface: (intefaceName: FightInterfaceName) => void
    playerIsAttacker: boolean
    fightInfo: string
}

const DefaultInterface: React.FC<DefaultInterfaceProps> = ({ attack, escape, setDisplayingFightInterface,...props }) => {
    return (
        <div className={`${s.defaultInterface} arenaInterfaceContainer`}>
            <div className={s.defaultInterface__buttons}>
                <button
                    className={s.defaultInterface__buttons_button}
                    onClick={attack}
                    disabled={!props.playerIsAttacker}
                >
                    <p>Attack</p>
                </button>
                <button
                    className={s.defaultInterface__buttons_button}
                    onClick={() => setDisplayingFightInterface('inventoryInterface')}
                    disabled={!props.playerIsAttacker}
                >
                    <p>Inventory</p>
                </button>
                <button
                    className={s.defaultInterface__buttons_button}
                    onClick={() => setDisplayingFightInterface('questionInterface')}
                    disabled={!props.playerIsAttacker}
                >
                    <p>Talk</p>
                </button>
                <button
                    className={s.defaultInterface__buttons_button}
                    onClick={escape}
                    disabled={!props.playerIsAttacker}
                >
                    <p>Escape</p>
                </button>
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