export function displayPlayerBaseMenu(player){

    document.getElementById("playerName").textContent = player.name;
    document.getElementById("playerHealth").textContent = `${player.health} / ${player.maxHealth}`;
    
}