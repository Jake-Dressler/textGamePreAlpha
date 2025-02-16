import { Building, Shop } from "../entities/building.js";
import { getPlayer } from "../engine/gameState.js";

export function buyFromShop(shop, index){
    let item = shop.items.pop(index);
    let price = item.price;

    getPlayer().gold -= price;
    shop.gold += price;

    getPlayer().addItem(item);
}

export function sellToShop(shop, index){

    let item = getPlayer().inventory.pop(index);
    let price = item.price;

    getPlayer().gold += price;
    shop.gold -= price;

    shop.items.push(item);
}