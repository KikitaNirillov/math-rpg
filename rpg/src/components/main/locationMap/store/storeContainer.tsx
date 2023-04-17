import { AppStateType } from "@redux/store";
import { InventoryItemName } from "commonTypes";
import { connect } from "react-redux";
import Store from "./store";
import { buyInventoryItem } from '@redux/playerReducer'

type StoreOwnProps = {
    closeLocationMapWindow: () => void
}

const mapStateToProps = (state: AppStateType, ownProps: StoreOwnProps) => ({
    currencyImg: state.location.currencyImg,
    inventory: state.player.inventory,
    coins: state.player.coins,
    closeLocationMapWindow: ownProps.closeLocationMapWindow,
})

type DispatchPropsType = {
    buyInventoryItem: (itemName: InventoryItemName, cost: number) => void
}

export type StoreProps = ReturnType<typeof mapStateToProps> & DispatchPropsType

export default connect(mapStateToProps, { buyInventoryItem })(Store)