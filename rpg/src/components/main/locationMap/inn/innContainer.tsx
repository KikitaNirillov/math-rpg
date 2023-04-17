import { AppStateType } from "@redux/store";
import { connect } from "react-redux";
import Inn from "./inn";
import { setPlayerHealthPoints } from "@redux/playerReducer";

type InnOwnProps = {
    closeLocationMapWindow: () => void
}

const mapStateToProps = (state: AppStateType, ownProps: InnOwnProps) => ({
    playerHealthPoints: state.player.healthPoints,
    currencyImg: state.location.currencyImg,
    coins: state.player.coins,
    closeLocationMapWindow: ownProps.closeLocationMapWindow,
})

type DispatchPropsType = {
    setPlayerHealthPoints: (newHealthPoints: number) => void
}

export type InnProps = ReturnType<typeof mapStateToProps> & DispatchPropsType

export default connect(mapStateToProps, { setPlayerHealthPoints })(Inn)