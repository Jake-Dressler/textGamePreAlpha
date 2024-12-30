import { town, forest } from "./src/world/location.js";
import { generateTowns, saveTownsToFile, createConnections, generateWorld } from "./src/world/worldGen.js"
//import { gameState } from "./src/engine/gameState.js";
import { getCurrentLocation, setCurrentLocation, getGameTime, advanceTime, getWorld, setWorld } from './src/engine/gameState.js';
import { displayLocationBaseMenu } from "./src/ui/locationMenus.js";
import { displayPlayerBaseMenu } from "./src/ui/playerMenus.js";
import { drawLocationMap } from "./src/ui/locationMap.js";
import { Player } from "./src/entities/player.js"
//import { travelTo } from "./src/engine/navigation.js";

// create player and world
var player = new Player("test");
setWorld(generateWorld(50,50));
setCurrentLocation(getWorld()[0]);

// TODO: find a way to set intial to visited
// getCurrentLocation().visited = true; 

// display menus
displayLocationBaseMenu(getCurrentLocation());
console.log(getCurrentLocation());
displayPlayerBaseMenu(player);

drawLocationMap(getCurrentLocation(), 1);


