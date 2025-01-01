import { getGameTime } from "../engine/gameState.js"

export function drawClock(){
    const parent = document.getElementById("clockMenu");

    // adds a separator before the clock
    const separator = document.createElement("hr");
    separator.id = "separator";

    const date = document.createElement("div");
    const time = document.createElement("div");

    const currTime = getGameTime();
    const mins = currTime.minutes < 10 ? pad(currTime.minutes, 2) : currTime.minutes.toString();

    date.textContent = `${currTime.day} ${currTime.season}, Year ${currTime.year}`;
    time.textContent = `${currTime.hours}:${mins}`;

    parent.appendChild(separator);
    parent.appendChild(date);
    parent.appendChild(time);
}

export function updateClock(){
    document.getElementById("clockMenu").innerHTML = '';
    drawClock();
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}