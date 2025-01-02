// Import Clock class (assuming it's in clock.js)
import { Clock } from './clock.js';
import { Player } from '../entities/player.js'

// Initialize the clock (you can set an initial time if needed)
const clock = new Clock();
const player = new Player("testPlayer");

// Store the current location
let currentLocation = null;
// Store world
let world = null;
// **************************WORLD FUNCTIONS*******************************
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
let mapDepth = 1;
export function setMapDepth(depth){
    mapDepth = depth;
}
export function getMapDepth(){
    return mapDepth;
}
// store map scale
let mapScale = 2.0;
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
// ************************************************************************

// %%%%%%%%%%%%%%%%%%%%%%%%%%PLAYER FUNCTIONS%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%



// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// ##########################CLOCK FUNCTIONS###############################
// Set the game clock
export function setGameTime(time) {
    clock.setTime(time);
}
// Get the current game time
export function getGameTime() {
    return clock.getCurrentTime();
}
export function advanceTime(minutes) {
    clock.advanceTime(minutes); // Advance the time, you can specify how much time to advance
}
// #########################################################################
