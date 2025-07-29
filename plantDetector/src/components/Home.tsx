import InteractiveDemo from './InteractiveDemo';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white flex flex-col items-center justify-center p-6 space-y-8">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sol Panel */}
        <div className="space-y-6">
          {/* Proje Açıklaması Kartı */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-4 flex flex-col items-center text-center">
            <div className="rounded-full bg-emerald-100 p-6 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
              <svg
                aria-hidden="true"
                focusable="false"
                className="h-12 w-12"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                fill="currentColor"
              >
                <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mt-4">
              Bitki Hastalıkları Sınıflandırması için Derin Öğrenme Tabanlı
              Görüntü Analizi
            </h1>

            <p className="text-sm text-gray-700 dark:text-gray-300">
              Bu proje, bitki yapraklarındaki hastalıkları ve besin
              eksikliklerini hızlı, doğru ve otomatik şekilde tespit etmek için
              tasarlandı. raw klasöründe 751 adet görüntü ve 9 farklı hastalık
              ya da sağlıklı örnek sınıfı bulunuyor. Kullanıcı sisteme herhangi
              bir yaprak resmi yüklediğinde, arka planda çalışan Hugging Face’in
              güçlü ve yenilikçi ConvNeXt modeli, görseli anında analiz edip
              hastalığı yüksek doğrulukla sınıflandırır. Bu sayede, tarımda
              erken teşhis mümkün olur, üretici zaman kaybetmeden müdahale eder
              ve verimlilik artar. Proje, yapay zekanın tarımda gerçek ve somut
              fayda sağlayabileceğinin canlı kanıtıdır.
            </p>
          </div>

          {/* Geliştirici Ekibi Kartı */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Geliştirici Ekibi</h2>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>Doç. Dr. Muammer Türkoğlu</li>
              <li>Zeynep Yardımcı</li>
            </ul>
          </div>
        </div>

        {/* Sağ Panel */}

        <InteractiveDemo />
      </div>
    </div>
  );
}
