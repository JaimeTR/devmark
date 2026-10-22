'use client';

import type React from 'react';
import Cal from '@calcom/embed-react';
import { CAL_LINK } from '@/lib/contact';

/** Calendario de Cal.com embebido: el visitante elige dia y hora sin salir de la pagina. */
export function CalInline({ className }: { className?: string }) {
  return (
    <Cal
      namespace="devmark-contacto"
      calLink={CAL_LINK}
      className={className}
      style={{ width: '100%', height: '100%', overflow: 'auto' }}
      config={
        {
          layout: 'month_view',
          useSlotsViewOnSmallScreen: 'true',
          theme: 'light',
          cssVarsPerTheme: { light: { 'cal-brand': '#3D34BC' } },
        } as unknown as React.ComponentProps<typeof Cal>['config']
      }
    />
  );
}
