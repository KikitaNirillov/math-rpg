import RenderImg from 'components/renderImg'
import { useEffect, useState } from 'react'
import Inn from './inn/innContainer'
import s from './locationMap.module.scss'
import { LocationMapProps } from './locationMapContainer'
import Store from './store/storeContainer'

const LocationMap: React.FC<LocationMapProps> = (props) => {
    useEffect(() => {
        if (props.unloadedImagesQuantity === 0 && !props.currentSceneDidMount) {
            setTimeout(() => {
                props.setCurrentSceneDidMount(true)
            }, 0)
        }
    }, [props.unloadedImagesQuantity, props.currentSceneDidMount])

    const [focusItem, setFocusItem] = useState<'inn' | 'store' | 'boss' | 'lair' | null>(null)
    const [displayingWindow, setDisplayingWindow] = useState<'Inn' | 'Store' | null>(null)
    const closeLocationMapWindow = () => setDisplayingWindow(null)
    return (
        <div className={s.locationMapScreen}>
            <div className={`${s.locationMap} ${displayingWindow ? s.nowItsBackground : null}`}>
                <RenderImg src={props.mapBackgroundImg} alt="background" className={s.locationMap__backgroundImg} />
                <div className={s.locationMap__onFocusInfo}>
                    <p>
                        {focusItem === null ? 'Where am I going?' : ('Go to the ' + focusItem)}
                    </p>
                </div>
                <div className={s.locationMap__buttonList}>
                    <button className={s.locationMap__buttonList_innBtn}
                        onMouseOver={() => setFocusItem('inn')}
                        onMouseLeave={() => displayingWindow === null && setFocusItem(null)}
                        onClick={() => setDisplayingWindow('Inn')}>
                        <RenderImg src={props.innIcon} alt="Inn" className={s.locationMap__buttonList_innBtn_icon} />
                    </button>
                    <button className={s.locationMap__buttonList_storeBtn}
                        onMouseOver={() => setFocusItem('store')}
                        onMouseLeave={() => displayingWindow === null && setFocusItem(null)}
                        onClick={() => setDisplayingWindow('Store')}>
                        <RenderImg src={props.storeIcon} alt="Store" className={s.locationMap__buttonList_storeBtn_icon} />
                    </button>
                    <button className={s.locationMap__buttonList_bossBtn}
                        onMouseOver={() => setFocusItem('boss')}
                        onMouseLeave={() => props.sceneOpacity === 1 && setFocusItem(null)}
                        onClick={() => {
                            if (props.mainBossName) {
                                props.changeDownloadQuantity('PLUS_ONE')
                                props.setNewEnemy(props.mainBossName)
                                props.setSceneWithTransition('Arena')
                            }
                            else console.warn('no bossName found')
                        }}>
                        <RenderImg src={props.toBossIcon} alt='to boss' className={s.locationMap__buttonList_bossBtn_icon} />
                    </button>
                    <button className={s.locationMap__buttonList_lairBtn}
                        disabled={props.livingMonsterNames.length === 0}
                        onMouseOver={() => setFocusItem('lair')}
                        onMouseLeave={() => props.sceneOpacity === 1 && setFocusItem(null)}
                        onClick={() => {
                            if (props.livingMonsterNames) {
                                props.changeDownloadQuantity('PLUS_ONE')
                                props.setNewEnemy(props.livingMonsterNames[0])
                                props.setSceneWithTransition('Arena')
                            }
                            else console.warn('no monsterNames found')
                        }}>
                        <RenderImg src={props.lairIcon} alt="Lair" className={s.locationMap__buttonList_lairBtn_icon} />
                    </button>
                </div>
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