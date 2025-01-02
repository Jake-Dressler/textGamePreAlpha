import { travelTo } from "../engine/navigation.js";
import { getTravelTimeString } from "../utils/timeToTravel.js"

export function displayLocationBaseMenu(Location){
    switch(Location.type){
        case("TOWN"):
            document.getElementById("locationName").textContent = Location.name;
            document.getElementById("locationDescription").textContent = Location.description;

            // Create links for connected locations
            var connectionsList = document.getElementById("connections");
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
            break;
        case("FOREST"):
            document.getElementById("locationName").textContent = Location.name;
            document.getElementById("locationDescription").textContent = Location.description;

            // Create links for connected locations
            var connectionsList = document.getElementById("connections");
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
            break;
        default:
            console.log("invalid Location type");
    }
}