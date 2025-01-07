import { battleScene } from "../engine/battleScene.js";
import { getCurrentLocation } from "../engine/gameState.js";
import { displayLocationBaseMenu } from "./locationMenus.js";

export async function drawBattleScene(npc) {
    const battle = new battleScene(npc);

    while (!battle.isOver) {
        console.log("changed")
        // Clear the center div for each turn
        const centerDiv = document.getElementById("center-content");
        centerDiv.innerHTML = "";

        // Display player and enemy health
        const health = document.createElement("p");
        health.innerHTML = `${battle.player.name} HP: ${battle.player.health}<br>${npc.name} HP: ${battle.enemy.health}`;
        centerDiv.appendChild(health);

        // Create and append action links
        const actions = ["Attack", "Defend", "Use an Item", "Flee"];
        const actionPromises = actions.map(action => createActionLink(centerDiv, action));

        // Wait for the player's choice
        const playerChoice = await Promise.race(actionPromises);

        // Process the player's turn based on their choice
        battle.playTurn(playerChoice.toLowerCase());

        // Check if battle conditions are met
        if (battle.enemyDies()) continue;
        if (battle.playerDies()) continue;
    }

    // Call post-battle scene logic
    drawPostBattleScene(battle.playerWins);
}

// Helper function to create a link for an action and return a Promise that resolves when clicked
function createActionLink(parent, actionText) {
    return new Promise(resolve => {
        const actionLink = document.createElement("a");
        actionLink.href = "#";
        actionLink.textContent = actionText;
        actionLink.style.display = "block"; // Add spacing for readability
        actionLink.addEventListener("click", (e) => {
            e.preventDefault();
            resolve(actionText);
        });
        parent.appendChild(actionLink);
    });
}


function drawPostBattleScene(playerWins){
    let centerDiv = document.getElementById("center-content");
    centerDiv.innerHTML = "";
    // TODO: add winning and losing logic
    if(playerWins){
        let message = document.createElement("p");
        let link    = document.createElement("a");

        message.textContent = "You won the battle";
        link.textContent = "Continue"

        link.addEventListener("click", () => displayLocationBaseMenu(getCurrentLocation()));

        centerDiv.appendChild(message);
        centerDiv.appendChild(link);
    }
    else{
        let message = document.createElement("p");
        let link    = document.createElement("a");

        message.textContent = "You lost the battle";
        link.textContent = "Continue"

        link.addEventListener("click", () => displayLocationBaseMenu(getCurrentLocation()));

        centerDiv.appendChild(message);
        centerDiv.appendChild(link);
    }
}