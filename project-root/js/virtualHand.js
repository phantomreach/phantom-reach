/**
 * Virtual Hand Visualization Module
 * 
 * What it does:
 * Draws a virtual hand on a canvas based on detected elbow coordinates.
 * 
 * How:
 * - Clears the canvas before each frame
 * - Converts normalized coordinates to screen space
 * - Draws a circular marker representing the hand
 * 
 * Why:
 * Provides real-time visual feedback for phantom limb therapy.
 */

export function clearCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function renderVirtualHand(elbow, canvas, style = {}) {
    clearCanvas(canvas);
    const ctx = canvas.getContext('2d');
    const { x, y } = {
        x: elbow.x * canvas.width,
        y: elbow.y * canvas.height,
    };
    const { radius = 15, color = 'rgba(0, 255, 0, 0.6)' } = style;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}
