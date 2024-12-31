// Import Clock class (assuming it's in clock.js)
import { Clock } from './clock.js';

// Initialize the clock (you can set an initial time if needed)
const clock = new Clock();

// Store the current location
let currentLocation = null;

// Store world
let world = null;

export function setWorld(w){
    world = w;
}
export function getWorld(){
    return world;
}

// store map display type
let mapType = "default";
export function setMapType(type){
    mapType = type;
}
export function getMapType(){
    return mapType;
}
// store map display depth
let mapDepth = 2;
export function setMapDepth(depth){
    mapDepth = depth;
}
export function getMapDepth(){
    return mapDepth;
}
// store map scale
let mapScale = 1.5;
export function setMapScale(scale){
    mapScale = scale;
}
export function getMapScale(){
    return mapScale;
}
// Set the current location
export function setCurrentLocation(location) {
    currentLocation = location;
}
// Get the current location
export function getCurrentLocation() {
    return currentLocation;
}

// Set the game clock
export function setGameTime(time) {
    clock.setTime(time);
}

// Get the current game time
export function getGameTime() {
    return clock.getTime();
}

// You can also expose the clock update method if needed
export function advanceTime() {
    clock.advanceTime(); // Advance the time, you can specify how much time to advance
}