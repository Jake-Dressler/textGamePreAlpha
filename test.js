import { town, forest } from "./src/world/location.js";
import { generateTowns, saveWorldToFile, createConnections, generateWorld } from "./src/world/worldGen.js"
//import { gameState } from "./src/engine/gameState.js";
import { getCurrentLocation, setCurrentLocation, getGameTime, advanceTime, getWorld, setWorld, setMapType, getMapType, getMapDepth, getMapScale, getPlayer, generateMetalList, getMetalList, getItemList } from './src/engine/gameState.js';
import { drawLocationBaseMenu } from "./src/ui/locationMenus.js";
import { drawPlayerBaseMenu } from "./src/ui/playerMenus.js";
import { drawLocationMap, drawLocationMapSimple, setMapButtons } from "./src/ui/worldMap.js";
import { Player } from "./src/entities/player.js"
import { drawClock } from "./src/ui/drawClock.js"
import { NPC } from "./src/entities/npc.js"
import { battleScene } from "./src/engine/battleScene.js";
import { Metal } from './src/entities/metal.js'
import { Item, Tool } from './src/entities/item.js'
//import { travelTo } from "./src/engine/navigation.js";


// generate the world's metals
generateMetalList(10);

// create player and world
// var player = new Player("test");
setWorld(generateWorld(10,10,10));
setCurrentLocation(getWorld()[0]);



//console.log(getMetalList());
let testAxe = new Tool(getMetalList()[0], "axe", null);
let testPick = new Tool(getMetalList()[0], "pick", null)
getPlayer().addItem(testAxe);
getPlayer().addItem(testPick);
console.log(getPlayer().inventory);

// TODO: find a way to set intial to visited
// getCurrentLocation().visited = true; 



// display menus
drawLocationBaseMenu(getCurrentLocation());
console.log(getCurrentLocation());

//console.log(getCurrentLocation());
drawPlayerBaseMenu(getPlayer());

// display map and map buttons
drawLocationMap(getCurrentLocation(), getMapDepth(), getMapScale());
setMapButtons();
// draw clock
drawClock();

// var testLog = new Item();
// testLog.name = "log";
// testLog.description = "A log cut from a tree";
// testLog.price = 10;
// testLog.weight = 15;
// console.log(testLog.toObject());




