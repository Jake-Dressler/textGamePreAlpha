export function displayPlayerBaseMenu(player){

    const parent = document.getElementById("playerMenu");
    parent.innerHTML = "";

    // Create text divs
    const playerName = document.createElement("div");
    const playerHealth = document.createElement("div");
    const playerGold = document.createElement("div");
    const playerLevel = document.createElement("div");
    const playerEnergy = document.createElement("div");

    // Add text to the divs
    playerName.textContent = player.name;
    playerHealth.textContent = `hp: ${player.health} / ${player.maxHealth}`;
    playerGold.textContent = `gold: ${player.gold}`;
    playerLevel.textContent = `lvl: ${player.level}`;
    playerEnergy.textContent = `energy: ${player.energy} / ${player.maxEnergy}`

    parent.appendChild(playerName);
    parent.appendChild(playerHealth);
    parent.appendChild(playerGold);
    parent.appendChild(playerLevel);
    parent.appendChild(playerEnergy);
}