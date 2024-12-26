/**
 * Virtual Hand Visualization Module
 * Renders a virtual hand based on detected elbow coordinates.
 */
export function clearCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function renderVirtualHand(elbow, canvas, style = {}) {
    try {
        clearCanvas(canvas);
        const ctx = canvas.getContext('2d');
        const { x, y } = {
            x: elbow.x * canvas.width,
            y: elbow.y * canvas.height,
        };
        ctx.beginPath();
        ctx.arc(x, y, style.radius || 20, 0, 2 * Math.PI);
        ctx.fillStyle = style.color || 'rgba(0, 255, 0, 0.6)';
        ctx.fill();
    } catch (error) {
        console.error('Error rendering virtual hand:', error.message);
    }
}

