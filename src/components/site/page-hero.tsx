import type { ReactNode } from 'react';
import type { TitleParts } from '@/content/home';
import { TitleText } from './title-text';

interface PageHeroProps {
  title: TitleParts | string;
  description?: ReactNode;
  actions?: ReactNode;
  /** Contenido extra bajo los botones (filtros, datos). */
  children?: ReactNode;
  /** Columna derecha opcional (ilustracion, formulario). */
  aside?: ReactNode;
}

/** Cabecera de pagina: panel tinta con titular grande y la barra de vidrio encima. */
export function PageHero({ title, description, actions, children, aside }: PageHeroProps) {
  return (
    <section data-tone="dark" className="panel-ink mt-2 sm:mt-3">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-20 h-[520px] w-[520px] rounded-full bg-primary/35 blur-[130px]" />
      <div className={`panel-inner relative grid grid-cols-1 items-end gap-12 pb-14 pt-32 lg:pb-20 lg:pt-40 ${aside ? 'lg:grid-cols-[1.2fr_1fr]' : ''}`}>
        <div className="hero-in">
          <h1 className="display max-w-[16ch] text-[clamp(2.75rem,6.6vw,5.5rem)]">{typeof title === 'string' ? title : <TitleText parts={title} />}</h1>
          {description && <p className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-ink-muted">{description}</p>}
          {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
          {children}
        </div>
        {aside}
      </div>
    </section>
  );
}
