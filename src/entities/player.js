
export class Player {
    constructor(name) {
        this.name = name; // Player's name
        this.health = 100; // Player's health
        this.maxHealth = 100; // Maximum health
        this.attack = 10; // Attack strength
        this.defense = 5; // Defense strength
        this.inventory = []; // Inventory for items
        this.gold = 0; // Player's currency
        this.level = 1; // Player's level
        this.experience = 0; // Experience points
        this.experienceToLevelUp = 100; // Experience needed to level up
    }

    // Displays player's current stats
    displayStats() {
        console.log(`\n=== ${this.name}'s Stats ===`);
        console.log(`Health: ${this.health}/${this.maxHealth}`);
        console.log(`Attack: ${this.attack}`);
        console.log(`Defense: ${this.defense}`);
        console.log(`Gold: ${this.gold}`);
        console.log(`Level: ${this.level}`);
        console.log(`Experience: ${this.experience}/${this.experienceToLevelUp}\n`);
    }

    // Adds an item to the player's inventory
    addItem(item) {
        this.inventory.push(item);
        console.log(`${item.name} has been added to your inventory!`);
    }

    // Removes an item from the inventory
    useItem(itemName) {
        const itemIndex = this.inventory.findIndex(item => item.name === itemName);
        if (itemIndex > -1) {
            const item = this.inventory[itemIndex];
            console.log(`Using ${item.name}...`);
            if (item.effect) item.effect(this);
            this.inventory.splice(itemIndex, 1);
        } else {
            console.log(`You don't have a ${itemName} in your inventory.`);
        }
    }

    // Handles taking damage
    takeDamage(amount) {
        const damage = Math.max(amount - this.defense, 0);
        this.health -= damage;
        console.log(`${this.name} takes ${damage} damage!`);
        if (this.health <= 0) {
            this.health = 0;
            console.log(`${this.name} has fallen!`);
        }
    }

    // Handles attacking an enemy
    attackEnemy(enemy) {
        console.log(`${this.name} attacks ${enemy.name}!`);
        enemy.takeDamage(this.attack);
    }

    // Gain experience and check for level-ups
    gainExperience(amount) {
        console.log(`${this.name} gains ${amount} experience points!`);
        this.experience += amount;
        if (this.experience >= this.experienceToLevelUp) {
            this.levelUp();
        }
    }

    // Level up the player
    levelUp() {
        this.level += 1;
        this.experience -= this.experienceToLevelUp;
        this.experienceToLevelUp = Math.floor(this.experienceToLevelUp * 1.5); // Increase XP requirement
        this.maxHealth += 20;
        this.health = this.maxHealth;
        this.attack += 5;
        this.defense += 3;
        console.log(`${this.name} leveled up to Level ${this.level}!`);
        this.displayStats();
    }

    toObject() {
        return {
            [this.name]:{
                name: this.name,
                health: this.health,
                maxHealth: this.maxHealth,
                attack: this.attack,
                defense: this.defense,
                inventory: this.inventory,
                gold: this.gold,
                level: this.level,
                experience: this.experience,
                experienceToLevelUp: this.experienceToLevelUp
            }
        };
    }
    toJSON() {
        return this.toObject
    }
}