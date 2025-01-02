import { getWorld, setMapType, getCurrentLocation, setMapDepth, setMapScale, getMapDepth, getMapScale, getMapType } from "../engine/gameState.js";

export function drawLocationMap(currentLocation, maxDepth, manualScale = 1.5) {
    const canvas = document.getElementById("diagramCanvas");
    const ctx = canvas.getContext("2d");

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
        Object.keys(location.connections).forEach(connectionName => {
            const connectedLocation = getWorld().find(loc => loc.name === connectionName);
            if (connectedLocation && !visited.has(connectedLocation.name)) {
                // Draw the connection line
                const connectedX = connectedLocation.x * scale + offsetX;
                const connectedY = connectedLocation.y * scale + offsetY;

                ctx.strokeStyle = "#3e5795";
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
        ctx.fillStyle = location === currentLocation ? "orange" : location.visited ? "lightblue" : "#8a2be2";
        ctx.beginPath();
        ctx.arc(translatedX, translatedY, radius * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.closePath();

        // Draw text for the location
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        let nameText = location.visited ? location.name : "???";
        ctx.fillText(nameText, translatedX, translatedY);
    }

    // Start the traversal from the current location
    const visited = new Set();
    traverseLocations(currentLocation, 0, visited);
}

export function drawLocationMapSimple(currentLocation, depth, scale = 1) {
    const canvas = document.getElementById("diagramCanvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions (scaled)
    canvas.width = 300;
    canvas.height = 300;

    // Clear the canvas and set background color
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "#303030"; // Optional: background color
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Center of the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 30 * scale; // Radius of each circle (scaled)
    const connectionRadius = 100 * scale; // Distance from the center to first-level connections (scaled)

    // Recursive function to draw connections
    function drawConnections(location, x, y, level, angleStart = 0, angleRange = 2 * Math.PI) {
        if (level > depth || !location.connections) return;

        const angleStep = angleRange / location.connections.length;

        location.connections.forEach((connectionName, index) => {
            const angle = angleStart + index * angleStep;
            const childX = x + connectionRadius * Math.cos(angle);
            const childY = y + connectionRadius * Math.sin(angle);

            // Draw line to connection
            ctx.strokeStyle = "white";
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(childX, childY);
            ctx.stroke();
            ctx.closePath();

            // Find the location object for the connection
            const nextLocation = getWorld().find(loc => loc.name === connectionName);

            // Draw connection circle
            ctx.fillStyle = nextLocation.visited ? "lightblue" : "#8a2be2";;
            ctx.beginPath();
            ctx.arc(childX, childY, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();

            // Draw text for connection
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            let nameText = nextLocation.visited ? nextLocation.name : "???";
            ctx.fillText(nameText, childX, childY);

            if (nextLocation) {
                drawConnections(nextLocation, childX, childY, level + 1, angle - angleStep / 2, angleStep);
            }
        });
    }

    // Start drawing connections from the current location
    drawConnections(currentLocation, centerX, centerY, 1);

    // Draw current location circle on top
    ctx.fillStyle = "orange"; // Current location color
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.closePath();

    // Draw text for current location
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(currentLocation.name, centerX, centerY);
}


export function setMapButtons(){
    // Select the button element
    const buttonsDiv = document.getElementById("mapButtons");

    // Create default and simple button elements and set properties
    const defaultMapButton = document.createElement("button");
    const simpleMapButton = document.createElement("button");
    const scaleUpButton = document.createElement("button");
    const scaleDownButton = document.createElement("button");
    const depthUpButton = document.createElement("button");
    const depthDownButton = document.createElement("button");

    defaultMapButton.textContent = "default";
    simpleMapButton.textContent = "simple";
    scaleUpButton.textContent = "scale(+)";
    scaleDownButton.textContent = "scale(-)";
    depthUpButton.textContent = "depth(+)";
    depthDownButton.textContent = "depth(-)";

    defaultMapButton.id = "mapButton";
    simpleMapButton.id = "mapButton";
    scaleUpButton.id = "mapButton";
    scaleDownButton.id = "mapButton";
    depthUpButton.id = "mapButton";
    depthDownButton.id = "mapButton";

    // Add an event listeners
    defaultMapButton.addEventListener("click", () => {
        setMapType("default");
        drawLocationMap(getCurrentLocation(), getMapDepth(), getMapScale());
    });
    simpleMapButton.addEventListener("click", () => {
        setMapType("simple");
        drawLocationMapSimple(getCurrentLocation(), getMapDepth());
    });
    scaleUpButton.addEventListener("click", () => {
        setMapScale(getMapScale() + 0.1);
        if(getMapType() == "simple") drawLocationMapSimple(getCurrentLocation(), getMapDepth(), getMapScale());
        else drawLocationMap(getCurrentLocation(), getMapDepth(), getMapScale());
    });
    scaleDownButton.addEventListener("click", () => {
        setMapScale(getMapScale() - 0.1);
        if(getMapType() == "simple") drawLocationMapSimple(getCurrentLocation(), getMapDepth(), getMapScale());
        else drawLocationMap(getCurrentLocation(), getMapDepth(), getMapScale());
    });
    depthUpButton.addEventListener("click", () => {
        setMapDepth(getMapDepth() + 1);
        if(getMapType() == "simple") drawLocationMapSimple(getCurrentLocation(), getMapDepth(), getMapScale());
        else drawLocationMap(getCurrentLocation(), getMapDepth(), getMapScale());
    });
    depthDownButton.addEventListener("click", () => {
        setMapDepth(getMapDepth() - 1);
        if(getMapType() == "simple") drawLocationMapSimple(getCurrentLocation(), getMapDepth(), getMapScale());
        else drawLocationMap(getCurrentLocation(), getMapDepth(), getMapScale());
    });

    // Append the buttons to the div
    buttonsDiv.appendChild(defaultMapButton);
    buttonsDiv.appendChild(simpleMapButton);
    buttonsDiv.appendChild(scaleUpButton);
    buttonsDiv.appendChild(scaleDownButton);
    buttonsDiv.appendChild(depthUpButton);
    buttonsDiv.appendChild(depthDownButton);
}



function scaleCoord(c){
    return c * 1;
}