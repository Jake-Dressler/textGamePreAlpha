import { getWorld } from "../engine/gameState.js";

export function drawLocationMap(currentLocation, maxDepth) {
    const canvas = document.getElementById("diagramCanvas");
    const ctx = canvas.getContext("2d");
    const manualScale = 1.5;

    // Set canvas dimensions
    canvas.width = 300;
    canvas.height = 300;

    // Define the world boundaries (these values should be based on your world data)
    const worldWidth = 1000; // Example world width (adjust as needed)
    const worldHeight = 1000; // Example world height (adjust as needed)

    // Calculate the scaling factor
    const scaleX = canvas.width / worldWidth;
    const scaleY = canvas.height / worldHeight;

    // Set the scale based on the smaller dimension to ensure the map fits within the canvas
    const scale = Math.min(scaleX, scaleY) * manualScale;

    const radius = 30 * scale; // Radius of each circle, scaled
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Offset to translate locations relative to the current location
    const offsetX = centerX - (currentLocation.x * scale);
    const offsetY = centerY - (currentLocation.y * scale);

    // Function to traverse locations up to a certain depth
    function traverseLocations(location, depth, visited) {
        if (depth > maxDepth || visited.has(location.name)) return;

        // Mark the location as visited
        visited.add(location.name);

        // Translate the location's coordinates with scaling
        const translatedX = location.x * scale + offsetX;
        const translatedY = location.y * scale + offsetY;

        // console.log(translatedX, translatedY); // Debug log to check scaling

        // Draw connections to other locations
        location.connections.forEach(connectionName => {
            const connectedLocation = getWorld().find(loc => loc.name === connectionName);
            if (connectedLocation && !visited.has(connectedLocation.name)) {
                // Draw the connection line
                const connectedX = connectedLocation.x * scale + offsetX;
                const connectedY = connectedLocation.y * scale + offsetY;

                ctx.strokeStyle = "white";
                ctx.beginPath();
                ctx.moveTo(translatedX, translatedY);
                ctx.lineTo(connectedX, connectedY);
                ctx.stroke();
                ctx.closePath();

                // Recurse into the connected location
                traverseLocations(connectedLocation, depth + 1, visited);
            }
        });

        // Now draw the circle for the location (on top of the lines)
        ctx.fillStyle = location === currentLocation ? "yellow" : "lightblue";
        ctx.beginPath();
        ctx.arc(translatedX, translatedY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.closePath();

        // Draw text for the location
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(location.name, translatedX, translatedY);
    }

    // Start the traversal from the current location
    const visited = new Set();
    traverseLocations(currentLocation, 0, visited);
}




function scaleCoord(c){
    return c * 1;
}