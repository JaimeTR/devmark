'use client';

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const WHATSAPP_NUMBER = '+51975646074';
const WHATSAPP_MESSAGE_ES = 'Hola DevMark, me gustaría obtener más información sobre sus servicios.';
const WHATSAPP_MESSAGE_EN = 'Hello DevMark, I would like to get more information about your services.';

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const isEn = pathname?.startsWith('/en');

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const message = isEn ? WHATSAPP_MESSAGE_EN : WHATSAPP_MESSAGE_ES;
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={isEn ? 'Chat on WhatsApp' : 'Chatea por WhatsApp'}
      className={`
        fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50
        [margin-bottom:env(safe-area-inset-bottom)] [margin-right:env(safe-area-inset-right)]
        flex items-center justify-center
        h-14 w-14
        min-h-14 min-w-14 rounded-full
        bg-[#25D366] text-white
        shadow-lg shadow-[#25D366]/30
        hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40
        active:scale-95
        transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
      `}
    >
      <MessageCircle className="h-7 w-7" />
      <span className="sr-only">{isEn ? 'Chat on WhatsApp' : 'Chatea por WhatsApp'}</span>
    </Link>
  );
}
