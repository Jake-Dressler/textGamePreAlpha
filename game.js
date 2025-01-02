import { town, forest } from "./src/world/location.js";
import { generateTowns, saveWorldToFile, createConnections, generateWorld } from "./src/world/worldGen.js"
//import { gameState } from "./src/engine/gameState.js";
import { getCurrentLocation, setCurrentLocation, getGameTime, advanceTime, getWorld, setWorld, setMapType, getMapType, getMapDepth, getMapScale } from './src/engine/gameState.js';
import { displayLocationBaseMenu } from "./src/ui/locationMenus.js";
import { displayPlayerBaseMenu } from "./src/ui/playerMenus.js";
import { drawLocationMap, drawLocationMapSimple, setMapButtons } from "./src/ui/worldMap.js";
import { Player } from "./src/entities/player.js"
import { drawClock } from "./src/ui/drawClock.js"
//import { travelTo } from "./src/engine/navigation.js";

// create player and world
var player = new Player("test");
setWorld(generateWorld(20,30));
setCurrentLocation(getWorld()[0]);

// TODO: find a way to set intial to visited
// getCurrentLocation().visited = true; 

// display menus
displayLocationBaseMenu(getCurrentLocation());
console.log(getCurrentLocation());
displayPlayerBaseMenu(player);

// display map and map buttons
drawLocationMap(getCurrentLocation(), getMapDepth(), getMapScale());
setMapButtons();

// draw clock
drawClock();



