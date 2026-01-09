'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Esperar a que el DOM esté completamente listo
    const handleLoadComplete = () => {
      // Dar un pequeño delay para asegurar que todo está renderizado
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    };

    // Si la página ya está cargada
    if (document.readyState === 'complete') {
      handleLoadComplete();
    } else {
      window.addEventListener('load', handleLoadComplete);
      return () => window.removeEventListener('load', handleLoadComplete);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        {/* Icono saltando */}
        <div className="relative">
          <div className="loader-icon">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
              </defs>
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        {/* Texto de carga */}
        <div className="text-center">
          <h2 className="text-xl font-space-grotesk font-semibold text-white mb-2">
            Cargando
            <span className="inline-block ml-1 w-5">
              <span className="dot-animation">.</span>
              <span className="dot-animation dot-animation-2">.</span>
              <span className="dot-animation dot-animation-3">.</span>
            </span>
          </h2>
          <p className="text-sm text-gray-400">Preparando tu experiencia</p>
        </div>

        {/* Barra de progreso */}
        <div className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full progress-bar"></div>
        </div>
      </div>
    </div>
  );
}
