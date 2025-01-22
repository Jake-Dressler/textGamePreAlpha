import { gaussianRandom } from "../utils/gaussianRandom.js";
import MarkovGenerator from "../utils/markovGenerator.js";
import elements from '../utils/elements.json' with { type: 'json' };

export class Metal{

    name;
    density;
    efficiency;

    constructor(){
        this.name = this.generateName();
        this.density = this.generateDensity();
        this.efficiency = this.generateEfficiency();
    }

    generateName(){
        var metalNameGen = new MarkovGenerator();
        metalNameGen.init(elements)
        return metalNameGen.generate();
    }
    generateDensity(){
        let d = 2.0
        while(d > 1.0) d = gaussianRandom(0.65, 0.15);
        return d
    }
    //TODO: make this dependent on properties instead of random
    generateEfficiency(){
        return Math.random();
    }
}