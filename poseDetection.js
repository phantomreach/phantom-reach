/**
 * PoseDetection Module
 * 
 * What it does:
 * Handles real-time pose detection and landmark extraction from webcam feed
 * using MediaPipe's PoseLandmarker.
 * 
 * How:
 * - Processes video frames using MediaPipe
 * - Extracts specific body landmarks (elbows)
 * - Normalizes coordinates for downstream processing
 * 
 * Why:
 * To track user's arm movements in real-time for phantom limb therapy
 */

async function initializePoseLandmarker() {
    /**
     * Initializes MediaPipe PoseLandmarker.
     * Loads the model and prepares it for video-based processing.
     * 
     * @returns {PoseLandmarker} Configured pose detection instance
     */
    const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm'
    );
    return await PoseLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: 'pose_landmarker.task' },
        runningMode: 'VIDEO',
        numPoses: 1,
        minPoseDetectionConfidence: 0.5,
        minPosePresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
    });
}

async function processVideoFrame(poseLandmarker, video) {
    /**
     * Processes a single video frame for pose landmarks.
     * 
     * @param {PoseLandmarker} poseLandmarker - Initialized instance
     * @param {HTMLVideoElement} video - Video feed element
     * @returns {Object|null} Raw landmark results or null
     */
    return poseLandmarker.detectForVideo(video, performance.now());
}

function extractElbowCoordinates(landmarks) {
    /**
     * Extracts elbow positions from landmark data.
     * 
     * @param {Array} landmarks - Pose landmark array
     * @returns {Object} Elbow coordinates
     */
    const leftElbow = landmarks[13];
    const rightElbow = landmarks[14];
    return {
        leftElbow: { x: leftElbow.x, y: leftElbow.y, z: leftElbow.z },
        rightElbow: { x: rightElbow.x, y: rightElbow.y, z: rightElbow.z },
    };
}

async function detectElbows(poseLandmarker, video) {
    /**
     * Detects elbow positions from a video feed.
     * 
     * @param {PoseLandmarker} poseLandmarker - Pose detection instance
     * @param {HTMLVideoElement} video - Video feed element
     * @returns {Object|null} Elbow coordinates or null
     */
    const results = await processVideoFrame(poseLandmarker, video);
    return results ? extractElbowCoordinates(results.landmarks[0]) : null;
}
