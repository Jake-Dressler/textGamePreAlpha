export function drawLocationMap(currentLocation, depth) {
    const canvas = document.getElementById("diagramCanvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = 800;
    canvas.height = 600;

    // Clear the canvas and set background color
    //ctx.fillStyle = "#303030";
    //ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Center of the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 50; // Radius of each circle
    const connectionRadius = 200; // Distance from the center to first-level connections

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

            // Draw connection circle
            ctx.fillStyle = "lightblue";
            ctx.beginPath();
            ctx.arc(childX, childY, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();

            // Draw text for connection
            ctx.fillStyle = "black";
            ctx.fillText(connectionName, childX, childY);

            // Find the location object for the connection
            const nextLocation = getWorld().find(loc => loc.name === connectionName);
            if (nextLocation) {
                drawConnections(nextLocation, childX, childY, level + 1, angle - angleStep / 2, angleStep);
            }
        });
    }

    // Start drawing connections from the current location
    drawConnections(currentLocation, centerX, centerY, 1);

    // Draw current location circle on top
    ctx.fillStyle = "yellow"; // Current location color
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