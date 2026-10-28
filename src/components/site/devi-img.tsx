/* eslint-disable @next/next/no-img-element -- SVG fijo y diminuto: next/image no lo optimiza y el recorte necesita la etiqueta pura */
// Devi, la mascota de DEVMARK (guia: devi.devmarkpe.com/guia). Aqui va como imagen SVG fija, una pose por estado,
// copiada en public/marca/devi: sin JavaScript y sin cargar nada de otro dominio.
// La version base se recorta a la cabeza (el lienzo de Devi es de 300 x 290 y la cabeza ocupa la mitad).
type Props = {
  version?: 'base' | 'patitas' | 'completo';
  estado: 'reposo' | 'pensando' | 'escribiendo' | 'exito' | 'error' | 'saludo' | 'buscando' | 'triste';
  tamano: number;
  /** Texto para lectores de pantalla; vacio la vuelve decorativa (el estado debe ir tambien en texto). */
  alt?: string;
  className?: string;
};

const LIENZO = { ancho: 300, alto: 290 };
const VENTANA = { x: 36, y: 36, lado: 228 };

export function DeviImg({ version = 'base', estado, tamano, alt = '', className }: Props) {
  const src = `/marca/devi/devi-${version}-${estado}.svg`;

  if (version !== 'base') {
    return <img src={src} alt={alt} width={tamano} height={Math.round((tamano * LIENZO.alto) / LIENZO.ancho)} className={className} />;
  }

  const k = tamano / VENTANA.lado;
  return (
    <span className={className} style={{ position: 'relative', display: 'block', width: tamano, height: tamano, overflow: 'hidden' }}>
      <img
        src={src}
        alt={alt}
        width={LIENZO.ancho * k}
        height={LIENZO.alto * k}
        style={{ position: 'absolute', left: -VENTANA.x * k, top: -VENTANA.y * k, maxWidth: 'none', width: LIENZO.ancho * k, height: LIENZO.alto * k }}
      />
    </span>
  );
}
