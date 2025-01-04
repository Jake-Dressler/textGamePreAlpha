import { travelTo } from "../engine/navigation.js";
import { getTravelTimeString } from "../utils/timeToTravel.js"

export function displayLocationBaseMenu(Location){

    var centerDiv = document.getElementById("center-content");
    centerDiv.innerHTML = "";

    var locationName = document.createElement("p");
    locationName.textContent = Location.name;
    centerDiv.appendChild(locationName);

    var locationDescription = document.createElement("p")
    locationDescription.textContent = Location.description;;
    centerDiv.appendChild(locationDescription);

    // Create links for connected locations
    var connectionsList = document.createElement("connections");
    connectionsList.innerHTML = ""; // Clear previous links

    Object.keys(Location.connections).forEach(connection => {
        const link = document.createElement("a");
        link.href = "#"; // Or use a proper routing system
        link.textContent = `${connection} (${getTravelTimeString(Location.connections[connection])})`;
        link.addEventListener("click", () => travelTo(connection));
        connectionsList.appendChild(link);

        // Add a line break after each connection link
        const lineBreak = document.createElement("br");
        connectionsList.appendChild(lineBreak);
    });
    centerDiv.appendChild(connectionsList);
    
    switch(Location.type){
        case("TOWN"):
            break;
        case("FOREST"):
            break;
        default:
            console.log("ERROR: invalid Location type");
    }
}