import { getCurrentLocation, setCurrentLocation, getGameTime, advanceTime, getWorld, getMapType, getMapDepth, getMapScale } from './gameState.js';
import { displayLocationBaseMenu } from "../ui/locationMenus.js";
import { drawLocationMap, drawLocationMapSimple } from "../ui/worldMap.js";
import { updateClock } from '../ui/drawClock.js';

export function travelTo(nextLocation) {
    let currentLocation = getCurrentLocation();
    if (!currentLocation.connections){ console.log("WARNING: location has no connections"); return;}
    if (currentLocation.connections.includes(nextLocation)) {
        // Find the next location object in the towns array
        let nextLocObj = getWorld().find(loc => loc.name === nextLocation);
        if (nextLocObj) {
            // calculate distance and add to clock time
            advanceTime(calcTimeToTravel(currentLocation, nextLocObj));
            updateClock();

            // mark location as visited
            nextLocObj.visited = true;

            // Update the current location
            setCurrentLocation(nextLocObj);
            displayLocationBaseMenu(getCurrentLocation());
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

function calcDistance(currentLoc, nextLoc) {
    return Math.sqrt((nextLoc.x - currentLoc.x) ** 2 + (nextLoc.y - currentLoc.y) ** 2);
}
function calcTimeToTravel(currentLoc, nextLoc){
    return 10 + Math.floor(calcDistance(currentLoc, nextLoc));
}