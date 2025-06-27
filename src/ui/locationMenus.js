import { travelTo } from "../engine/navigation.js";
import { getTravelTimeString } from "../utils/timeToTravel.js"
import { drawBattleScene } from "./drawBattleScene.js";
import { NPC } from "../entities/npc.js";
import { chopTree, forestRest } from "../utils/forestUtils.js";
import { getCurrentLocation, getPlayer } from "../engine/gameState.js";
import { drawPlayerBaseMenu } from "./playerMenus.js";
import { drawBuildingBaseMenu } from "./buildingMenus.js";
import { drawCaveBaseMenu } from "./caveMenus.js";

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
        let link = document.createElement("a");
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
    var testNpc = new NPC("testman", 2, 10, 10, 10, 10, 10, 10, []);
    testBattle.addEventListener("click", () => drawBattleScene(testNpc));
    centerDiv.appendChild(testBattle);

    // *******************************************
    
    switch(Location.type){
        case("TOWN"):

            Location.buildings.forEach(building => {
                let link = document.createElement("a");
                link.href = "#"; // Or use a proper routing system
                link.textContent = building.name;
                link.addEventListener("click", () => drawBuildingBaseMenu(building));
                connectionsList.appendChild(link);
                // Add a line break after each connection link
                const lineBreak = document.createElement("br");
                connectionsList.appendChild(lineBreak);
            });

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

            let rest = document.createElement("a");
            rest.href = "#";
            rest.textContent = "take a rest";
            rest.addEventListener( "click", () => drawForestRestMenus(Location));
            centerDiv.appendChild(rest);
            
            break;
        case("MOUNTAIN"):

            Location.caves.forEach(c => {
                let link = document.createElement("a");
                link.href = "#"; // Or use a proper routing system
                link.textContent = "Enter the cave";
                link.addEventListener("click", () => drawCaveBaseMenu(c));
                connectionsList.appendChild(link);

                // Add a line break after each connection link
                const lineBreak = document.createElement("br");
                connectionsList.appendChild(lineBreak);
            })

            break;
        default:
            console.log("ERROR: invalid Location type");
    }
}

function drawForestRestMenus(forest){

    var centerDiv = document.getElementById("center-content");
    centerDiv.innerHTML = "";

    let back = document.createElement("a");
    back.href = "#";
    back.textContent = "Back";
    back.addEventListener("click", () => drawLocationBaseMenu(forest));
    centerDiv.appendChild(back);

    for(let i = 1; i < 9; i++){
            let rest = document.createElement("a");
            rest.href = "#";
            rest.textContent = `Rest ${i}:00`;
            rest.addEventListener("click", () => forestRest(i));
            centerDiv.appendChild(rest);
            centerDiv.appendChild(document.createElement("br"));
        }
}