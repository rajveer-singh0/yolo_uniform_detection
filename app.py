from flask import Flask, request, jsonify, render_template
import os
import numpy as np
from ultralytics import YOLO, settings
from PIL import Image

app = Flask(__name__)

# 🔹 Fix 1: Set Uploads Folder & Create It If Needed
app.config["UPLOAD_FOLDER"] = "uploads"
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

# 🔹 Fix 2: Disable Ultralytics Online Sync (Prevents API Rate Limit Issues)
settings.update({"sync": False, "runs_dir": "runs"})

# 🔹 Fix 3: Ensure Model Path Exists & Is Relative
MODEL_PATH = "weights/best.pt"  # Place 'best.pt' inside 'weights/' folder

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"⚠️ Model file not found: {MODEL_PATH}")

# 🔹 Load YOLO Model
model = YOLO(MODEL_PATH)

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

    # 🔹 Ensure results exist before accessing them
    detections = results[0].boxes if len(results) > 0 else []

    class_labels = ["❌ Not Uniform", "✔️ Uniform"]  # Adjust based on dataset

    if len(detections) > 0:
        prediction = class_labels[int(detections.cls[0])]
    else:
        prediction = "❌ No uniform detected"

    return jsonify({"result": prediction, "file": file.filename})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
