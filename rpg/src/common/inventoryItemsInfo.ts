import { InventoryItemName } from "commonTypes";
import healingPotionImg from "assets/imgs/potions/healingPotionImg.jpg"
import freezingPotionImg from "assets/imgs/potions/freezingPotionImg.jpg"
import poisonPotionImg from "assets/imgs/potions/poisonPotionImg.jpg"
import { addedHealthPointsByHealthPotion, additionalDamageByPoison, durationOfFreezing, durationOfPoison } from "settings";

type ItemInfo = {
    img: string
    description: string
    cost: number
}
export const inventoryItemsInfo: Record<InventoryItemName, ItemInfo> = {
    'Healing potion': {
        img: healingPotionImg,
        description: `Restore ${addedHealthPointsByHealthPotion} health points`,
        cost: 2,
    },
    'Freezing potion': {
        img: freezingPotionImg,
        description: `Freeze the enemy for ${durationOfFreezing} him moves`,
        cost: 4,
    },
    'Poison potion': {
        img: poisonPotionImg,
        description: `Add ${additionalDamageByPoison} damage for ${durationOfPoison} your moves`,
        cost: 5,
    },
}