import MarkovGenerator from "../utils/markovGenerator.js";
import places from '../utils/places.json' with { type: 'json' };
import names from '../utils/names.json' with { type: 'json' };
import animals from '../utils/animals.json' with { type: 'json' };

class Location {
    name;
    description;
    connections;
    npcs;
    type;
    items;

    constructor(){
        this.name = "placeholderName";
        this.description = "placeholderDescription";
        this.connections = [];
        this.npcs = ["placeholder","NPCS"];
        this.type = "placeholderTown";
        this.items = ["placeholder","items"];
    }

    setLocationInfo(name, desc, conns, npcs, type, items){
        this.name=name;
        this.description = desc;
        this.connections = conns;
        this.npcs=npcs;
        this.type=type;
        this.items=items;
    }
    set connections(array){
        this.connections = array;
    }
    getName(){
        return this.name;
    }
}

export class town extends Location{
    townSize;
    numBuildings;
    population;

    constructor(){
        super();
        this.type = "TOWN";
        this.townSize = "UNDEFINED";
        this.numBuildings = 0;
        this.population = 0;
    }
    generateTown(){
        this.type = "TOWN";
        this.numBuildings = this.generateNumBuildings();
        this.population = this.calculatePopulation(this.numBuildings);
        this.townSize = this.calculateSize(this.population);
        this.name = this.generateTownName();
        this.npcs = this.generateNpcNames(this.population);
        this.description = this.generateDescription();
    }
    generateNumBuildings(){
        return getRandomInt(3, 110);
    }
    calculatePopulation(numBuildings){
        var n = numBuildings * 2;
        var variance = getRandomInt(0, 1 + n * 0.2);
        if (Math.floor(Math.random() * 10) % 2 == 1){
            variance = variance * -1;
        }
        return Math.floor(n + variance)
    }
    calculateSize(pop){
        if(pop > 120) return "LARGE";
        else if(pop > 50) return "MEDIUM";
        else return "SMALL";
    }
    generateTownName(){
        var locationNameGen = new MarkovGenerator();
        locationNameGen.init(places)
        return locationNameGen.generate();
    }
    generateNpcNames(n){
        var npcNameGen = new MarkovGenerator();
        npcNameGen.init(names)
        var array = []
        for(let i = 0; i < n; i++) array.push(npcNameGen.generate());
        return array;
    }
    generateDescription(){
        var desc = `${this.name} is a ${this.townSize} town with ${this.numBuildings} buildings and a population of ${this.population}`
        return desc;
    }
    // not really necessary with toObject existing
    // TODO: decide whether to delete this
    toString(){
        return `
name: ${this.name} \n
description: ${this.description} \n
connections: ${this.connections} \n
npcs: ${this.npcs} \n
type: ${this.type} \n
items: ${this.items} \n
townSize: ${this.townSize} \n
numBuildings: ${this.numBuildings} \n
population: ${this.population}
        `;
    }
    toJSON() {
        return this.toObject();
    }
    toObject() {
        return {
            [this.name]: {
                name: this.name,
                description: this.description,
                connections: this.connections,
                npcs: this.npcs,
                type: this.type,
                items: this.items,
                townSize: this.townSize,
                numBuildings: this.numBuildings,
                population: this.population
            }
        }
    };
}
export class forest extends Location{
    density;
    avgTreeHeight;

    constructor(){
        super();
        this.type = "FOREST";
        this.density = 0.0;
        this.avgTreeHeight = 0.0;
    }
    generateForest(){
        this.name = this.generateForestName();
        this.density = this.generateDensity();
        this.avgTreeHeight = this.generateTreeHeight();
        this.npcs = this.generateNpcNames(10);
        this.description = this.generateDescription();
    }
    generateForestName(){
        var w1 = ["Moldy", "Mossy", "Deep", "Red", "Salty", "Dark", "Grim", "Summer", "White", "Cold", "Blood", "South", "North", "East", "West", "Bloom", "Little", "Gray", "Silver", "Giant", "Wandering", "Misty", "Broken", "Enchanted", "Golden", "Ancient"];
        var w2 = ["oak", "fire", "grass", "lake", "bear", "wolf", "owl", "thorn", "weed", "bush", "root", "rock", "water", "wasp", "hill", "leaf", "tree", "rose", "toad", "moon", "pond", "lizard", "otter", "badger", "pixie", "willow"];
        var w3 = ["Woodlands", "Grove", "Woods", "Covert", "Thicket", "Forest", "Timberland", "Glade", "Wilderness", "Pines", "Bog", "Swamp"];

        var iWord1 = getRandomInt(0, w1.length);
        var iWord2 = getRandomInt(0, w2.length);
        var iWord3 = getRandomInt(0, w3.length);

        return `${w1[iWord1]}${w2[iWord2]} ${w3[iWord3]}`;
    }
    generateDensity(){
        return Math.random();
    }
    generateTreeHeight(){
        return getRandomInt(12, 75);
    }
    generateNpcNames(n){
        var npcNameGen = new MarkovGenerator();
        npcNameGen.init(animals)
        var array = []
        for(let i = 0; i < n; i++) array.push(npcNameGen.generate());
        return array;
    }
    generateDescription(){
        var desc = `${this.name} is a forest with ${this.density} tree density and an average tree height of ${this.avgTreeHeight}`;
        return desc;
    }
    toJSON() {
        return this.toObject();
    }
    toObject() {
        return {
            [this.name]: {
                name: this.name,
                description: this.description,
                connections: this.connections,
                npcs: this.npcs,
                type: this.type,
                items: this.items,
                density: this.density,
                avgTreeHeight: this.avgTreeHeight
            }
        }
    };
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }