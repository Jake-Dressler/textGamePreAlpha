// src/entities/NPC.js

class NPC {
    constructor(name, health, attack, defense, dialog = []) {
        this.name = name; // NPC's name
        this.health = health; // NPC's current health
        this.maxHealth = health; // NPC's max health
        this.attack = attack; // NPC's attack strength
        this.defense = defense; // NPC's defense strength
        this.dialog = dialog; // Array of dialog lines
    }

    // Displays NPC stats
    displayStats() {
        console.log(`\n=== ${this.name}'s Stats ===`);
        console.log(`Health: ${this.health}/${this.maxHealth}`);
        console.log(`Attack: ${this.attack}`);
        console.log(`Defense: ${this.defense}\n`);
    }

    // Handles taking damage
    takeDamage(amount) {
        const damage = Math.max(amount - this.defense, 0);
        this.health -= damage;
        console.log(`${this.name} takes ${damage} damage!`);
        if (this.health <= 0) {
            this.health = 0;
            console.log(`${this.name} has been defeated!`);
        }
    }

    // Handles attacking a Player or another entity
    attackEnemy(enemy) {
        if (!enemy || typeof enemy.takeDamage !== 'function') {
            console.log(`${this.name} tries to attack, but there's no valid target!`);
            return;
        }

        console.log(`${this.name} attacks ${enemy.name}!`);
        enemy.takeDamage(this.attack);
    }

    // Interacts with the player (e.g., speaks a line of dialog)
    interact() {
        if (this.dialog.length > 0) {
            const randomLine = this.dialog[Math.floor(Math.random() * this.dialog.length)];
            console.log(`${this.name} says: "${randomLine}"`);
        } else {
            console.log(`${this.name} has nothing to say.`);
        }
    }

    // Converts the NPC instance to a JSON object
    toObject() {
        return {
            [this.name]:{
                name: this.name,
                health: this.health,
                maxHealth: this.maxHealth,
                attack: this.attack,
                defense: this.defense,
                dialog: this.dialog
            }
        };
    }
}

module.exports = npc;
