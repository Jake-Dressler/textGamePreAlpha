import { getGameTime } from "../engine/gameState.js"

export function drawClock(){
    const parent = document.getElementById("clockMenu");

    // adds a separator before the clock
    const separator = document.createElement("hr");
    separator.id = "separator";

    const date = document.createElement("div");
    const time = document.createElement("div");

    const currTime = getGameTime();

    date.textContent = `${currTime.day} ${currTime.season}, Year ${currTime.year}`;
    time.textContent = `${currTime.hours}:${currTime.minutes}`;

    parent.appendChild(separator);
    parent.appendChild(date);
    parent.appendChild(time);
}