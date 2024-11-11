
import cv2
import socket
import json
from ultralytics import YOLO

# Initialize YOLO and socket
model = YOLO("yolov8n.pt")  # Load fine-tuned model
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind(("localhost", 8080))
server_socket.listen(1)
print("Waiting for Unity connection...")

# Accept connection
conn, addr = server_socket.accept()
print(f"Connected to Unity at {addr}")

cap = cv2.VideoCapture(0)  # Access camera

while True:
    ret, frame = cap.read()
    if not ret:
        break

    results = model(frame)  # Run detection
    if results:  # Assuming results contain arm coordinates
        # Example: Extract bounding box or hand position coordinates
        for detection in results:
            x1, y1, x2, y2, _, _ = detection  # Replace with actual data structure
            hand_position = {"x": (x1 + x2) // 2, "y": (y1 + y2) // 2}

            # Send data as JSON
            conn.sendall((json.dumps(hand_position) + "\n").encode())

cap.release()
conn.close()
server_socket.close()
