import { HeroName } from "@base/heroes"
import TypeWriter from "components/typeWriter/typeWriter"
import { useEffect, useState } from "react"
import settings from "settings"
import { ChoosePlayerProps } from "./choosePlayerContainer"
import s from './choosePlayer.module.scss'
import warriorImg from '@sprites/playerImgs/playerWarriorDefaultImg.jpg'
import magicianImg from '@sprites/playerImgs/playerMagicianDefaultImg.jpg'
import TypeWriterTransparentBtn from "components/typeWriter/typeWriterTransparentBtn"

const heroesImgs = {
    warrior: warriorImg,
    magician: magicianImg
}

const ChoosePlayer: React.FC<ChoosePlayerProps> = (props) => {
    const [textWasDisplayed, setTextWasDisplayed] = useState<boolean>(false)
    const [focusHero, setFocusHero] = useState<HeroName | null>(null)
    const [heroWasChosen, setHeroWasChosen] = useState<boolean>(false)

    useEffect(() => {
        if (props.unloadedImagesQuantity === 0 && !props.currentSceneDidMount) {
            setTimeout(() => {
                props.setCurrentSceneDidMount(true)
            }, settings.delayForScenes)
        }
    }, [props.unloadedImagesQuantity, props.currentSceneDidMount])

    const сhooseHero = (hero: HeroName) => {
        setHeroWasChosen(true)
        props.setNewLocation()
        props.chooseHero(hero)
        props.setSceneWithTransition("Cutscene")
    }

    return (
        <div className={s.choosePlayer}>
            <div className={s.choosePlayer__scene}>
                {focusHero &&
                    <img src={heroesImgs[focusHero]} alt={`${focusHero}Img`} className={s.choosePlayer__scene_heroImg} />
                }
            </div>
            <div className={s.choosePlayer__interface}>
                <TypeWriterTransparentBtn />
                <div className={s.choosePlayer__interface_container}>
                    <div className={s.choosePlayer__interface_container_question}>
                        <TypeWriter
                            text={'How do yo see yourself ?'}
                            whatToDoAtTheEnd={() => setTextWasDisplayed(true)}
                        />
                    </div>
                    {textWasDisplayed &&
                        <div className={s.choosePlayer__interface_container_answers}>
                            <button className={s.choosePlayer__interface_container_answers_button}
                                onClick={() => сhooseHero('warrior')}
                                onMouseOver={() => setFocusHero('warrior')}
                                onMouseLeave={() => setFocusHero(heroWasChosen ? 'warrior' : null)}
                            >
                                <p>Warrior (easy difficulty)</p>
                            </button>
                            <button className={s.choosePlayer__interface_container_answers_button}
                                onClick={() => сhooseHero('magician')}
                                onMouseOver={() => setFocusHero('magician')}
                                onMouseLeave={() => setFocusHero(heroWasChosen ? 'magician' : null)}
                            >
                                <p>Magician (hard difficulty)</p>
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ChoosePlayer