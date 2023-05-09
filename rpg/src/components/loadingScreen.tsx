import loadingScreenImg from '@assets/imgs/loadingScreen.gif'
import settings from 'settings'
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
        }, settings.mandatoryLoadingScreenTime)
    }, [])
    return (
        <img src={loadingScreenImg} alt="Loading..." style={{ height: '100%', width: '100%' }} />
    )
}

export default LoadingScreen