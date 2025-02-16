import { Player } from "../entities/player.js";
import { forest } from "../world/location.js";
import { getCurrentLocation, getItemList, getPlayer, useEnergy } from "../engine/gameState.js";


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
    return true;
}
// TODO: this could be based on tree height or width
function getTreeChopEnergy(){
    return 30;
}
function getNumLogs(forest){
    return 3;
}