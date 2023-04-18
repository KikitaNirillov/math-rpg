import gameOverScreenImg from '@assets/imgs/gameOverScreenImg.png'
import { GameOverScreenTime } from 'settings'
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
                }, GameOverScreenTime)
            }, 0)
        }
    }, [props.unloadedImagesQuantity, props.currentSceneDidMount])

    return (
        <RenderImg src={gameOverScreenImg} alt="Game over" className={s.gameOverImg} />
        // <img src={gameOverScreenImg} alt="Game over" style={{ height: '100%', width: '100%' }} />
    )
}

export default GameOver