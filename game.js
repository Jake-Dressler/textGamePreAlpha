import { town, forest } from "./src/world/location.js";
import { generateTowns, saveTownsToFile, createConnections, generateWorld } from "./src/world/worldGen.js"
//import { gameState } from "./src/engine/gameState.js";
import { getCurrentLocation, setCurrentLocation, getGameTime, advanceTime, getWorld, setWorld } from './src/engine/gameState.js';
import { displayLocationBaseMenu } from "./src/ui/locationMenus.js";
import { displayPlayerBaseMenu } from "./src/ui/playerMenus.js";
import { Player } from "./src/entities/player.js"
//import { travelTo } from "./src/engine/navigation.js";


//displayLocationBaseMenu(testTown);
//const filePath = "./testWorld"
//saveTownsToFile(filePath, generateTowns(5));
// var t = generateTowns(10);
// createConnections(t);
// var currentLocation = t[0];

// var testForest = new forest();
// testForest.generateForest();
var player = new Player("test");

setWorld(generateWorld(10,10));
setCurrentLocation(getWorld()[0]);
displayLocationBaseMenu(getCurrentLocation());
displayPlayerBaseMenu(player);


