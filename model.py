# from ultralytics import YOLO

# # Load YOLOv8 model
# model = YOLO("yolov8n.pt")  # Correct model name

# # Train the model
# train_result = model.train(
#     data=r"C:\Users\rdpto\Desktop\piet_uniform_det\data.yaml",  # Use raw string (r"")
#     epochs=5,
#     imgsz=640,
#     device=0  # Ensure CUDA is available, or use 'cpu' if no GPU
# )


from ultralytics import YOLO

if __name__ == '__main__':
    model = YOLO("yolo11n.pt")  # Load the YOLOv8 nano model

    # Train the model
    model.train(
        data="C:/Users/rdpto/Desktop/piet_uniform_det/data.yaml",  # Path to dataset YAML
        epochs=5,  # Number of training epochs
        batch=16,  # Batch size
        imgsz=640,  # Image size
        device=0,  # Use GPU 0
        name="train",  # Experiment name
        pretrained=True,  # Use pretrained weights
        workers=0  # Set workers to 0 to avoid multiprocessing issues on Windows
    )
