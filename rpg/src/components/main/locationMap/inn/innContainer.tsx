import { AppStateType } from "@redux/store";
import { connect } from "react-redux";
import Inn from "./inn";
import { buyFullHeal } from "@redux/playerReducer";

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
    buyFullHeal: () => void
}

export type InnProps = ReturnType<typeof mapStateToProps> & DispatchPropsType

export default connect(mapStateToProps, { buyFullHeal })(Inn)