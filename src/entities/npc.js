// src/entities/NPC.js

export class NPC {
    constructor(name, level, strength = 10, dexterity = 10, constitution = 10, intelligence = 10, wisdom = 10, charisma = 10, dialog = []) {
        this.name = name; // NPC's name
        this.level = level;

        // RPG stats
        this.strength = strength;
        this.dexterity = dexterity;
        this.constitution = constitution;
        this.intelligence = intelligence;
        this.wisdom = wisdom;
        this.charisma = charisma;

        // Derived stats
        this.maxHealth = 100 + (this.constitution - 10) * 5;
        this.health = this.maxHealth;

        this.dialog = dialog; // Array of dialog lines
    }

    // Displays NPC stats
    displayStats() {
        console.log(`\n=== ${this.name}'s Stats ===`);
        console.log(`Health: ${this.health}/${this.maxHealth}`);
        console.log(`Strength: ${this.strength}`);
        console.log(`Dexterity: ${this.dexterity}`);
        console.log(`Constitution: ${this.constitution}`);
        console.log(`Intelligence: ${this.intelligence}`);
        console.log(`Wisdom: ${this.wisdom}`);
        console.log(`Charisma: ${this.charisma}\n`);
    }

    // Calculate attack power based on strength
    getAttackPower() {
        return this.strength * 2; // Adjust as needed
    }

    // Calculate defense based on constitution and dexterity
    getDefense() {
        return Math.floor(this.constitution * 1.3 + this.dexterity * 0.5);
    }

    // Handles taking damage
    takeDamage(amount) {
        const defense = this.getDefense();
        const damage = Math.max(amount - defense, 1);
        this.health -= damage;
        if (this.health <= 0) {
            this.health = 0;
            console.log(`${this.name} has been defeated!`);
        }
        return damage;
    }

    // Handles attacking a Player or another entity
    attackEnemy(enemy) {
        if (!enemy || typeof enemy.takeDamage !== 'function') {
            return;
        }
        return enemy.takeDamage(this.getAttackPower());
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
            [this.name]: {
                name: this.name,
                health: this.health,
                maxHealth: this.maxHealth,
                strength: this.strength,
                dexterity: this.dexterity,
                constitution: this.constitution,
                intelligence: this.intelligence,
                wisdom: this.wisdom,
                charisma: this.charisma,
                dialog: this.dialog
            }
        };
    }
}
