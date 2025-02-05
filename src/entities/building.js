import { gaussianRandom } from "../utils/gaussianRandom";
import { NPC } from "./npc";

export class Building{

    constructor(){

    }
}

export class Shop extends Building{

    maxGold;
    gold;
    items;
    name;
    shopkeeper;

    constructor(){
        this.maxGold = this.getMaxGold();
        this.shopkeeper = new NPC("testKeeper", 1, 1, 1, 1, []);
    }
    //TODO: adjust values
    getMaxGold(){
        return Math.floor(gaussianRandom(300, 50));
    }

}