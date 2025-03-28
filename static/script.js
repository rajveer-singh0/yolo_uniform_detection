// function uploadImage() {
//     let input = document.getElementById('imageUpload');
//     let file = input.files[0];

//     if (!file) {
//         alert("Please select an image!");
//         return;
//     }

//     let formData = new FormData();
//     formData.append("image", file);

//     fetch("/predict", {
//         method: "POST",
//         body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//         document.getElementById("result").innerText = "Prediction: " + data.result;
//     })
//     .catch(error => console.error("Error:", error));
// }

// function captureImage() {
//     let video = document.getElementById('camera');
//     let canvas = document.getElementById('canvas');
//     let context = canvas.getContext('2d');

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);

//     canvas.toBlob(blob => {
//         let formData = new FormData();
//         formData.append("image", blob, "capture.jpg");

//         fetch("/predict", {
//             method: "POST",
//             body: formData
//         })
//         .then(response => response.json())
//         .then(data => {
//             document.getElementById("result").innerText = "Prediction: " + data.result;
//         })
//         .catch(error => console.error("Error:", error));
//     });
// }

// navigator.mediaDevices.getUserMedia({ video: true })
//     .then(stream => {
//         document.getElementById('camera').srcObject = stream;
//     })
//     .catch(error => console.error("Camera error:", error));





// .................code 2.. ,...........................




// document.addEventListener("DOMContentLoaded", function () {
//     const dropArea = document.getElementById("drop-area");

//     // Drag and Drop
//     dropArea.addEventListener("dragover", (event) => {
//         event.preventDefault();
//         dropArea.style.border = "2px solid green";
//     });

//     dropArea.addEventListener("dragleave", () => {
//         dropArea.style.border = "2px dashed gray";
//     });

//     dropArea.addEventListener("drop", (event) => {
//         event.preventDefault();
//         dropArea.style.border = "2px dashed gray";
//         const file = event.dataTransfer.files[0];
//         uploadToServer(file);
//     });
// });

// // Upload Image
// function uploadImage() {
//     let fileInput = document.getElementById("imageUpload");
//     if (fileInput.files.length > 0) {
//         uploadToServer(fileInput.files[0]);
//     } else {
//         alert("Please select a file!");
//     }
// }

// // Capture Image
// function captureImage() {
//     let video = document.getElementById("camera");
//     let canvas = document.getElementById("canvas");
//     let context = canvas.getContext("2d");

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);

//     canvas.toBlob((blob) => {
//         let file = new File([blob], "captured.jpg", { type: "image/jpeg" });
//         uploadToServer(file);
//     }, "image/jpeg");
// }

// // Upload to Flask Server
// function uploadToServer(file) {
//     let formData = new FormData();
//     formData.append("image", file);

//     fetch("/predict", {
//         method: "POST",
//         body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//         document.getElementById("result").innerText = "Prediction: " + data.result;
//     })
//     .catch(error => console.error("Error:", error));
// }

// // Access Camera
// navigator.mediaDevices.getUserMedia({ video: true })
//     .then((stream) => {
//         document.getElementById("camera").srcObject = stream;
//     })
//     .catch((err) => console.error("Error accessing camera:", err));





// .........................code 3.......................



document.getElementById("imageUpload").addEventListener("change", function(event) {
    sendImage(event.target.files[0]);
});

document.getElementById("drag-drop-area").addEventListener("dragover", function(event) {
    event.preventDefault();
    this.style.background = "#e0e0e0";
});

document.getElementById("drag-drop-area").addEventListener("dragleave", function(event) {
    this.style.background = "white";
});

document.getElementById("drag-drop-area").addEventListener("drop", function(event) {
    event.preventDefault();
    this.style.background = "white";
    let file = event.dataTransfer.files[0];
    sendImage(file);
});

function sendImage(file) {
    let formData = new FormData();
    formData.append("image", file);

    fetch("/predict", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        let resultText = document.getElementById("result-text");
        let resultIcon = document.getElementById("result-icon");

        if (data.result === "Uniform") {
            resultText.innerText = "✅ Uniform Detected!";
            resultIcon.innerHTML = "🎓";  // Graduation Cap Icon
        } else {
            resultText.innerText = "❌ Not a Uniform";
            resultIcon.innerHTML = "🚫";  // No Entry Icon
        }

        document.getElementById("result-popup").style.display = "flex";
    });
}

function startCamera() {
    let video = document.getElementById("camera");
    video.style.display = "block";
    document.getElementById("capture-btn").style.display = "block";

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        });
}

function captureImage() {
    let video = document.getElementById("camera");
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    video.srcObject.getTracks().forEach(track => track.stop());
    video.style.display = "none";
    document.getElementById("capture-btn").style.display = "none";

    canvas.toBlob(blob => {
        sendImage(blob);
    }, "image/jpeg");
}

function closePopup() {
    document.getElementById("result-popup").style.display = "none";
}
