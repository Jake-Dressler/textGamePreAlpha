import { Player } from "../entities/player";
import { forest } from "../world/location";
import { getCurrentLocation, getItemList, useEnergy } from "../engine/gameState";


export function chopTree(player, location){
    if(location.type != "forest") return false;
    if(!player.hasAxe()) return false;
    if(!player.useEnergy(getTreeChopEnergy())) return false;

    let log = getItemList().find(item => item.name == "log");
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