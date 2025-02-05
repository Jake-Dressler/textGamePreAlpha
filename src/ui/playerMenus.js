import { getCurrentLocation, getPlayer } from "../engine/gameState.js";
import { drawLocationBaseMenu } from "./locationMenus.js";

export function drawPlayerBaseMenu(player){

    const parent = document.getElementById("playerMenu");
    parent.innerHTML = "";

    // Create text divs
    const playerName = document.createElement("div");
    const playerExp = document.createElement("div");
    const playerHealth = document.createElement("div");
    const playerGold = document.createElement("div");
    const playerLevel = document.createElement("div");
    const playerEnergy = document.createElement("div");

    // Add text to the divs
    playerName.textContent = player.name;
    playerHealth.textContent = `HP: ${player.health} / ${player.maxHealth}`;
    playerExp.textContent = `EXP: ${player.experience} / ${player.experienceToLevelUp}`;
    playerGold.textContent = `Gold: ${player.gold}`;
    playerLevel.textContent = `LVL: ${player.level}`;
    playerEnergy.textContent = `Energy: ${player.energy} / ${player.maxEnergy}`

    parent.appendChild(playerName);
    parent.appendChild(playerHealth);
    parent.appendChild(playerExp);
    parent.appendChild(playerGold);
    parent.appendChild(playerLevel);
    parent.appendChild(playerEnergy);

    const inv = document.createElement("a");
    inv.href = "#"; // Or use a proper routing system
    inv.textContent = "Open inventory";
    inv.addEventListener("click", () => drawInventory());
    parent.appendChild(inv);    
}

function drawInventory(){

    if(!getPlayer().inventory){
        alert("inventory empty");
        return;
    }

    // console.log(getPlayer().inventory);

    let centerDiv = document.getElementById("center-content");
    centerDiv.innerHTML = "";

    let inv = document.createElement("a");
    inv.href = "#";
    inv.textContent = "Exit inventory";
    inv.addEventListener("click", () => drawLocationBaseMenu(getCurrentLocation()));
    centerDiv.appendChild(inv); 

    getPlayer().inventory.forEach(item => {
        let i = document.createElement("p");
        i.textContent = item.name;
        centerDiv.appendChild(i);
    });
}