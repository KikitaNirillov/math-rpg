import { useEffect, useState } from "react"
import typewriterSound from '@assets/sounds/typewriterSound.mp3'
import useSound from "use-sound"
import { AppStateType } from "@redux/store"
import { setTypeWriterIsWriting, setTypeWriterStopped } from '@redux/gameReducer'
import { connect } from "react-redux"

const delayBeforeFirstSymbol = 300
const defaultDelayBeforeNextSymbol = 80

type TypeWriterOwnProps = {
    text: string
    whatToDoAtTheEnd?: () => void
}

const mapStateToProps = (state: AppStateType, ownProps: TypeWriterOwnProps) => ({
    ...ownProps,
    typeWriterIsWriting: state.game.typeWriterIsWriting,
    typeWriterStopped: state.game.typeWriterStopped,
    opacity: state.scene.opacity,
    soundValue: state.game.soundValue
})

type MapDispatchToProps = {
    setTypeWriterIsWriting: (isWriting: boolean) => void
    setTypeWriterStopped: (wasStop: boolean) => void
}

type TypeWriterProps = MapDispatchToProps & ReturnType<typeof mapStateToProps>

const TypeWriter: React.FC<TypeWriterProps> = ({ text, typeWriterStopped, opacity, soundValue, setTypeWriterStopped, setTypeWriterIsWriting, whatToDoAtTheEnd = () => { } }) => {
    const [play, { stop }] = useSound(typewriterSound, { volume: soundValue === "OFF" ? 0 : 0.5 });
    const [newText, setNewText] = useState<string>('')
    const [letterNumber, setLetterNumber] = useState<number>(0)
    const [firstSimbolDisplayed, setFirstSimbolDisplayed] = useState<boolean>(false)

    useEffect(() => {
        return () => {
            setTypeWriterStopped(false)
        }
    }, [])

    useEffect(() => {
        setTypeWriterStopped(false)
        setLetterNumber(0)
        setNewText('')
        setFirstSimbolDisplayed(false)
        setTypeWriterIsWriting(true)
    }, [text])

    useEffect(() => {
        if (typeWriterStopped) {
            setTypeWriterIsWriting(false)
            whatToDoAtTheEnd()
        }
    }, [typeWriterStopped])

    useEffect(() => {
        if (!typeWriterStopped && opacity === 1) {
            setTimeout(() => {
                if (newText.length !== text.length) {
                    setTimeout(() => {
                        stop()
                        if (!typeWriterStopped) play()
                        setNewText(newText + text.charAt(letterNumber))
                        setFirstSimbolDisplayed(true)
                        setLetterNumber(letterNumber + 1)
                    }, defaultDelayBeforeNextSymbol)
                } else {
                    setTypeWriterStopped(true)
                }
            }, firstSimbolDisplayed ? 0 : (delayBeforeFirstSymbol))
        }
    }, [newText, opacity])

    return <p>
        {typeWriterStopped ? text : newText}
    </p>
}

export default connect(mapStateToProps, { setTypeWriterIsWriting, setTypeWriterStopped })(TypeWriter)