export function getTimeToTravel(currentLoc, nextLoc){
    return 10 + currentLoc.connections[nextLoc.name];
}

export function getTravelTimeString(minutes){
    minutes += 10;
    let hours = 0;
    let days = 0;

    // Handle overflow of minutes into hours
    while (minutes >= 60) {
        minutes -= 60;
        hours += 1;
    }

    // Handle overflow of hours into days
    while (hours >= 24) {
        hours -= 24;
        days += 1;
    }

    let result = "";
    if(days) result = `${days}:${pad(hours, 2)}:${pad(minutes, 2)}`;
    else result = `${hours}:${pad(minutes, 2)}`;

    return result;
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}