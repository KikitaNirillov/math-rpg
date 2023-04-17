import { FightInterfaceName } from '@redux/fightReducer';
import { inventoryItemsInfo } from 'common/inventoryItemsInfo';
import { InventoryItem, InventoryItemName } from 'commonTypes';
import TypeWriter from 'components/typeWriter/typeWriter';
import { useEffect, useState } from 'react';
import s from './inventoryInterface.module.scss'

type InventoryInterfaceProps = {
    inventory: Array<InventoryItem>
    setDisplayingFightInterface: (intefaceName: FightInterfaceName) => void
    employInventoryItem: (itemName: InventoryItemName) => void
}

const InventoryInterface: React.FC<InventoryInterfaceProps> = ({ setDisplayingFightInterface, employInventoryItem, ...props }) => {
    const [focusItem, setFocusItem] = useState<null | InventoryItemName>(null)

    if (props.inventory.length === 0) return (
        <div className={`${s.emptyInventoryInterface} arenaInterfaceContainer`}>
            <div className={s.emptyInventoryInterface__text}>
                <TypeWriter text='My inventory is empty...' whatToDoAtTheEnd={() => setTimeout(() => setDisplayingFightInterface('defaultInterface'), 700)} />
            </div>
        </div>
    )

    return (
        <div className={`${s.inventoryInterface} arenaInterfaceContainer`}>
            <div className={s.inventoryInterface__items}>
                {props.inventory.map(item =>
                    <button key={item.name} className={s.inventoryInterface__items_btn}
                        onMouseOver={() => setFocusItem(item.name)}
                        onMouseLeave={() => setFocusItem(null)}
                        onClick={() => {
                            employInventoryItem(item.name)
                            setDisplayingFightInterface('defaultInterface')
                        }}
                    >
                        <img src={inventoryItemsInfo[item.name].img} alt={item.name}
                            className={s.inventoryInterface__items_btn_img} />
                        <p className={s.inventoryInterface__items_btn_count}>{item.count}</p>
                    </button>
                )}
            </div>
            {!focusItem ?
                <button className={s.inventoryInterface__backBtn}
                    onClick={() => setDisplayingFightInterface('defaultInterface')}
                >
                    <p>Close Inventory</p>
                </button>
                : (
                    <p className={s.inventoryInterface__itemDescription}>
                        {inventoryItemsInfo[focusItem].description === '' ? <br />
                            : inventoryItemsInfo[focusItem].description}
                    </p>
                )
            }
        </div>
    )
}

export default InventoryInterface