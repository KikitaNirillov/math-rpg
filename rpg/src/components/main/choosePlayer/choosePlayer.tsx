import s from './choosePlayer.module.scss'
import warriorImg from '@sprites/playerImgs/playerWarriorDefaultImg.jpg'
import magicianImg from '@sprites/playerImgs/playerMagicianDefaultImg.jpg'
import { useEffect, useState } from 'react'
import { ChoosePlayerProps } from './choosePlayerContainer'
import { HeroName } from 'base/heroes'
import RenderImg from 'components/renderImg'
import { delayForScenes } from 'settings'

const ChoosePlayer: React.FC<ChoosePlayerProps> = (props) => {
    useEffect(() => {
        if (props.unloadedImagesQuantity === 0 && !props.currentSceneDidMount) {
            setTimeout(() => {
                props.setCurrentSceneDidMount(true)
            }, delayForScenes)
        }
    }, [props.unloadedImagesQuantity, props.currentSceneDidMount])

    const [hero, choose] = useState<HeroName | null>(null)
    const сhooseButton = () => {
        if (hero) {
            props.setNewLocation()
            props.chooseHero(hero)
            props.setCutscene('beginning')
        }
        else console.warn("Hero wasn't chosen")
    }
    return (
        <div className={s.choosePlayer}>
            <h2 className={(s.choosePlayer_title)}>HOW DO YOU SEE YOURSELF?</h2>
            <div className={s.choosePlayer_heroes}>
                <button className={`${s.choosePlayer_heroes_button} ${(hero === 'warrior') ? s.chosen : ``}`}
                    onClick={() => choose('warrior')}
                >
                    <RenderImg src={warriorImg} alt="warriorImg" className={s.choosePlayer_heroes_button_avatar} />
                    {/* <img src={warriorImg} alt="warriorImg" className={s.choosePlayer_heroes_button_avatar} /> */}
                </button>
                <button className={`${s.choosePlayer_heroes_button} ${(hero === 'magician') ? s.chosen : ``}`}
                    onClick={() => choose('magician')}
                >
                    <RenderImg src={magicianImg} alt="magicianImg" className={s.choosePlayer_heroes_button_avatar} />
                    {/* <img src={magicianImg} alt="magicianImg" className={s.choosePlayer_heroes_button_avatar} /> */}
                </button>
            </div>
            <ul className={s.choosePlayer_buttonsList}>
                <button className={s.choosePlayer_buttonsList_button}
                    onClick={сhooseButton} disabled={!hero}
                >
                    Choose
                </button>
            </ul>
        </div>
    )
}
export default ChoosePlayer