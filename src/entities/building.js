import { gaussianRandom } from "../utils/gaussianRandom.js";
import { NPC } from "./npc.js";
import { getItemList } from "../engine/gameState.js";

export class Building{

    name;
    type;
    constructor(){
        this.type = "NONE";
    }
}

export class Shop extends Building{

    maxGold;
    gold;
    items;
    name;
    shopkeeper;

    constructor(name){
        super();
        this.type = "SHOP";
        this.name = name;
        this.maxGold = this.getMaxGold();
        this.gold = this.maxGold;
        this.items = this.getShopItems();
        this.shopkeeper = new NPC("testKeeper", 1, 1, 1, 1, []);
    }
    //TODO: adjust values
    getMaxGold(){
        return Math.floor(gaussianRandom(300, 50));
    }
    getShopItems(){
        let itemList = [];
        let items = getItemList();
        let itemKeys = Object.keys(items);
        let numItems = Math.floor(gaussianRandom(8, 5));
        for (let i = 0; i < numItems; i++){
            let index = Math.floor(Math.random() * itemKeys.length)
            itemList.push(items[itemKeys[index]]);
        }
        return itemList;
    }

}