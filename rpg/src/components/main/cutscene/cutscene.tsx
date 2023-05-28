import settings from 'settings'
import TypeWriter from 'components/typeWriter/typeWriter'
import TypeWriterTransparentBtn from 'components/typeWriter/typeWriterTransparentBtn'
import s from './cutscene.module.scss'
import { CutsceneProps } from './cutsceneContainer'
import { useEffect } from 'react'

const Cutscene: React.FC<CutsceneProps> = ({ setSceneWithTransition, ...props }) => {

    useEffect(() => {
        if (props.unloadedImagesQuantity === 0 && !props.currentSceneDidMount) {
            setTimeout(() => {
                props.setCurrentSceneDidMount(true)
            }, settings.delayForScenes)
        }
    }, [props.unloadedImagesQuantity, props.currentSceneDidMount])

    const clickBtn = () => setSceneWithTransition('LocationMap')

    return (
        <div className={s.cutscene}>
            {
                <div className={s.cutscene__text}>
                    <TypeWriter text={
                        `You don't feel the ground under your feet. Looks like you're falling...Boom! When you wake up, you see a small bag next to you. Having carefully examined it, you understand that there is no bottom in it. "Why not take it with you" you thought. A huge mountain appeared before your eyes. For no reason at all, you decide to climb to the very top of it. Forward, to meet fate!`
                    } />
                </div>
            }
            {props.typeWriterIsWriting ?
                <TypeWriterTransparentBtn />
                : <button className={'transparentAbsoluteBtn'}
                    onClick={clickBtn}
                ></button>
            }
        </div>
    )
}

export default Cutscene