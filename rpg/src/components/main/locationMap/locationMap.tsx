import RenderImg from 'components/renderImg'
import { useEffect, useState } from 'react'
import Inn from './inn/innContainer'
import s from './locationMap.module.scss'
import { LocationMapProps } from './locationMapContainer'
import Store from './store/storeContainer'

const LocationMap: React.FC<LocationMapProps> = (props) => {
    useEffect(() => {
        props.setCurrentSceneDidMount(true)
        return () => props.setCurrentSceneDidMount(false)
    }, [])
    
    const [displayingWindow, setDisplayingWindow] = useState<'Inn' | 'Store' | null>(null)
    const closeLocationMapWindow = () => setDisplayingWindow(null)
    return (
        <div className={s.locationMapScreen}>
            <div className={`${s.locationMap} ${displayingWindow ? s.nowItsBackground : null}`} style={{
                backgroundImage: "url(" + props.mapBackgroundImg + ")"
            }}>
                <button className={s.locationMap__button} onClick={() => {
                    if (props.mainBossName) {
                        props.changeDownloadQuantity('PLUS_ONE')
                        props.setNewEnemy(props.mainBossName)
                        props.setSceneWithTransition('Arena')
                    }
                    else console.warn('no bossName found')
                }}>
                    <img src='' alt="To main boss" className={s.locationMap__button_icon} />
                </button>
                <button className={s.locationMap__button} disabled={props.livingMonsterNames.length === 0} onClick={() => {
                    if (props.livingMonsterNames) {
                        props.changeDownloadQuantity('PLUS_ONE')
                        props.setNewEnemy(props.livingMonsterNames[0])
                        props.setSceneWithTransition('Arena')
                    }
                    else console.warn('no monsterNames found')
                }}>
                    <RenderImg src={props.lairIcon} alt="Lair" className={s.locationMap__button_icon} />
                    {/* <img src={props.lairIcon} alt="Lair" className={s.locationMap__button_icon} /> */}
                </button>
                <button className={s.locationMap__button} onClick={() => setDisplayingWindow('Inn')}>
                    <RenderImg src={props.innIcon} alt="Inn" className={s.locationMap__button_icon} />
                    {/* <img src={props.innIcon} alt="Inn" className={s.locationMap__button_icon} /> */}
                </button>
                <button className={s.locationMap__button} onClick={() => setDisplayingWindow('Store')}>
                    <RenderImg src={props.storeIcon} alt="Store" className={s.locationMap__button_icon}/>
                    {/* <img src={props.storeIcon} alt="Store" className={s.locationMap__button_icon} /> */}
                </button>

            </div>
            {displayingWindow === 'Inn' ? <Inn closeLocationMapWindow={closeLocationMapWindow} /> :
                (
                    displayingWindow === 'Store' ? <Store closeLocationMapWindow={closeLocationMapWindow} /> : null
                )
            }
            {displayingWindow !== null ?
                <div className={s.coins}>
                    <p className={s.coins_text}>Coins: {props.coins}</p>
                    <img src={props.currencyImg} className={s.coins_img} alt="'currency on this location'" />
                </div>
                : null}
        </div>
    )
}

export default LocationMap