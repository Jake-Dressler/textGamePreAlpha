import { getPlayer } from "../engine/gameState.js";
import { drawPlayerBaseMenu } from "../ui/playerMenus.js";

export function rentRoom(inn){
    getPlayer().gold -= inn.roomPrice;
    inn.isRented = true;
}

export function innRest(inn, time){
    if(!inn.isRented) return; // should not be possible
    let rate = getPlayer().restRate;
    getPlayer().gainEnergy(rate * time);
    drawPlayerBaseMenu(getPlayer());
}