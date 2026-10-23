import { Fragment, type ReactNode } from 'react';

/**
 * Titular que se revela palabra por palabra al cruzar la pantalla (solo CSS, ver
 * .reveal-words en globals.css). Las partes en `em` salen en la serif cursiva.
 * Ejemplo: parts={['Un equipo chico', { em: 'a proposito' }, 'que responde']}.
 */
export function RevealWords({
  parts,
  as: Tag = 'h2',
  className,
}: {
  parts: readonly (string | { readonly em: string })[];
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
}) {
  const words = (text: string, keyBase: string): ReactNode[] =>
    text
      .split(/\s+/)
      .filter(Boolean)
      .map((w, i) => (
        <Fragment key={`${keyBase}-${i}`}>
          <span className="w">{w}</span>{' '}
        </Fragment>
      ));

  return (
    <Tag className={`reveal-words ${className ?? ''}`}>
      {parts.map((part, i) =>
        typeof part === 'string' ? (
          <Fragment key={i}>{words(part, String(i))}</Fragment>
        ) : (
          <em key={i}>{words(part.em, `e${i}`)}</em>
        ),
      )}
    </Tag>
  );
}
