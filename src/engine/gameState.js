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