// Define locations
const locations = {
    "Ship": {
        description: "Your personal ship. It's cozy and well-equipped for adventures.",
        items: ["medkit", "food rations"],
        npcs: ["AI Assistant"]
    },
    "PlanetSurface": {
        description: "The barren surface of an alien planet.",
        items: ["alien artifact"],
        npcs: ["Alien Trader"]
    }
};

// Function to get location details
function exploreLocation(location) {
    const loc = locations[location];
    console.log(loc.description);
    console.log("Items available:", loc.items.join(", "));
    console.log("NPCs present:", loc.npcs.join(", "));
}

// Define a dialogue object
const dialogues = {
    "Alien Trader": {
        greeting: {
            text: "Hello, traveler! Interested in some rare artifacts?",
            options: [
                { text: "Yes, show me what you've got.", next: "offerItems" },
                { text: "Not interested.", next: "end" }
            ]
        },
        offerItems: {
            text: "Take a look. I have some valuable relics.",
            options: [
                { text: "I'll take the relic.", next: "end" },
                { text: "Maybe later.", next: "end" }
            ]
        },
        end: { text: "Safe travels, stranger." }
    }
};

// Function to display dialogue
function startDialogue(character) {
    let current = dialogues[character].greeting;
    while (current) {
        console.log(current.text);
        if (!current.options) break;
        
        // Display options
        current.options.forEach((option, index) => console.log(`${index + 1}. ${option.text}`));
        
        // Simulate choice (for testing, pick the first option)
        const choice = 0;
        current = dialogues[character][current.options[choice].next];
    }
}

// Start conversation with "Alien Trader"
startDialogue("Alien Trader");

const player = {
    name: "Captain Steele",
    health: 100,
    strength: 10,
    intelligence: 8,
    charm: 7,
    inventory: [],
    addItem(item) {
        this.inventory.push(item);
    }
};

// Function to display character stats
function displayStats() {
    console.log(`${player.name}'s Stats`);
    console.log(`Health: ${player.health}`);
    console.log(`Strength: ${player.strength}`);
    console.log(`Intelligence: ${player.intelligence}`);
    console.log(`Charm: ${player.charm}`);
    console.log(`Inventory: ${player.inventory.join(", ")}`);
}

// Add an item and display stats
player.addItem("alien artifact");
displayStats();

// Item definitions
const items = {
    "medkit": { type: "consumable", effect: () => player.health += 20 },
    "alien artifact": { type: "quest", effect: () => console.log("This is a valuable artifact.") }
};

// Function to use an item
function useItem(itemName) {
    const item = items[itemName];
    if (item) {
        console.log(`Using ${itemName}...`);
        item.effect();
    } else {
        console.log("Item not found in inventory.");
    }
}

// Use an item from inventory
useItem("medkit");
displayStats();