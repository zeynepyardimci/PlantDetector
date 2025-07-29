import { useState, useRef } from 'react';
import axios from 'axios';

const demoImages = [
  '/images/H_64.png',
  '/images/M1_30.JPG',
  '/images/M4_1.jpeg',
  '/images/M6_3.jpg',
];

export default function InteractiveDemo() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Yeni: dosya olarak da tut
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Demo görsel seçildiğinde
  const handleDemoSelect = (img: string) => {
    setSelectedImage(img);
    setSelectedFile(null); // demo görsel dosya değil, url
    setPrediction(null);
  };

  // Dosya seçildiğinde
  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setSelectedFile(file);
    setSelectedImage(URL.createObjectURL(file));
    setPrediction(null);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  // Analiz butonuna basıldığında
  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setPrediction(null);

    try {
      let formData = new FormData();

      if (selectedFile) {
        formData.append('file', selectedFile);
      } else if (selectedImage) {
        // Demo görsel URL'sini blob'a çevir
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        // Blob'u file gibi kullanmak için yeni File oluştur
        const file = new File([blob], 'demo-image.png', { type: blob.type });
        formData.append('file', file);
      }

      const apiResponse = await axios.post(
        'http://localhost:8000/predict',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      setPrediction(
        `${apiResponse.data.prediction} (%${apiResponse.data.confidence.toFixed(
          2
        )})`
      );
    } catch (error) {
      console.error('Tahmin hatası:', error);
      setPrediction('Tahmin sırasında hata oluştu!');
    }

    setIsAnalyzing(false);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        İnteraktif Demo
      </h2>
      <p className="text-sm text-gray-700 dark:text-gray-300">
        Yaprak görselinizi yükleyin veya örneklerden birini seçin. “Analiz Et”
        butonuna tıklayarak yapraktaki olası hastalıkları veya besin
        eksikliklerini anında öğrenin.
      </p>

      <h3 className="text-md font-medium text-gray-800 dark:text-gray-100">
        Görsel
      </h3>

      {/* Demo Görseller */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {demoImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Demo Görsel ${i}`}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', img)}
            onClick={() => handleDemoSelect(img)}
            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
              selectedImage === img ? 'border-green-600' : 'border-transparent'
            } hover:border-green-500 transition`}
            title="Demo görseli yükle"
          />
        ))}
      </div>

      {/* Dropzone */}
      <div
        className="border-2 border-dashed border-gray-400 rounded-lg h-48 flex flex-col items-center justify-center bg-white dark:bg-gray-700 cursor-pointer"
        onDrop={(e) => {
          e.preventDefault();
          const url = e.dataTransfer.getData('text/plain');
          if (demoImages.includes(url)) {
            handleDemoSelect(url);
          } else {
            handleFiles(e.dataTransfer.files);
          }
        }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="upload"
          className="mb-2 h-8 w-8 text-gray-400 group-hover:text-emerald-500 dark:text-gray-500 dark:group-hover:text-emerald-400"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
          ></path>
        </svg>
        <p className="text-center text-sm text-gray-500 dark:text-gray-300">
          Görseli buraya sürükleyin veya tıklayarak yükleyin
          <br />
          <span className="text-xs">PNG, JPG, JPEG (max. 5MB)</span>
        </p>
      </div>

      {/* Önizlemeler */}
      {selectedImage && (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-4">
            <img
              src={selectedImage}
              alt="Seçilen Görsel"
              className="w-full h-72 object-cover rounded-lg border-2 border-green-500 cursor-pointer hover:brightness-110 transition"
              title="Analiz edilecek görsel"
              onClick={() => {
                /* opsiyonel: tıklayınca büyütebilirsin */
              }}
            />
          </div>
        </div>
      )}

      {/* Analiz Butonu */}
      <button
        onClick={handleAnalyze}
        disabled={!selectedImage || isAnalyzing}
        className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
          isAnalyzing
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        {isAnalyzing ? 'Analiz Ediliyor...' : 'Analiz Et'}
      </button>

      {/* Sonuç */}
      {prediction && (
        <div className="space-y-2">
          <h3 className="text-md font-medium text-gray-800 dark:text-gray-100">
            Tahmin Sonucu
          </h3>
          <p className="text-lg font-semibold text-green-700 dark:text-green-400">
            {prediction}
          </p>
        </div>
      )}
    </div>
  );
}
