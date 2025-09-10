import { getCurrentLocation, setCurrentLocation, getGameTime, advanceTime, getWorld, getMapType, getMapDepth, getMapScale, getPlayerEnergy, useEnergy, getPlayer } from './gameState.js';
import { drawLocationBaseMenu } from "../ui/locationMenus.js";
import { drawLocationMap, drawLocationMapSimple } from "../ui/worldMap.js";
import { updateClock } from '../ui/drawClock.js';
import { getTimeToTravel } from "../utils/timeToTravel.js";
import { drawPlayerBaseMenu } from '../ui/playerMenus.js';
import { drawBattleScene } from "../ui/drawBattleScene.js";
import { NPC } from "../entities/npc.js";

export async function travelTo(nextLocation) {
    let currentLocation = getCurrentLocation();
    if (!currentLocation.connections){ console.log("WARNING: location has no connections"); return;}
    if (Object.keys(currentLocation.connections).includes(nextLocation)) {

        // Find the next location object in the towns array
        let nextLocObj = getWorld().find(loc => loc.name === nextLocation);
        if (nextLocObj) {
            // calculate distance and add to clock time
            advanceTime(getTimeToTravel(currentLocation, nextLocObj));
            updateClock();

            // mark location as visited
            nextLocObj.visited = true;

            // update player energy before updating location
            useEnergy(getTravelEnergyUse(currentLocation.connections[nextLocation]));
            drawPlayerBaseMenu(getPlayer());

            // Update the current location
            setCurrentLocation(nextLocObj);

            drawLocationBaseMenu(getCurrentLocation());
            let mapView = getMapType();

            if (mapView == "simple") drawLocationMapSimple(getCurrentLocation(),  getMapDepth(), getMapScale());
            else drawLocationMap(getCurrentLocation(), getMapDepth(), getMapScale());

        } else {
            console.log("ERROR: Next location not found in the towns array.");
        }
    } else {
        console.log("You can't travel there directly.");
    }
}

// calculate energy use by distance, 
function getTravelEnergyUse(dist){
    return Math.ceil(dist / 6);
}

// Call this after player moves to a new location
function checkForRandomEncounter() {
    const encounterChance = 0.2; // 20% chance
    if (Math.random() < encounterChance) {
        // Generate a random NPC for the encounter
        const randomEnemy = new NPC("Wild Beast", 1 + Math.floor(Math.random() * 10), 10, 10, 10, 5, 5, 5, []);
        //drawBattleScene(randomEnemy);
        return true;
    }
    return false;
}