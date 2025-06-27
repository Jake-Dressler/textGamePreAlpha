import { getPlayer } from "./gameState.js";

export class battleScene {

    //player = getPlayer();

    battleOver;
    playerWin;
    player;
    enemy;
    turnCount;
    playerTook;
    enemyTook;
    expGain;
    fleeAttempted;

    constructor(enemy) {
        this.player = getPlayer();
        this.enemy = enemy;
        this.battleOver = false;
        this.playerWin = true;
        this.turnCount = 0;
        this.expGain = 0;
    }

    playTurn(action) {
        this.fleeAttempted = false; // Reset at the start of each turn
        // get player action and then check if player wins
        this.playerAction(action);
        this.turnCount += 1;
        if (this.enemyDies()) {
            this.playerWin = true;
            this.battleOver = true;
            this.postBattleUpdates();
            return;
        }

        // get enemy action and then check if player loses
        this.getEnemyAction();
        if (this.playerDies()) {
            this.playerWin = false;
            this.battleOver = true;
            this.postBattleUpdates();
        }
        return;
    }

    isOver() {
        return this.battleOver;
    }

    playerAction(action) {
        switch (action) {
            case "attack":
                // Use RPG stats for attack/damage calculation
                let damage = this.player.attackEnemy(this.enemy);
                this.enemyTook = damage;
                break;
            case "defend":
                // Example: Increase defense for this turn using dexterity/constitution
                this.player.defending = true;
                break;
            case "item":
                alert("item not implemented yet");
                break;
            case "flee":
                this.fleeAttempted = true;
                if (getFleeSuccess(this.player, this.enemy)) {
                    //console.log("You successfully fled the battle!");
                    this.battleOver = true;
                    this.playerWin = false;
                }
                break;
            default:
                console.log("Invalid battle action");
                break;
        }
    }

    getEnemyAction() {
        // Use RPG stats for enemy attack/damage calculation
        let damage = this.enemy.attackEnemy(this.player);
        this.playerTook = damage;
        return "attack";
    }

    playerDies() {
        if (this.player.health <= 0) {
            this.battleOver = true;
            return true;
        }
        return false;
    }
    enemyDies() {
        if (this.enemy.health <= 0) {
            this.battleOver = true;
            return true;
        }
        return false;
    }
    postBattleUpdates() {
        if (!this.isOver()) {
            console.log("ERROR: post battle updates called before battle is over");
            return;
        }
        if (this.playerWin) {
            let gain = this.getExpGain();
            this.expGain = gain;
            this.player.gainExperience(gain);
        }
    }
    getExpGain() {
        // Example: reward based on enemy level and stats
        return this.enemy.level * 10 + (this.enemy.strength || 0) + (this.enemy.constitution || 0);
    }
}

function getFleeChance(player, enemy) {
    // Example: Calculate flee chance based on player dexterity vs enemy level
    let rawChance = Math.max(1, player.dexterity - enemy.dexterity); // Adjust multiplier as needed
    let randomFactor = Math.floor(rawChance * 0.15 * Math.random()); // Random factor is at most 15% of rawChance
    if (Math.random() < 0.5) randomFactor *= -1; // Randomly increase or decrease chance (50% chance to go either way)
    let correctedChance = Math.max(0, rawChance + randomFactor);
    return Math.min(correctedChance, 100); // Cap at 100%
}

function getFleeSuccess(player, enemy) {
    let chance = getFleeChance(player, enemy);
    console.log(`Flee chance: ${chance}%`);
    let roll = Math.random() * 100; // Roll between 0 and 100
    return roll < chance; // If roll is less than chance, flee is successful
}