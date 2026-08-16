'use client';

import { useEffect, useRef } from 'react';
import { AsciiWordmarkRenderer } from './renderer';

interface AsciiWordmarkBackgroundProps {
  word: string;
  inkColor?: string;
  className?: string;
}

export function AsciiWordmarkBackground({ word, inkColor = '#35347B', className }: AsciiWordmarkBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let instance: AsciiWordmarkRenderer | null = null;
    try {
      instance = new AsciiWordmarkRenderer(host, { word, inkColor });
      const mounted = instance.mount();
      if (mounted) instance.start();
    } catch (err) {
      console.warn('[ascii-wordmark] failed to mount, skipping background effect:', err);
    }

    return () => {
      instance?.dispose();
    };
  }, [word, inkColor]);

  return <div ref={hostRef} className={className} aria-hidden="true" />;
}
