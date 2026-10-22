import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'light' | 'ink' | 'glass' | 'outline';

interface BtnProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  variant?: Variant;
  size?: 'md' | 'sm';
  className?: string;
  /** Abre en otra pestana (WhatsApp, enlaces externos). */
  external?: boolean;
}

/** Boton rectangular con baldosa de icono a la izquierda: el boton del sistema. */
export function Btn({ href, icon, children, variant = 'light', size = 'md', className, external }: BtnProps) {
  const classes = cn(`btn-${variant}`, size === 'sm' && 'btn-sm', className);
  const content = (
    <>
      <span className="btn-tile">{icon}</span>
      <span>{children}</span>
    </>
  );
  if (external || href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
