export function battleScene(player, enemy) {
    console.log("A wild " + enemy.name + " appears!");
    console.log("Battle Start!");

    let battleOver = false;

    while (!battleOver) {
        console.log("Your HP: " + player.health);
        console.log(enemy.name + " HP: " + enemy.health);

        // Player's turn
        let action = prompt("Choose your action: (1) Attack (2) Defend (3) Use Item (4) Flee");

        switch (action) {
            case "1":
                let playerDamage = Math.max(0, player.attack - enemy.defense);
                enemy.health -= playerDamage;
                console.log("You attack the " + enemy.name + " for " + playerDamage + " damage!");
                break;
            case "2":
                console.log("You defend, reducing incoming damage!");
                player.defending = true;
                break;
            case "3":
                console.log("You use an item!");
                // Implement item usage logic
                break;
            case "4":
                console.log("You fled the battle!");
                return; // Exit the battle
            default:
                console.log("Invalid action, try again.");
                continue;
        }

        // Check if enemy is defeated
        if (enemy.health <= 0) {
            console.log("You defeated the " + enemy.name + "!");
            battleOver = true;
            continue;
        }

        // Enemy's turn
        console.log("The " + enemy.name + " attacks!");
        let enemyDamage = Math.max(0, enemy.attack - (player.defending ? player.defense * 2 : player.defense));
        player.health -= enemyDamage;
        console.log("The " + enemy.name + " hits you for " + enemyDamage + " damage!");

        // Check if player is defeated
        if (player.health <= 0) {
            console.log("You were defeated by the " + enemy.name + "...");
            battleOver = true;
        }

        // Reset defense state
        player.defending = false;
    }
}
