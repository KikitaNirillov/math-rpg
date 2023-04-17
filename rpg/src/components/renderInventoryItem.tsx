import { InventoryItem } from "commonTypes"
import { inventoryItemsInfo } from "common/inventoryItemsInfo"

type InventoryItemProps = {
    item: InventoryItem,
}
const RenderInventoryItem: React.FC<InventoryItemProps> = ({ item }) => {
    return (
        <button>
            <img src={inventoryItemsInfo[item.name].img} alt={item.name} />
        </button>
    )
}

export default RenderInventoryItem