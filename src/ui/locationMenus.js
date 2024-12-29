import { travelTo } from "../engine/navigation.js";

export function displayLocationBaseMenu(Location){
    switch(Location.type){
        case("TOWN"):
            document.getElementById("locationName").textContent = Location.name;
            document.getElementById("locationDescription").textContent = Location.description;

            // Create links for connected locations
            var connectionsList = document.getElementById("connections");
            connectionsList.innerHTML = ""; // Clear previous links
        
            Location.connections.forEach(connection => {
                const link = document.createElement("a");
                link.href = "#"; // Or use a proper routing system
                link.textContent = connection;
                link.addEventListener("click", () => travelTo(connection));
                connectionsList.appendChild(link);

                // Add a line break after each connection link
                const lineBreak = document.createElement("br");
                connectionsList.appendChild(lineBreak);
            });
            //console.log(Location.toJSON());
        case("FOREST"):
            document.getElementById("locationName").textContent = Location.name;
            document.getElementById("locationDescription").textContent = Location.description;

            // Create links for connected locations
            var connectionsList = document.getElementById("connections");
            connectionsList.innerHTML = ""; // Clear previous links
        
            Location.connections.forEach(connection => {
                const link = document.createElement("a");
                link.href = "#"; // Or use a proper routing system
                link.textContent = connection;
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