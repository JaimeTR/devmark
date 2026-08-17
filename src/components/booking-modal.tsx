'use client';

import Cal from '@calcom/embed-react';

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK || 'devmark.pe/30min';

export function BookingModal({ open, onOpenChange }: BookingModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent p-4 sm:p-6"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-[min(96vw,1200px)] overflow-hidden rounded-[20px] border border-slate-200/80 bg-white shadow-[0_30px_80px_rgba(79,74,216,0.12)]"
        onClick={(event) => event.stopPropagation()}
      >
        <Cal
          namespace="devmark-booking"
          calLink={CAL_LINK}
          config={{
            layout: 'month_view',
            useSlotsViewOnSmallScreen: 'true',
            theme: 'light',
            cssVarsPerTheme: {
              light: {
                'cal-brand': '#4f4ad8',
                'cal-bg': '#ffffff',
                'cal-text': '#111827',
                'cal-border': '#e5e7eb',
                'cal-bg-secondary': '#f8fafc',
              },
              dark: {
                'cal-brand': '#4f4ad8',
                'cal-bg': '#ffffff',
                'cal-text': '#111827',
                'cal-border': '#e5e7eb',
                'cal-bg-secondary': '#f8fafc',
              },
            },
          } as any}
          style={{ width: '100%', height: '760px', overflow: 'hidden' }}
        />
      </div>
    </div>
  );
}
