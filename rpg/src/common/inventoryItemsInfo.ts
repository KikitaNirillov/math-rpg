import { InventoryItemName } from "commonTypes";
import healingPotionImg from "assets/imgs/potions/healingPotionImg.png"
import freezingPotionImg from "assets/imgs/potions/freezingPotionImg.png"
import poisonPotionImg from "assets/imgs/potions/poisonPotionImg.png"
import settings from "settings";

type ItemInfo = {
    img: string
    description: string
    cost: number
}
export const inventoryItemsInfo: Record<InventoryItemName, ItemInfo> = {
    'Healing potion': {
        img: healingPotionImg,
        description: `Restore ${settings.addedHealthPointsByHealthPotion} health points`,
        cost: 2,
    },
    'Freezing potion': {
        img: freezingPotionImg,
        description: `Freeze the enemy for ${settings.durationOfFreezing} him moves`,
        cost: 4,
    },
    'Poison potion': {
        img: poisonPotionImg,
        description: `Add ${settings.additionalDamageByPoison} damage for ${settings.durationOfPoison} your moves`,
        cost: 5,
    },
}