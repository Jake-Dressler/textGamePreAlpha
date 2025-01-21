export class Item {

    name;
    description;
    effect;
    price;
    weight;
    rarity;

    constructor(name, description, effect, price, weight){
        this.name = name;
        this.description = description;
        this.effect = effect;
        this.price = price;
        this.weight = weight;
    }
}

export class Tool extends Item{

    material;
    toolType;
    toolEfficiency;

    constructor(name, description, effect, price, weight, material, toolType){
        super(name, description, effect, price, weight)
        this.material = material;
        this.toolType = toolType;
    }
}

export class Ore extends Item{

    constructor(name, description, effect, price, weight){
        super(name, description, effect, price, weight)
    }
}