import { battleScene } from "../engine/battleScene.js";
import { getCurrentLocation, getPlayer } from "../engine/gameState.js";
import { drawLocationBaseMenu } from "./locationMenus.js";
import { drawPlayerBaseMenu } from "./playerMenus.js";

export async function drawBattleScene(npc) {
    const battle = new battleScene(npc);

    while (!battle.isOver()) {
        await updateScene(battle);
    }

    drawPostBattleScene(battle.player.health > 0);
}

function updateScene(battle) {
    return new Promise((resolve) => {
        // Display player and enemy health
        let centerDiv = document.getElementById("center-content");
        centerDiv.innerHTML = "";
        let health = document.createElement("p");
        health.innerHTML = `${battle.player.name} HP: ${battle.player.health}<br>${battle.enemy.name} HP: ${battle.enemy.health}`;
        centerDiv.appendChild(health);

        // Create elements for links
        let attack = document.createElement("a");
        let defend = document.createElement("a");
        let useItem = document.createElement("a");
        let flee = document.createElement("a");

        // Set text for elements
        attack.textContent = "Attack";
        defend.textContent = "Defend";
        useItem.textContent = "Use an Item";
        flee.textContent = "Flee";

        // Add event listeners for link clicks
        const handleAction = (action) => {
            battle.playTurn(action);
            resolve();
        };

        attack.addEventListener("click", () => handleAction("attack"));
        defend.addEventListener("click", () => handleAction("defend"));
        useItem.addEventListener("click", () => handleAction("item"));
        flee.addEventListener("click", () => handleAction("flee"));

        // Add links and line breaks to the div
        centerDiv.appendChild(attack);
        centerDiv.appendChild(document.createElement("br"));
        centerDiv.appendChild(defend);
        centerDiv.appendChild(document.createElement("br"));
        centerDiv.appendChild(useItem);
        centerDiv.appendChild(document.createElement("br"));
        centerDiv.appendChild(flee);
    });
}

function drawPostBattleScene(playerWins) {
    let centerDiv = document.getElementById("center-content");
    centerDiv.innerHTML = "";

    let message = document.createElement("p");
    let link = document.createElement("a");

    if (playerWins) {
        message.textContent = "You won the battle";
    } else {
        message.textContent = "You lost the battle";
    }

    link.textContent = "Continue";
    link.addEventListener("click", () =>{
        drawPlayerBaseMenu(getPlayer()); 
        drawLocationBaseMenu(getCurrentLocation())
    });

    centerDiv.appendChild(message);
    centerDiv.appendChild(link);
}
