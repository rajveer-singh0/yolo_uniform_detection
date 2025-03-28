
from flask import Flask, request, jsonify, render_template
import os
import numpy as np
from ultralytics import YOLO
from PIL import Image

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = "uploads"
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

# Load YOLO model
model = YOLO(r"C:\Users\rdpto\Desktop\piet_uniform_det\runs\detect\train2\weights\best.pt")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)

    # Read image
    image = Image.open(file_path)
    image = np.array(image)

    # Run YOLO detection
    results = model(image)
    detections = results[0].boxes
    class_labels = ["❌ Not Uniform", "✔️ Uniform"]  # Adjust based on dataset

    if len(detections) > 0:
        prediction = class_labels[int(detections.cls[0])]
    else:
        prediction = "❌ No uniform detected"

    return jsonify({"result": prediction, "file": file.filename})

if __name__ == "__main__":
    app.run(debug=True)
