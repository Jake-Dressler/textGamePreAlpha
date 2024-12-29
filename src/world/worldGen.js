import { town, forest } from "./location.js"
//const { Delaunay } = require("d3-delaunay");
import { Delaunay } from "https://cdn.jsdelivr.net/npm/d3@7/+esm"
// TODO: remove exports for everything except generate world

// generate the world by creating locations and then connections
export function generateWorld(numTowns, numForests){
    let world = []
    generateTowns(numTowns).forEach(t => world.push(t));
    generateForests(numForests).forEach(f => world.push(f));
    //console.log(world);
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

// TODO: add other location types
// TODO: change for seeded random
// TODO: gaurentee reachable nodes
// create connections between loactions
export function createConnections(locations){
    // Temporarily assign random x, y values for triangulation
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
            if (!location.connections.includes(neighborLocation.name)) {
                location.connections.push(neighborLocation.name);
            }
            if (!neighborLocation.connections.includes(location.name)) {
                neighborLocation.connections.push(location.name);
            }
        });
    });
    // Remove the temporary x and y properties
    locations.forEach(location => {
        delete location.x;
        delete location.y;
    });
    return locations;
}

export function saveTownsToFile(filename, towns){
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