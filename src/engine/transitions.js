function travelTo(nextLocation) {
    if (!currentLocation.connections){ console.log("WARNING: location has no connections"); return;}
    if (currentLocation.connections.includes(nextLocation)) {
        // Find the next location object in the towns array
        let nextLocObj = t.find(town => town.name === nextLocation);
        if (nextLocObj) {
            console.log(nextLocObj.toObject());

            // Update the current location
            currentLocation = nextLocObj;
            displayLocationBaseMenu(currentLocation);
        } else {
            console.log("ERROR: Next location not found in the towns array.");
        }
    } else {
        console.log("You can't travel there directly.");
    }
}