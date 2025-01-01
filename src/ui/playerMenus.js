export function displayPlayerBaseMenu(player){

    const parent = document.getElementById("playerMenu");

    // Create text divs
    const playerName = document.createElement("div");
    const playerHealth = document.createElement("div");
    const playerGold = document.createElement("div");
    const playerLevel = document.createElement("div");

    // Add text to the divs
    playerName.textContent = player.name;
    playerHealth.textContent = `hp: ${player.health} / ${player.maxHealth}`;
    playerGold.textContent = `gold: ${player.gold}`;
    playerLevel.textContent = `lvl: ${player.level}`;

    parent.appendChild(playerName);
    parent.appendChild(playerHealth);
    parent.appendChild(playerGold);
    parent.appendChild(playerLevel);
}