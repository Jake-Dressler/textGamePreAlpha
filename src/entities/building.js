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
        let numItems = Math.floor(gaussianRandom(10, 3));
        for (let i = 0; i < numItems; i++){
            let index = Math.floor(Math.random() * items.length)
            itemList.push(items[index]);
        }
        return itemList;
    }

}