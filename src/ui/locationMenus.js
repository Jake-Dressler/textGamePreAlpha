import { travelTo } from "../engine/navigation.js";
import { getTravelTimeString } from "../utils/timeToTravel.js"
import { drawBattleScene } from "./drawBattleScene.js";
import { NPC } from "../entities/npc.js";
import { chopTree } from "../utils/forestUtils.js";
import { getCurrentLocation, getPlayer } from "../engine/gameState.js";
import { drawPlayerBaseMenu } from "./playerMenus.js";

export function drawLocationBaseMenu(Location){

    var centerDiv = document.getElementById("center-content");
    centerDiv.innerHTML = "";

    var locationName = document.createElement("p");
    locationName.textContent = Location.name;
    centerDiv.appendChild(locationName);

    var locationDescription = document.createElement("p")
    locationDescription.textContent = Location.description;;
    centerDiv.appendChild(locationDescription);

    // Create links for connected locations
    var connectionsList = document.createElement("connections");
    connectionsList.innerHTML = ""; // Clear previous links

    Object.keys(Location.connections).forEach(connection => {
        const link = document.createElement("a");
        link.href = "#"; // Or use a proper routing system
        link.textContent = `${connection} (${getTravelTimeString(Location.connections[connection])})`;
        link.addEventListener("click", () => travelTo(connection));
        connectionsList.appendChild(link);

        // Add a line break after each connection link
        const lineBreak = document.createElement("br");
        connectionsList.appendChild(lineBreak);
    });
    centerDiv.appendChild(connectionsList);

    // ***********TEMPORARY FOR TESTING***********

    var testBattle = document.createElement("a");
    testBattle.textContent = "start a test battle";
    var testNpc = new NPC("testman", 2, 10, 7, 7, []);
    testBattle.addEventListener("click", () => drawBattleScene(testNpc));
    centerDiv.appendChild(testBattle);

    // *******************************************
    
    switch(Location.type){
        case("TOWN"):
            break;
        case("FOREST"):

            let lineBreak = document.createElement("br");
            centerDiv.appendChild(lineBreak);

            let chop = document.createElement("a");
            chop.href = "#"; // Or use a proper routing system
            chop.textContent = "Chop down a tree";
            chop.addEventListener("click", () => {
                chopTree(getPlayer(), getCurrentLocation());
                drawPlayerBaseMenu(getPlayer());
            });
            centerDiv.appendChild(chop); 

            centerDiv.appendChild(lineBreak);
            

            break;
        default:
            console.log("ERROR: invalid Location type");
    }
}