import { getMetalList } from "../engine/gameState.js";

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
        for(let i = 0; i < numSections; i++){
            sectionList.push(new caveSection());
        }
        this.sections = sectionList;
    }
    getOre(){
        getRandomInt(0, getMetalList().length);
    }
}

class caveSection{

    numNodes;
    nodesUsed;

    constructor(){
        this.numNodes = getRandomInt(1, 3);
        this.nodesUsed = 0;
    }
    mineNode(){
        if(!this.nodesUsed < this.numNodes) return false;
        this.nodesUsed += 1;
        return true;
    }
    resetNodes(){
        this.nodesUsed = 0;
    }
}

// [min, max)
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}