import { Player } from "../entities/player.js";
import { forest } from "../world/location.js";
import { getCurrentLocation, getItemList, getPlayer, useEnergy } from "../engine/gameState.js";
import { drawPlayerBaseMenu } from "../ui/playerMenus.js";


export function chopTree(player, location){

    // let player = getPlayer();
    // let location = getCurrentLocation();

    if(location.type != "FOREST") return false;
    if(!player.hasAxe()) return false;
    if(!player.useEnergy(getTreeChopEnergy())) return false;

    let log = getItemList()['log'];
    for (let i = 0; i < getNumLogs(location); i++){
        player.addItem(log);
    }
    player.gainExperience(10);
    drawPlayerBaseMenu(getPlayer());
    return true;
}
// TODO: this could be based on tree height or width
function getTreeChopEnergy(){
    return 30;
}
function getNumLogs(forest){
    return 3;
}
// forest rest
// TODO: reconsider debuff to rest rate
// TODO: add encounter chance
export function forestRest(time){
    let player = getPlayer();
    if(player.energy > player.maxEnergy / 2) return false;
    player.energy += player.restRate * time * 0.5;
    if(player.energy > player.maxEnergy / 2) player.energy = Math.floor(player.maxEnergy / 2);
    //add encounter change
    drawPlayerBaseMenu(getPlayer());
}