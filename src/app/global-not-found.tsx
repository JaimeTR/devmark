import './globals.css';
import type { Metadata } from 'next';
import { RaizDelSitio } from '@/components/site/raiz-del-sitio';
import Pagina404 from '@/components/site/pagina-404';

export const metadata: Metadata = {
  title: 'Página no encontrada | Devmark',
  robots: { index: false, follow: true },
};

/** 404 de las direcciones que no pertenecen a ningun idioma: tiene su propio <html>. La pagina elige el idioma por la ruta. */
export default function GlobalNotFound() {
  return (
    <RaizDelSitio lang="es">
      <Pagina404 />
    </RaizDelSitio>
  );
}
