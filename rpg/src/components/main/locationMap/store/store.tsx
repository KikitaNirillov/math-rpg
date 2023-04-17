import { inventoryItemsInfo } from 'common/inventoryItemsInfo';
import { InventoryItemName } from 'commonTypes';
import { useState } from 'react';
import s from './store.module.scss'
import { StoreProps } from './storeContainer';

const Store: React.FC<StoreProps> = ({ closeLocationMapWindow, buyInventoryItem, ...props }) => {
    const [focusItem, setFocusItem] = useState<null | InventoryItemName | 'noMoneyForBuy'>(null)
    return (
        <div className={`${s.store} locationMapWindow`}>
            <p>Store:</p>
            <div className={s.store__purchase}>
                <div className={s.store__purchase_itemsList}>
                    {
                        Object.keys(inventoryItemsInfo).map(itemName =>
                            <button key={itemName}
                                className={s.store__purchase_itemsList_btn}
                                onMouseOver={() => setFocusItem(itemName as keyof typeof inventoryItemsInfo)}
                                onMouseLeave={() => setFocusItem(null)}
                                onClick={() => {
                                    if (props.coins < inventoryItemsInfo[itemName as keyof typeof inventoryItemsInfo].cost)
                                        setFocusItem('noMoneyForBuy')
                                    else buyInventoryItem(itemName as keyof typeof inventoryItemsInfo, inventoryItemsInfo[itemName as keyof typeof inventoryItemsInfo].cost)

                                }}
                            >
                                <img className={s.store__purchase_itemsList_btn_img} alt={itemName}
                                    src={inventoryItemsInfo[itemName as keyof typeof inventoryItemsInfo].img}
                                />
                                <div className={s.store__purchase_itemsList_btn_cost}>
                                    <p className={s.store__purchase_itemsList_btn_cost_count}>
                                        {inventoryItemsInfo[itemName as keyof typeof inventoryItemsInfo].cost}
                                    </p>
                                    <img src={props.currencyImg} className={s.store__purchase_itemsList_btn_cost_currency} alt='currency on this location' /> {/*current currency*/}
                                </div>
                            </button>
                        )
                    }
                </div>
                <p className={s.store__purchase_text}>
                    {focusItem ?
                        (focusItem !== 'noMoneyForBuy' ?
                            inventoryItemsInfo[focusItem].description === '' ? <br />
                                : inventoryItemsInfo[focusItem].description
                            : 'No money...'
                        )
                        : '⇡ Click to buy ⇡'
                    }
                </p>
            </div>
            <div className={s.store__inventory}>
                <p className={s.store__inventory_title}>
                    Your inventory:
                </p>
                <div className={s.store__inventory_itemsList}>
                    {props.inventory.length === 0 ? <p>It's empty here...</p> :
                        props.inventory.map(item =>
                            <div key={item.name} className={s.store__inventory_itemsList_item}>
                                <img className={s.store__inventory_itemsList_item_img} alt={item.name}
                                    src={inventoryItemsInfo[item.name].img} />
                                <p className={s.store__inventory_itemsList_item_count}>{item.count}</p>
                            </div>
                        )}
                </div>
            </div>
            <button className={s.store__leaveBtn} onClick={() => closeLocationMapWindow()}>
                Leave store
            </button>
        </div>
    )
}

export default Store;