import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.responses import FileResponse
from ultralytics import YOLO

from starlette.middleware.cors import CORSMiddleware
from concurrent.futures import ThreadPoolExecutor
import requests
from pathlib import Path
import os

# Define your models and parameters
vehicle_model = YOLO("best.pt")

tracked_vehicles = {}

app = FastAPI()

# CORS configuration for allowing cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust to restrict origins if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_PATH = r"D:/Study/5th Semester/AI/Theory/trafficproject/System/public/"

@app.post("/process-images")
async def process_images(request: Request):
    try:
        # Parse the incoming JSON data
        payload = await request.json()

        if "imagesWithPoints" not in payload or not isinstance(payload["imagesWithPoints"], list):
            raise HTTPException(status_code=400, detail="Invalid data format. 'imagesWithPoints' must be a list.")

        labeled_images = []
        vehicle_counts = []  # To store the vehicle counts for each image

        for index, image_data in enumerate(payload["imagesWithPoints"], start=1):
            if "src" not in image_data:
                raise HTTPException(status_code=400, detail="Each image entry must have 'src'.")

            src = os.path.join(BASE_PATH, image_data["src"].lstrip("/"))
            points = image_data.get("points")
            # Load the image
            image = cv2.imread(src)
            if image is None:
                raise HTTPException(status_code=404, detail=f"Image not found at path: {src}")

            if points:
                if not isinstance(points, list) or len(points) != 4:
                    raise HTTPException(status_code=400, detail="'points' must be a list of exactly 4 coordinate dictionaries.")

                # Convert points to integers and crop the region
                pts = np.array([[p['x'], p['y']] for p in points], dtype=np.int32)
                rect = cv2.boundingRect(pts)
                x, y, w, h = rect
                cropped_image = image[y:y+h, x:x+w]
                pts_cropped = pts - [x, y]

                # Mask the cropped region
                mask = np.zeros(cropped_image.shape[:2], dtype=np.uint8)
                cv2.fillPoly(mask, [pts_cropped], 255)
                cropped_image = cv2.bitwise_and(cropped_image, cropped_image, mask=mask)
            else:
                cropped_image = image  # Use the entire image if points are not provided

            # Run YOLO detection
            results_model = vehicle_model.predict(cropped_image)
            labels = []
            vehicle_count = {}

            # Collect bounding boxes and labels
            for result in results_model:
                for box, label in zip(result.boxes.xyxy, result.boxes.cls):
                    x_min, y_min, x_max, y_max = map(int, box)
                    label_name = vehicle_model.names[int(label)]

                    # Adjust coordinates back to the original image if cropping was done
                    if points:
                        x_min += x
                        y_min += y
                        x_max += x
                        y_max += y

                    labels.append((x_min, y_min, x_max, y_max, label_name))
                    vehicle_count[label_name] = vehicle_count.get(label_name, 0) + 1

            vehicle_counts.append(vehicle_count)  # Store counts for this image
            # Draw bounding boxes on the original image
            for (x_min, y_min, x_max, y_max, label_name) in labels:
                color = (0, 255, 0)  # Green for bounding box
                cv2.rectangle(image, (x_min, y_min), (x_max, y_max), color, 2)
                cv2.putText(
                    image,
                    label_name,
                    (x_min, y_min - 10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.5,
                    color,
                    2,
                )

            # Add a border to the image
            border_color = (0, 0, 255)  # Red border
            bordered_image = cv2.copyMakeBorder(image, 10, 10, 10, 10, cv2.BORDER_CONSTANT, value=border_color)
            # Add the signal text
            signal_text = f"Signal {index}"
            cv2.putText(
                bordered_image,
                signal_text,
                (20, 50),
                cv2.FONT_HERSHEY_SIMPLEX,
                1,
                (255, 255, 255),
                2,
                cv2.LINE_AA,
            )

            labeled_images.append(bordered_image)  # Add labeled image to the list

        # Handle 3 or 4 images for a 2x2 layout
        if len(labeled_images) == 3:
            # Add a black image with "No Signal"
            no_signal_image = np.zeros_like(labeled_images[0])
            cv2.putText(
                no_signal_image,
                "No Signal",
                (no_signal_image.shape[1] // 4, no_signal_image.shape[0] // 2),
                cv2.FONT_HERSHEY_SIMPLEX,
                1,
                (255, 255, 255),
                2,
                cv2.LINE_AA,
            )
            labeled_images.append(no_signal_image)
        print("Hello World")

        # Create the combined image in 2x2 layout
        combined_image = None
        if len(labeled_images) in [2, 4]:
            rows = [
                cv2.hconcat(labeled_images[i:i+2])
                for i in range(0, len(labeled_images), 2)
            ]
            combined_image = cv2.vconcat(rows)
        else:
            raise HTTPException(status_code=400, detail="Only 2, 3, or 4 images are supported.")
        

        # Save the combined image
        combined_image_name = "combined_image.jpg"
        combined_image_path = os.path.join(
            "D:/Study/5th Semester/AI/Theory/trafficproject/System/public/assets",
            combined_image_name
        )
        cv2.imwrite(combined_image_path, combined_image)

        # Send the name of the combined image and vehicle counts to the frontend
        return {
            "message": "Images processed and combined successfully!",
            "combined_image": combined_image_name,
            "vehicle_counts": vehicle_counts,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing images: {str(e)}")
