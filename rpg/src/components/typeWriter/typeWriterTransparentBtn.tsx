import { setTypeWriterStopped } from '@redux/gameReducer'
import { AppStateType } from '@redux/store'
import { connect } from 'react-redux'

type MapDispatchToProps = {
    setTypeWriterStopped: (isStop: boolean) => void
}
const mapStateToProps = (state: AppStateType) => ({
    typeWriterIsWriting: state.game.typeWriterIsWriting,
})

type TypeWriterTransparentBtnProps = MapDispatchToProps & ReturnType<typeof mapStateToProps>

const TypeWriterTransparentBtn: React.FC<TypeWriterTransparentBtnProps> = ({ setTypeWriterStopped, typeWriterIsWriting }) => {
    return (
        <button className='transparentAbsoluteBtn'
            style={{ display: `${typeWriterIsWriting ? 'initial' : 'none'}` }}
            onClick={() => setTypeWriterStopped(true)} />
    )
}

export default connect(mapStateToProps, { setTypeWriterStopped })(TypeWriterTransparentBtn)