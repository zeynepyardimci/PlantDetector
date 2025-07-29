from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from transformers import ConvNextForImageClassification, ConvNextImageProcessor
from PIL import Image
import io
import torch
import torch.nn.functional as F

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_path = "C:/PlantDetector/convnext-model-base"
try:
    model = ConvNextForImageClassification.from_pretrained(model_path)
    processor = ConvNextImageProcessor.from_pretrained(model_path)
    model.eval()
    print("✅ Model başarıyla yüklendi.")
except Exception as e:
    print(f"❌ Model yüklenemedi: {e}")
    model = None
    processor = None

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not model or not processor:
        return JSONResponse(status_code=500, content={"error": "Model yüklenemedi."})

    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        inputs = processor(images=image, return_tensors="pt")

        # Model etiketi ve id ilişkisini yazdır
        print("Model id2label mapping:", model.config.id2label)

        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits

            probs = F.softmax(logits, dim=1)
            max_prob, predicted_class_idx = torch.max(probs, dim=1)

            max_prob_float = max_prob.item()
            confidence_percent = round(max_prob_float * 100, 2)

            threshold = 0.2  # %20 eşiği
            if max_prob_float < threshold:
                predicted_label = "Bilinmeyen veya Tanımsız"
            else:
                predicted_label = model.config.id2label.get(predicted_class_idx.item(), "Bilinmeyen")

        print(f"Prediction: {predicted_label} ({confidence_percent}%)")

        return {
            "prediction": predicted_label,
            "confidence": confidence_percent
        }

    except Exception as e:
        print(f"Tahmin sırasında hata: {e}")
        return JSONResponse(
            status_code=500,
            content={"error": f"Tahmin sırasında hata oluştu: {str(e)}"}
        )
