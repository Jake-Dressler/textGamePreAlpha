import { getMetalList, getPlayer } from "../engine/gameState.js";
import { Ore } from "../entities/item.js";

export class Cave{

    maxDepth;
    ore;
    sections;

    constructor(){
        this.maxDepth = getRandomInt(1, 7);
        this.sections = this.getSections(this.maxDepth);
        this.ore = this.getOre();
    }
    getSections(numSections){
        let sectionList = [];
        for(let i = 0; i <= numSections; i++){
            sectionList.push(new caveSection());
        }
        return sectionList;
    }
    getOre(){
        return getMetalList()[getRandomInt(0, getMetalList().length)];
    }
}

class caveSection{

    numNodes;
    nodesUsed;

    constructor(){
        this.numNodes = getRandomInt(1, 3);
        this.nodesUsed = 0;
    }
    mineNode(cave){
        if(this.nodesUsed >= this.numNodes) return false;
        if(!getPlayer().hasPick()) return false;
        if(!player.useEnergy(getMineEnergy())) return false;
        this.nodesUsed += 1;
        let ore = new Ore(cave.ore);
        getPlayer().addItem(ore);
        return true;
    }
    resetNodes(){
        this.nodesUsed = 0;
    }
    getMineEnergy(){
        return 40;
    }
}

// [min, max)
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}