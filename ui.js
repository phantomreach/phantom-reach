/**
 * This file manages the User Interface (UI) setup for the application.
 *
 * What it does:
 * - Initializes the UI elements, including:
 *   1. A dropdown for selecting amputation type.
 *   2. A button for enabling/disabling the webcam feed.
 *   3. A canvas overlay for visualizing pose landmarks and virtual hands.
 *
 * How it works:
 * - Each UI component is created and configured in small, modular functions.
 * - All elements are appended to a parent container or directly to the DOM.
 *
 * Why:
 * - To provide an interactive interface for users to set preferences and view
 *   the application's outputs in a structured manner.
 */

/**
 * Initializes the user interface by creating and setting up UI components.
 * 
 * This function handles the setup of:
 * - A dropdown for selecting amputation type.
 * - A button for toggling the webcam feed.
 * - A canvas for displaying pose landmarks and visual elements.
 */
function initializeUI() {
    const container = createContainer();
    createAmputationDropdown(container);
    createWebcamButton(container);
    createOverlayCanvas();
}

/**
 * Creates a container element to hold all UI components and adds it to the DOM.
 * 
 * Returns:
 * - {HTMLElement}: The container element where other UI components will be added.
 */
function createContainer() {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.margin = '20px';
    document.body.appendChild(container);
    return container;
}

/**
 * Creates a dropdown menu for selecting the user's amputation type and adds it to the specified container.
 * 
 * Args:
 * - container (HTMLElement): The parent element where the dropdown will be appended.
 * 
 * Functionality:
 * - Populates the dropdown with options: "Left Arm", "Right Arm", and "Both".
 * - Ensures accessibility by adding an `aria-label` for screen readers.
 */
function createAmputationDropdown(container) {
    const dropdown = document.createElement('select');
    dropdown.id = 'amputationType';
    dropdown.setAttribute('aria-label', 'Select amputation type');
    const options = ['Left Arm', 'Right Arm', 'Both'];

    options.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        dropdown.appendChild(option);
    });

    container.appendChild(dropdown);
}

/**
 * Creates a button for enabling/disabling the webcam and adds it to the specified container.
 * 
 * Args:
 * - container (HTMLElement): The parent element where the button will be appended.
 * 
 * Functionality:
 * - Toggles the webcam state (enabled/disabled) when clicked.
 * - Updates the button text dynamically.
 * - Ensures accessibility by adding an `aria-label`.
 */
function createWebcamButton(container) {
    const webcamButton = document.createElement('button');
    webcamButton.id = 'enableWebcam';
    webcamButton.textContent = 'Enable Webcam';
    webcamButton.setAttribute('aria-label', 'Enable or disable webcam');
    
    // Toggle the webcam state and update button text
    webcamButton.addEventListener('click', () => {
        const isWebcamEnabled = webcamButton.textContent.includes('Enable');
        webcamButton.textContent = isWebcamEnabled ? 'Disable Webcam' : 'Enable Webcam';
        console.log(`Webcam ${isWebcamEnabled ? 'enabled' : 'disabled'}`);
    });

    container.appendChild(webcamButton);
}

/**
 * Creates a canvas element for rendering pose landmarks and virtual hands, and adds it to the DOM.
 * 
 * Functionality:
 * - Configures the canvas dimensions to 1280x720 pixels.
 * - Positions the canvas absolutely to overlay other elements.
 * - Ensures accessibility by adding an `aria-label`.
 */
function createOverlayCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'overlayCanvas';
    canvas.width = 1280;
    canvas.height = 720;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.border = '2px solid black';
    canvas.setAttribute('aria-label', 'Canvas for visualizing pose landmarks');
    document.body.appendChild(canvas);
}
