
# Virtual Hand Game Environment Setup

This setup allows you to create a game environment where object detection of amputated limbs is handled by Python, 
while Unity receives and displays the data, overlaying a virtual hand on the detected limb position.

## Requirements

### Python Environment

1. Python 3.7 or higher
2. Install necessary packages:
    ```bash
    pip install ultralytics opencv-python
    ```
3. A fine-tuned YOLOv8 model (`yolov8n.pt` or a custom-trained model) that detects amputated limbs.

### Unity Environment

1. Unity 2020.3 or higher recommended.
2. [OpenCV for Unity Plugin](https://assetstore.unity.com/packages/tools/integration/opencv-for-unity-21088) (optional, for additional image processing in Unity).
3. Basic knowledge of Unity for setting up the game environment and attaching scripts.

## Files

- `python_object_detection.py`: Python script for running YOLO object detection on a live camera feed and sending coordinates to Unity over a TCP socket.
- `TCPClient.cs`: Unity C# script that acts as a TCP client, receiving coordinates from the Python script and updating the virtual hand's position.

## Setup and Usage

### 1. Python Script (Object Detection)

1. **Edit the model path** in `python_object_detection.py` if using a custom-trained YOLO model.
2. Run the script:
    ```bash
    python python_object_detection.py
    ```
3. The script starts a TCP server on `localhost:8080`, capturing live video and sending detected coordinates.

### 2. Unity Script (Virtual Hand Display)

1. **Add `TCPClient.cs`** to your Unity project.
   - Create an empty GameObject in Unity (e.g., `HandController`) and attach `TCPClient.cs` to it.
2. **Set up the Virtual Hand**:
   - Create a 3D model for the virtual hand and assign it to the `virtualHand` field in the script Inspector.
3. **Set Up Camera**:
   - Ensure the `Main Camera` is set up in the correct position to view the player and virtual hand.

### 3. Running the Game

1. Start the `python_object_detection.py` script to begin the object detection server.
2. Launch the Unity game. The `TCPClient` script will connect to the Python server and update the virtual hand based on the detected coordinates.

### Additional Notes

- **Ensure the Unity and Python scripts are synchronized**: Start the Python detection script first to ensure Unity can connect immediately.
- **Error Handling**: If there’s a connection issue, ensure the server IP/port match between the scripts.

## Troubleshooting

- **Connection Errors**: Ensure Python is running before starting Unity, and check that both use the same `localhost` IP and port `8080`.
- **Slow Performance**: Real-time communication may be affected by CPU/GPU capacity. Optimize by reducing camera resolution or using a more powerful computer.

---

By following these steps, you’ll have a working environment where Unity displays a virtual hand overlay based on real-time detection data from Python.
