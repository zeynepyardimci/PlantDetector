# 🌿 Plant Detector

Yapay zeka destekli **Plant Detector**, bitki yapraklarındaki hastalıkları ve besin eksikliklerini otomatik olarak teşhis eden bir görüntü sınıflandırma sistemidir. Hugging Face'in **ConvNeXt** modeli iyileştirilip kullanılarak geliştirilmiştir. Sistem, yapraktan alınan görsel verileri analiz ederek **9 farklı hastalık ve eksiklik türünü** yüksek doğrulukla sınıflandırabilir.

---

## 🎯 Amaç

Tarımda en sık karşılaşılan sorunlardan biri olan **geç kalınmış teşhis** problemini çözmeyi hedefler. Bu proje sayesinde:

- 🌱 Üreticiler erken müdahale şansı yakalar  
- 📈 Ürün verimliliği artar  
- ⚖️ Kimyasal ilaç kullanımı azalır  
- 🌍 Çevre dostu ve sürdürülebilir tarım teşvik edilir

---

## 🧠 Kullanılan Teknolojiler

| Teknoloji                  | Açıklama                                      |
|---------------------------|-----------------------------------------------|
| `Python`                  | Model geliştirme ve backend işlemleri         |
| `PyTorch`                 | Derin öğrenme modeli eğitimi                  |
| `Hugging Face Transformers` | ConvNeXt pretrained modeli kullanımı         |
| `scikit-learn`            | Değerlendirme metrikleri (Accuracy, F1-Score) |
| `Gradio`                  | Basit ve hızlı demo arayüzü                   |
| `React + TypeScript`      | Web arayüzü                                   |
| `TailwindCSS`             | Arayüz tasarımı                               |
| `Git LFS`                 | Büyük model dosyalarının versiyonlanması      |

---

## 🖼️ Sınıflandırılan Kategoriler

Model aşağıdaki 9 sınıfta eğitim almıştır:

1. Potassium Deficiency  
2. Manganese Deficiency  
3. Magnesium Deficiency  
4. Black Scorch  
5. Leaf Spots  
6. Fusarium Wilt 
7. Rachis Blight  
8. Parlatoria Blanchardi  
9. Healthy sample

---

# 🔗 Model Dosyaları
Model dosyaları büyük olduğundan GitHub'a yüklenmemiştir.
Aşağıdaki linklerden indirip proje klasöründeki ilgili yerlere koyman gerekmektedir:

[convnext-model-base](https://drive.google.com/drive/folders/1ifnvoGM4dCqdgiDbYrwYIRkHHa5W7yT7?usp=sharing)

[convnext-model3](https://drive.google.com/drive/folders/1hJsgCRZgDpPcoNsK-iUYCnDQbbXdhF3E?usp=sharing)

İndirip aşağıdaki dizinlere yerleştir:
```plaintext
PlantDetector/
├── convnext-model-base/
│   └── model.safetensors
└── convnext-model3/
    └── model.safetensors
```
---
## 🤝 Katkıda Bulun
Pull request'lere, issue açmaya her zaman açığım!
Projeyi forklayabilir, yeni sınıflar ekleyebilir veya mobil versiyon geliştirebilirsin.
---
## 📬 İletişim
Herhangi bir önerin veya sorunun varsa issue açmaktan çekinme!
💌 [zyardimci05@gmail.com]
GitHub: @zeynepyardimci
