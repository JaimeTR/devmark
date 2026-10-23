import { Fragment } from 'react';
import type { TitleParts } from '@/content/home';

/** Pinta un titular en partes: las `{ em }` salen en la serif cursiva. */
export function TitleText({ parts }: { parts: TitleParts }) {
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          {typeof part === 'string' ? part : <em>{part.em}</em>}
        </Fragment>
      ))}
    </>
  );
}
