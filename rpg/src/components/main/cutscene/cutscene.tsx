import { opacityTransition } from 'settings'
import TypeWriter from 'components/typeWriter/typeWriter'
import TypeWriterTransparentBtn from 'components/typeWriter/typeWriterTransparentBtn'
import s from './cutscene.module.scss'
import { CutsceneProps } from './cutsceneContainer'
import { useEffect } from 'react'
import RenderImg from 'components/renderImg'

const Cutscene: React.FC<CutsceneProps> = ({ removeCurrentSlideFromCutsceneList, setSceneWithTransition, setOpacity, ...props }) => {
    useEffect(() => {
        props.setCurrentSceneDidMount(true)
        return () => props.setCurrentSceneDidMount(false)
    }, [])
    
    const currentSlide = props.slideList[0]
    const nextBtn = () => {
        if (props.slideList.length === 1) {
            setSceneWithTransition(props.nextSceneName)
            setTimeout(() => {
                removeCurrentSlideFromCutsceneList()
            }, opacityTransition)
        }
        else {
            setOpacity(0)
            setTimeout(() => {
                removeCurrentSlideFromCutsceneList()
                setOpacity(1)
            }, opacityTransition)
        }
    }
    return (
        <div className={s.cutscene}>
            {currentSlide &&
                <div className={s.cutscene__slide}>
                    <RenderImg src={currentSlide.img} alt="slide image" className={s.cutscene__slide_img}/>
                    {/* <img src={currentSlide.img} alt="slide image" className={s.cutscene__slide_img} /> */}
                    <div className={s.cutscene__slide_text}>
                        <TypeWriter text={currentSlide.text} />
                    </div>
                </div>
            }
            {props.typeWriterIsWriting ?
                <TypeWriterTransparentBtn />
                : <button className={'transparentAbsoluteBtn'}
                    onClick={nextBtn}
                ></button>
            }
        </div>
    )
}

export default Cutscene