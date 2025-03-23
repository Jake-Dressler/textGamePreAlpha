import { getCurrentLocation } from "../engine/gameState.js";
import { drawLocationBaseMenu } from "./locationMenus.js";
import { drawPlayerBaseMenu } from "./playerMenus.js";



export function drawCaveBaseMenu(cave){

    var centerDiv = document.getElementById("center-content");
    centerDiv.innerHTML = "";

    let exit = document.createElement("a");
    exit.href = "#";
    exit.textContent = "Leave the cave";
    exit.addEventListener("click", () => drawLocationBaseMenu(getCurrentLocation()));
    centerDiv.appendChild(exit); 

    let descend = document.createElement("a");
    descend.href = "#";
    descend.textContent = "Go deeper";
    descend.addEventListener("click", () => drawCaveSection(cave, 0));
    centerDiv.appendChild(descend);
}
function drawCaveSection(cave, depth){

    var centerDiv = document.getElementById("center-content");
    centerDiv.innerHTML = "";

    let ascend = document.createElement("a");
    ascend.href = "#";
    ascend.textContent = "Go Back";
    if(depth == 0) ascend.addEventListener("click", () => drawCaveBaseMenu(cave));
    else ascend.addEventListener("click", () => drawCaveSection(cave, depth - 1));
    centerDiv.appendChild(ascend);

    let descend = document.createElement("a");
    descend.href = "#";
    descend.textContent = "Go deeper";
    descend.addEventListener("click", () => drawCaveSection(cave, depth + 1));
    centerDiv.appendChild(descend);


    let mine = document.createElement("a");
    mine.href = "#"; // Or use a proper routing system
    mine.textContent = "Mine a vein";
    mine.addEventListener("click", () => {
        // ADD MINING ADD MINING ADD MINING ADD MINING ADD MINING ADD MINING ADD MINING ADD MINING ADD MINING ADD MINING ADD MINING ADD MINING 
        //drawPlayerBaseMenu(getPlayer());
    });
    centerDiv.appendChild(mine); 

}