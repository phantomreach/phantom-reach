/**
Virtual Hand Visualization Module.

This module is responsible for rendering a virtual hand based on elbow tracking.
It provides functions to manage the canvas, convert normalized coordinates to 
screen coordinates, and visually represent the virtual hand.

Key Features:
- Clears the canvas before each frame.
- Converts normalized 3D coordinates to 2D screen space.
- Draws a customizable circular marker to represent the virtual hand.
- Handles input validation and ensures robust rendering.

Why:
This module provides real-time visual feedback for phantom limb therapy by
creating an interactive virtual hand.
"""

/**
 * Clear the entire canvas.
 * 
 * Clears all previous drawings on the given canvas, preparing it for the next
 * rendering cycle.
 * 
 * @param {HTMLCanvasElement} canvas - The canvas element to clear.
 * @throws {Error} If the canvas is invalid or null.
 */
function clearCanvas(canvas) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
        throw new Error('Invalid canvas element provided.');
    }
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Convert normalized coordinates to screen space.
 * 
 * Converts normalized (0-1) coordinates to pixel-based screen coordinates,
 * ensuring values remain within the bounds of the canvas dimensions.
 * 
 * @param {Object} elbow - Normalized elbow coordinates {x, y}.
 * @param {HTMLCanvasElement} canvas - Target canvas for mapping.
 * @returns {Object} Screen coordinates {x, y}.
 * @throws {Error} If the elbow object or canvas is invalid.
 */
function calculateHandPosition(elbow, canvas) {
    if (!elbow || typeof elbow.x !== 'number' || typeof elbow.y !== 'number') {
        throw new Error('Invalid elbow coordinates provided.');
    }
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
        throw new Error('Invalid canvas element provided.');
    }

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    return {
        x: clamp(elbow.x * canvas.width, 0, canvas.width),
        y: clamp(elbow.y * canvas.height, 0, canvas.height)
    };
}

/**
 * Draw a circular marker to represent the virtual hand.
 * 
 * Draws a circle at the given screen coordinates with customizable
 * size and color. This represents the visual marker for the virtual hand.
 * 
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D drawing context.
 * @param {Object} position - Screen coordinates {x, y}.
 * @param {Object} [style] - Optional styling for the marker.
 * @param {number} [style.radius=20] - Radius of the circle.
 * @param {string} [style.color='rgba(0, 255, 0, 0.6)'] - Fill color of the circle.
 * @throws {Error} If the drawing context or position is invalid.
 */
function drawHand(ctx, position, style = {}) {
    if (!ctx || typeof ctx.arc !== 'function') {
        throw new Error('Invalid canvas drawing context provided.');
    }
    if (!position || typeof position.x !== 'number' || typeof position.y !== 'number') {
        throw new Error('Invalid position provided for drawing.');
    }

    const { radius = 20, color = 'rgba(0, 255, 0, 0.6)' } = style;

    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

/**
 * Render the virtual hand visualization.
 * 
 * Orchestrates the rendering process by clearing the canvas, calculating
 * the hand's position, and drawing the hand marker. Ensures each frame
 * is rendered cleanly and handles errors gracefully.
 * 
 * @param {Object} elbow - Normalized elbow coordinates {x, y}.
 * @param {HTMLCanvasElement} canvas - Canvas element for rendering.
 * @param {Object} [style] - Optional styling for the hand marker.
 */
function renderVirtualHand(elbow, canvas, style = {}) {
    try {
        clearCanvas(canvas);
        const position = calculateHandPosition(elbow, canvas);
        const ctx = canvas.getContext('2d');
        drawHand(ctx, position, style);
    } catch (error) {
        console.error('Error rendering virtual hand:', error.message);
    }
}

export { clearCanvas, calculateHandPosition, drawHand, renderVirtualHand };
