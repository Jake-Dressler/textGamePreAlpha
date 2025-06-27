export class Player {
    constructor(name) {
        this.name = name;
        // RPG stats
        this.strength = 10;
        this.dexterity = 10;
        this.constitution = 10;
        this.intelligence = 10;
        this.wisdom = 10;
        this.charisma = 10;

        // Derived stats
        this.maxHealth = 100 + (this.constitution - 10) * 5;
        this.health = this.maxHealth;
        this.energy = 100;
        this.maxEnergy = 100;
        this.gold = 0;
        this.level = 1;
        this.experience = 0;
        this.experienceToLevelUp = 100;
        this.restRate = 10;

        this.inventory = [];
        this.equippedItems = {
            weapon: null,
            armor: null,
            accessory: null,
        };
    }

    // Displays player's current stats
    displayStats() {
        console.log(`\n=== ${this.name}'s Stats ===`);
        console.log(`Health: ${this.health}/${this.maxHealth}`);
        console.log(`Strength: ${this.strength}`);
        console.log(`Dexterity: ${this.dexterity}`);
        console.log(`Constitution: ${this.constitution}`);
        console.log(`Intelligence: ${this.intelligence}`);
        console.log(`Wisdom: ${this.wisdom}`);
        console.log(`Charisma: ${this.charisma}`);
        console.log(`Gold: ${this.gold}`);
        console.log(`Level: ${this.level}`);
        console.log(`Experience: ${this.experience}/${this.experienceToLevelUp}\n`);
    }

    // Example: Calculate attack power based on strength
    getAttackPower() {
        return this.strength * 2; // Adjust formula as desired
    }

    // Example: Calculate defense based on constitution and dexterity
    getDefense() {
        return Math.floor(this.constitution * 1.3 + this.dexterity * 0.5);
    }

    // Gain energy and ensure it doesn't exceed maxEnergy
    gainEnergy(amount) {
        this.energy += amount;
        if (this.energy > this.maxEnergy) this.energy = this.maxEnergy;
    }

    // Use energy for actions, preventing usage if not enough energy
    useEnergy(amount) {
        let previousE = this.energy;
        this.energy -= amount;
        if (this.energy < 0) {
            this.energy = previousE;
            return false;
        }
        return true;
    }

    // Check inventory for an axe
    hasAxe() {
        if (!this.inventory) return false;
        for (var i of this.inventory) {
            if (i.toolType == "axe") return true;
        }
        return false;
    }

    // Check inventory for a pick
    hasPick() {
        if (!this.inventory) return false;
        for (var i of this.inventory) {
            if (i.toolType == "pick") return true;
        }
        return false;
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

    equip(item) {
        if (!item.canEquip) {
            alert(`${item.name} cannot be equipped`);
            return false;
        }
        if (!this.equippedItems.hasOwnProperty(item.slot)) {
            alert(`${slot} is not a valid slot.`);
            return false;
        }
        this.equippedItems[slot] = item;
        console.log(`${item.name} equipped in ${slot} slot.`);
        item.applyEffects(this);
        return true;
    }

    unequip(slot) {
        if (this.equippedItems[slot]) {
            const item = this.equippedItems[slot];
            item.removeEffects(this); // Remove item effects
            this.equippedItems[slot] = null;
            console.log(`${item.name} unequipped from ${slot} slot.`);
            return true;
        } else {
            console.log(`No item equipped in ${slot} slot.`);
            return false;
        }
    }

    // Handles taking damage
    takeDamage(amount) {
        const defense = this.getDefense();
        const damage = Math.max(amount - defense, 1);
        this.health -= damage;
        if (this.health <= 0) {
            this.health = 0;
        }
        return damage;
    }

    // Handles attacking an enemy
    attackEnemy(enemy) {
        return enemy.takeDamage(this.getAttackPower());
    }

    // Gain experience and check for level-ups
    gainExperience(amount) {
        this.experience += amount;
        if (this.experience >= this.experienceToLevelUp) {
            this.levelUp();
        }
    }

    // Level up the player
    levelUp() {
        this.level += 1;
        this.experience = 0;
        this.experienceToLevelUp = Math.floor(this.experienceToLevelUp * 1.25); // Increase XP requirement

        // Example stat increases
        this.strength += 2;
        this.dexterity += 1;
        this.constitution += 2;
        this.intelligence += 1;
        this.wisdom += 1;
        this.charisma += 1;

        this.maxHealth = 100 + (this.constitution - 10) * 5;
        this.health = this.maxHealth;

        console.log(`${this.name} leveled up to Level ${this.level}!`);
        this.displayStats();
    }

    toObject() {
        return {
            [this.name]: {
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