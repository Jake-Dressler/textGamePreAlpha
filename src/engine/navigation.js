import { getCurrentLocation, setCurrentLocation, getGameTime, advanceTime, getWorld } from './gameState.js';
import { displayLocationBaseMenu } from "../ui/locationMenus.js";
import { drawLocationMap } from "../ui/locationMap.js";

export function travelTo(nextLocation) {
    let currentLocation = getCurrentLocation();
    if (!currentLocation.connections){ console.log("WARNING: location has no connections"); return;}
    if (currentLocation.connections.includes(nextLocation)) {
        // Find the next location object in the towns array
        let nextLocObj = getWorld().find(loc => loc.name === nextLocation);
        if (nextLocObj) {
            // mark location as visited
            nextLocObj.visited = true;
            // Update the current location
            setCurrentLocation(nextLocObj);
            displayLocationBaseMenu(getCurrentLocation());
            drawLocationMap(getCurrentLocation(), 2);
        } else {
            console.log("ERROR: Next location not found in the towns array.");
        }
    } else {
        console.log("You can't travel there directly.");
    }
}