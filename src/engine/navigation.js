import { getCurrentLocation, setCurrentLocation, getGameTime, advanceTime, getWorld, getMapType, getMapDepth, getMapScale, getPlayerEnergy, useEnergy, getPlayer } from './gameState.js';
import { drawLocationBaseMenu } from "../ui/locationMenus.js";
import { drawLocationMap, drawLocationMapSimple } from "../ui/worldMap.js";
import { updateClock } from '../ui/drawClock.js';
import { getTimeToTravel } from "../utils/timeToTravel.js";
import { drawPlayerBaseMenu } from '../ui/playerMenus.js';

export function travelTo(nextLocation) {
    let currentLocation = getCurrentLocation();
    if (!currentLocation.connections){ console.log("WARNING: location has no connections"); return;} // This should not be possible unless delaunay fails
    //if (getPlayerEnergy() < COSTofTRAVEL){};   ADD ENERGY CHECK LATER
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