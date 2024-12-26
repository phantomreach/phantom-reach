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

export async function initializePoseLandmarker() {
    const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm'
    );
    return await PoseLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: '../assets/models/pose_landmarker.task' },
        runningMode: 'VIDEO',
        numPoses: 1,
        minPoseDetectionConfidence: 0.5,
        minPosePresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
    });
}

export async function detectElbows(poseLandmarker, video) {
    const results = await poseLandmarker.detectForVideo(video, performance.now());
    if (results && results.landmarks.length > 0) {
        const landmarks = results.landmarks[0];
        return {
            leftElbow: landmarks[13],
            rightElbow: landmarks[14],
        };
    }
    return null;
}
