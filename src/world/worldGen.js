import { town, forest, mountain } from "./location.js"
import { Delaunay } from "https://cdn.jsdelivr.net/npm/d3@7/+esm"

// generate the world by creating locations and then connections
export function generateWorld(numTowns, numForests, numMountains){
    let world = []
    generateTowns(numTowns).forEach(t => world.push(t));
    generateForests(numForests).forEach(f => world.push(f));
    generateMountains(numMountains).forEach(m => world.push(m));
    world = createConnections(world);
    return world;
}
//creates a specified number of towns using generateTown(location.js) method 
export function generateTowns(numTowns){
    const towns = [];
    for (let i = 0; i < numTowns; i++) {
        let current = new town();
        current.generateTown();
        towns.push(current);
    }
    return towns;
}
//creates a specified number of forests using generateTown(location.js) method 
export function generateForests(numForests){
    const forests = [];
    for (let i = 0; i < numForests; i++) {
        let current = new forest();
        current.generateForest();
        forests.push(current);
    }
    return forests;
}
//creates a specified number of mountains using generateTown(location.js) method 
export function generateMountains(numMountains){
    const mountains = [];
    for (let i = 0; i < numMountains; i++) {
        let current = new mountain();
        current.generateMountain();
        mountains.push(current);
    }
    return mountains;
}
// TODO: add other location types
// TODO: change for seeded random
// create connections between loactions
export function createConnections(locations){
    // assign random x, y values for triangulation
    locations.forEach(location => {
        location.x = Math.random() * 1000; // Random x-coordinate
        location.y = Math.random() * 1000; // Random y-coordinate
    });

    // Extract points for Delaunay triangulation
    const points = locations.map(loc => [loc.x, loc.y]);

    // Create Delaunay triangulation
    const delaunay = Delaunay.from(points);

    // Map edges from the triangulation to location connections
    locations.forEach((location, index) => {
        // Get neighbors of the current location using delaunay.neighbors(i)
        const neighbors = delaunay.neighbors(index);

        neighbors.forEach(neighborIndex => {
            const neighborLocation = locations[neighborIndex];
            if (!Object.keys(location.connections).includes(neighborLocation.name)) {
                let keyL = neighborLocation.name;
                location.connections[keyL] = Math.floor(getDistance(location, neighborLocation));
            }
            if (!Object.keys(location.connections).includes(location.name)) {
                let keyN = location.name;
                neighborLocation.connections[keyN] = Math.floor(getDistance(location, neighborLocation));
            }
        });
    });
    return locations;
}

export function saveWorldToFile(filename, towns){
    // Create a JSON file and trigger a download in the browser
    // TODO: make this not bad | this forces a browser download
    const json = JSON.stringify(towns, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function getDistance(currentLoc, nextLoc) {
    return Math.sqrt((nextLoc.x - currentLoc.x) ** 2 + (nextLoc.y - currentLoc.y) ** 2);
}