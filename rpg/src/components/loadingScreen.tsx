import loadingScreenImg from '@assets/imgs/loadingImg.gif'
import { mandatoryLoadingScreenTime } from 'settings'
import { useEffect } from 'react'

type PropsType = {
    setLoadingExistedForEnoughTime: (isEnough: boolean) => void
}

const LoadingScreen: React.FC<PropsType> = ({ setLoadingExistedForEnoughTime }) => {
    useEffect(() => {
        setLoadingExistedForEnoughTime(false)
    }, [setLoadingExistedForEnoughTime])
    useEffect(() => {
        setTimeout(() => {
            setLoadingExistedForEnoughTime(true)
        }, mandatoryLoadingScreenTime)
    }, [])
    return (
        <img src={loadingScreenImg} alt="Loading..." style={{ height: '100%', width: '100%' }} />
    )
}

export default LoadingScreen