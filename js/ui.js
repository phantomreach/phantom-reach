/**
 * UI Initialization Module
 * 
 * What it does:
 * Sets up the user interface for the application, including dropdowns,
 * buttons, and a canvas for visualizing pose detection outputs.
 * 
 * How:
 * - Creates and styles DOM elements dynamically
 * - Ensures accessibility and modularity
 * 
 * Why:
 * Provides a clear and interactive interface for users.
 */

export function initializeUI() {
    const container = createContainer();
    createAmputationDropdown(container);
    createWebcamButton(container);
    createOverlayCanvas();
}

function createContainer() {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.margin = '20px';
    document.body.appendChild(container);
    return container;
}

function createAmputationDropdown(container) {
    const dropdown = document.createElement('select');
    dropdown.id = 'amputationType';
    const options = ['Left Arm', 'Right Arm', 'Both'];
    options.forEach((type) => {
        const option = document.createElement('option');
        option.value = type.toLowerCase();
        option.textContent = type;
        dropdown.appendChild(option);
    });
    container.appendChild(dropdown);
}

function createWebcamButton(container) {
    const button = document.createElement('button');
    button.id = 'enableWebcam';
    button.textContent = 'Enable Webcam';
    container.appendChild(button);
}

function createOverlayCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'overlayCanvas';
    canvas.width = 640;
    canvas.height = 480;
    canvas.style.border = '2px solid black';
    document.body.appendChild(canvas);
}

