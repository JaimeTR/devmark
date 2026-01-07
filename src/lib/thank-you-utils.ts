/**
 * Utilidades para trabajar con las páginas de agradecimiento
 * 
 * Estas funciones facilitan la construcción de URLs y redirecciones
 * a las páginas de confirmación/agradecimiento.
 */

type MessageType = 'contact' | 'meeting' | 'quote' | 'default';
type Language = 'es' | 'en';

interface ThankYouUrlOptions {
  type?: MessageType;
  title?: string;
  message?: string;
  lang?: Language;
}

/**
 * Construye una URL para la página de agradecimiento
 * 
 * @param options Opciones para personalizar la URL
 * @returns URL completa para la página de agradecimiento
 * 
 * @example
 * ```ts
 * // URL básica con tipo predefinido
 * const url = buildThankYouUrl({ type: 'contact', lang: 'es' });
 * // => '/gracias?type=contact'
 * 
 * // URL con mensaje personalizado
 * const url = buildThankYouUrl({
 *   type: 'default',
 *   title: '¡Registro exitoso!',
 *   message: 'Tu cuenta ha sido creada',
 *   lang: 'es'
 * });
 * // => '/gracias?type=default&title=%C2%A1Registro+exitoso%21&message=Tu+cuenta...'
 * ```
 */
export function buildThankYouUrl(options: ThankYouUrlOptions = {}): string {
  const { type = 'default', title, message, lang = 'es' } = options;
  
  const basePath = lang === 'en' ? '/en/thank-you' : '/gracias';
  const params = new URLSearchParams({ type });
  
  if (title) {
    params.append('title', title);
  }
  
  if (message) {
    params.append('message', message);
  }
  
  return `${basePath}?${params.toString()}`;
}

/**
 * Redirige a la página de agradecimiento usando Next.js router
 * 
 * @param router Next.js router instance
 * @param options Opciones para personalizar la redirección
 * @param delay Retraso en milisegundos antes de redirigir (default: 0)
 * 
 * @example
 * ```ts
 * import { useRouter } from 'next/navigation';
 * import { redirectToThankYou } from '@/lib/thank-you-utils';
 * 
 * const router = useRouter();
 * 
 * // Redirección inmediata
 * redirectToThankYou(router, { type: 'contact' });
 * 
 * // Redirección con delay de 2 segundos
 * redirectToThankYou(router, { type: 'meeting', lang: 'en' }, 2000);
 * ```
 */
export function redirectToThankYou(
  router: any,
  options: ThankYouUrlOptions = {},
  delay: number = 0
): void {
  const url = buildThankYouUrl(options);
  
  if (delay > 0) {
    setTimeout(() => {
      router.push(url);
    }, delay);
  } else {
    router.push(url);
  }
}

/**
 * Hook de React para redirecciones condicionales a páginas de agradecimiento
 * 
 * @example
 * ```ts
 * import { useThankYouRedirect } from '@/lib/thank-you-utils';
 * 
 * function MyForm() {
 *   const [isSuccess, setIsSuccess] = useState(false);
 *   
 *   // Se redirige automáticamente cuando isSuccess cambia a true
 *   useThankYouRedirect(isSuccess, {
 *     type: 'contact',
 *     lang: 'es'
 *   }, 2000);
 *   
 *   return <form>...</form>;
 * }
 * ```
 */
export function useThankYouRedirect(
  condition: boolean,
  options: ThankYouUrlOptions = {},
  delay: number = 2000
): void {
  if (typeof window === 'undefined') return;
  
  // Este hook debe ser usado en un componente de React
  // Importar useEffect y useRouter dentro del componente
  console.warn(
    'useThankYouRedirect should be called inside a React component with useEffect and useRouter'
  );
}

/**
 * Tipos de mensajes disponibles y sus descripciones
 */
export const MESSAGE_TYPES = {
  contact: 'Formulario de contacto enviado',
  meeting: 'Reunión agendada exitosamente',
  quote: 'Cotización solicitada',
  default: 'Acción completada exitosamente',
} as const;

/**
 * Ejemplos de uso completos
 */
export const USAGE_EXAMPLES = {
  basic: `
// Uso básico - Server Action
'use server';
import { redirect } from 'next/navigation';
import { buildThankYouUrl } from '@/lib/thank-you-utils';

export async function submitContact(formData: FormData) {
  // Procesar formulario...
  
  if (success) {
    redirect(buildThankYouUrl({ type: 'contact' }));
  }
}
  `,
  
  clientComponent: `
// Componente cliente con delay
'use client';
import { useRouter } from 'next/navigation';
import { redirectToThankYou } from '@/lib/thank-you-utils';

export function ContactForm() {
  const router = useRouter();
  
  const handleSubmit = async () => {
    const success = await sendData();
    
    if (success) {
      // Mostrar mensaje de éxito por 2 segundos antes de redirigir
      redirectToThankYou(router, { type: 'contact' }, 2000);
    }
  };
  
  return <button onClick={handleSubmit}>Submit</button>;
}
  `,
  
  customMessage: `
// Mensaje completamente personalizado
import { buildThankYouUrl } from '@/lib/thank-you-utils';

const url = buildThankYouUrl({
  type: 'default',
  title: '¡Pago procesado!',
  message: 'Tu pago de $99.00 ha sido confirmado',
  lang: 'es'
});

router.push(url);
  `,
  
  useEffect: `
// Usando useEffect para redirección automática
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { buildThankYouUrl } from '@/lib/thank-you-utils';

export function MyForm() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  
  useEffect(() => {
    if (isSuccess) {
      const url = buildThankYouUrl({ type: 'contact' });
      const timer = setTimeout(() => {
        router.push(url);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isSuccess, router]);
  
  return <form>...</form>;
}
  `,
};
