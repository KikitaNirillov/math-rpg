import gameOverScreenImg from '@assets/imgs/gameOverScreenImg.png'
import settings from 'settings'
import { useEffect } from 'react'
import { GameOverProps } from './gameOverContainer'
import RenderImg from 'components/renderImg'
import s from './gameOver.module.scss'

const GameOver: React.FC<GameOverProps> = ({ initializeGame, ...props }) => {
    useEffect(() => {
        if (props.unloadedImagesQuantity === 0 && !props.currentSceneDidMount) {
            setTimeout(() => {
                props.setCurrentSceneDidMount(true)
                setTimeout(() => {
                    initializeGame()
                }, settings.gameOverScreenTime)
            }, settings.delayForScenes)
        }
    }, [props.unloadedImagesQuantity, props.currentSceneDidMount])

    return (
        <RenderImg src={gameOverScreenImg} alt="Game over" className={s.gameOverImg} />
    )
}

export default GameOver