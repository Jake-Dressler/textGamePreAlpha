export class Item {

    name;
    description;
    effect;
    price;
    weight;
    rarity;
    canEquip;

    constructor(){
        this.name = '';
        this.description = '';
        this.effect = null;
        this.price = 0;
        this.weight = 0;
        this.rarity = 'common';
        this.canEquip = false;
    }
    setRarity(rarity){
        this.rarity = rarity;
    }
    applyEffects(){
        if (this.effect == null) return;
    }
    toObject() {
        return {
            [this.name]:{
                name: this.name,
                description: this.description,
                effect: this.effect,
                price: this.price,
                weight: this.weight,
                rarity: this.rarity,
                canEquip: this.canEquip
            }
        };
    }
    toJSON() {
        return this.toObject();
    }
}

export class Tool extends Item{

    material;
    toolType;
    toolEfficiency;
    slot;

    constructor(material, toolType, effect){
        super();
        this.effect = effect;
        this.material = material;
        this.toolType = toolType;
        this.canEquip = true;
        this.slot = 'weapon';
        this.name = this.getName(toolType, material.name);
        this.weight = this.getWeight(material.density);
        this.toolEfficiency = this.getEfficiency(material.efficiency);
        this.price = this.getPrice();
    }
    getName(type, material){
        return `${material} ${type}`
    }
    getWeight(density){
        return Math.floor(density * 20);
    }
    getEfficiency(efficiency){
        return efficiency;
    }
    //TODO: make this do something at some point
    getPrice(){
        return 30;
    }
    toObject() {
        return {
            [this.name]:{
                name: this.name,
                description: this.description,
                effect: this.effect,
                price: this.price,
                weight: this.weight,
                rarity: this.rarity,
                canEquip: this.canEquip,
                material: this.material,
                toolType: this.toolType,
                slot: this.slot,
                toolEfficiency: this.toolEfficiency
            }
        };
    }
    toJSON() {
        return this.toObject
    }
}

export class Ore extends Item{

    constructor(metal){
        super();
        this.name = this.getName(metal.name);
        this.material = metal;
        this.price = 40;
    }
    getName(metalName){
        return `${metalName} ore`
    }
}