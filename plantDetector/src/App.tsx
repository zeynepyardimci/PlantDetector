import { useEffect, useState } from 'react';
import Home from './components/Home';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white text-black dark:bg-gray-900 dark:text-white flex flex-col items-center justify-center">
      {/* Toggle Butonu */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="mb-8 px-4 py-2 rounded-full bg-green-400 text-black dark:bg-gray-800 dark:text-white font-semibold shadow"
      >
        {theme === 'dark' ? 'Gündüz Modu' : 'Gece Modu'}
      </button>
      <Home />
    </div>
  );
}
