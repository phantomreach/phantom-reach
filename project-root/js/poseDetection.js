/**
 * PoseDetection Module
 * Handles real-time pose detection and landmark extraction from webcam feed using MediaPipe's PoseLandmarker.
 */
import { FilesetResolver, PoseLandmarker } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest';

export async function initializePoseLandmarker() {
    const vision = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm');
    return await PoseLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: './assets/models/pose_landmarker.task' },
        runningMode: 'VIDEO',
        numPoses: 1,
        minPoseDetectionConfidence: 0.5,
        minPosePresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
    });
}

export async function detectElbows(poseLandmarker, video) {
    const results = await poseLandmarker.detectForVideo(video, performance.now());
    if (!results || !results.landmarks || !results.landmarks.length) return null;

    const landmarks = results.landmarks[0];
    return {
        leftElbow: { x: landmarks[13].x, y: landmarks[13].y },
        rightElbow: { x: landmarks[14].x, y: landmarks[14].y },
    };
}
