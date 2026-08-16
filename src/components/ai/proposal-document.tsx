'use client';

import { forwardRef, useState } from 'react';
import type { QuoteProjectOutput } from '@/ai/flows/quote-project-flow';

interface ProposalDocumentContent {
  lang: 'es' | 'en';
  documentTitle: string;
  generatedLabel: string;
  validUntilLabel: string;
  projectLabel: string;
  contactLabel: string;
  preparedForLabel: string;
  summaryLabel: string;
  itemsLabel: string;
  totalLabel: string;
  recommendationsLabel: string;
  paymentMethodsLabel: string;
  qrCaption: string;
  disclaimer: string;
  signatureRepName: string;
  signatureRepRole: string;
  signatureAiRole: string;
  signatureNote: string;
}

interface ProposalDocumentProps {
  content: ProposalDocumentContent;
  responsibleName: string;
  companyName?: string;
  projectName: string;
  contactEmail: string;
  data: QuoteProjectOutput;
  generatedAt: Date;
  validUntil: Date;
}

function formatDate(date: Date, lang: 'es' | 'en') {
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-PE' : 'en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

// Documento oculto (fuera de pantalla) que sirve de plantilla para el PDF
// exportado — no es lo que se ve en la tarjeta de resultados en pantalla.
export const ProposalDocument = forwardRef<HTMLDivElement, ProposalDocumentProps>(
  ({ content, responsibleName, companyName, projectName, contactEmail, data, generatedAt, validUntil }, ref) => {
    const items = data.items ?? [];
    const [qrError, setQrError] = useState(false);

    return (
      <div
        ref={ref}
        className="w-[800px] bg-white text-slate-800 p-12"
        style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
      >
        <div className="flex items-start justify-between pb-6 border-b-2 border-brand-blue/20">
          <div className="flex items-center gap-3">
            <img src="/logo-mark-black.svg" alt="DEVMARK" className="h-10 w-10" />
            <div>
              <span className="font-logo text-2xl tracking-wider text-brand-navy block leading-none">DEVMARK</span>
              <span className="text-xs text-slate-500">{content.documentTitle}</span>
            </div>
          </div>
          <div className="text-right text-xs text-slate-500 space-y-1">
            <p><span className="font-semibold text-slate-700">{content.generatedLabel}:</span> {formatDate(generatedAt, content.lang)}</p>
            <p><span className="font-semibold text-slate-700">{content.validUntilLabel}:</span> {formatDate(validUntil, content.lang)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-6 border-b border-slate-200">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">{content.preparedForLabel}</p>
            <p className="text-lg font-bold text-brand-navy">{responsibleName}</p>
            {companyName && <p className="text-sm text-slate-500">{companyName}</p>}
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">{content.contactLabel}</p>
            <p className="text-lg font-semibold text-slate-700">{contactEmail}</p>
          </div>
        </div>

        <div className="pb-6 border-b border-slate-200">
          <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">{content.projectLabel}</p>
          <p className="text-lg font-bold text-brand-navy">{projectName}</p>
        </div>

        <div className="py-6 border-b border-slate-200">
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-blue mb-2">{content.summaryLabel}</h2>
          <p className="text-sm text-slate-600 leading-relaxed">{data.summary}</p>
        </div>

        <div className="py-6 border-b border-slate-200">
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-blue mb-3">{content.itemsLabel}</h2>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="flex items-start justify-between gap-4 pb-3 border-b border-dashed border-slate-200 last:border-0 last:pb-0">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{item.description}</p>
                </div>
                <p className="text-sm font-bold text-brand-navy whitespace-nowrap">{item.price}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-brand-blue/20">
            <p className="text-sm font-bold uppercase tracking-wide text-slate-700">{content.totalLabel}</p>
            <p className="text-2xl font-extrabold text-brand-blue">{data.price}</p>
          </div>
          <p className="text-xs text-slate-400 mt-2">{content.disclaimer}</p>
        </div>

        <div className="py-6 border-b border-slate-200">
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-blue mb-2">{content.recommendationsLabel}</h2>
          <p className="text-sm text-slate-600 leading-relaxed">{data.recommendations}</p>
        </div>

        <div className="py-6 border-b border-slate-200">
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-blue mb-3">{content.paymentMethodsLabel}</h2>
          <div className="flex items-start gap-6">
            <p className="text-sm text-slate-600 leading-relaxed flex-1">{data.paymentMethods}</p>
            {!qrError && (
              <div className="shrink-0 w-28 text-center">
                <div className="w-28 h-28 rounded-xl border-2 border-slate-200 bg-white flex items-center justify-center overflow-hidden p-1.5">
                  <img src="/payment-qr.png" alt="QR Yape / Plin" className="w-full h-full object-contain" onError={() => setQrError(true)} />
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-tight">{content.qrCaption}</p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-8 grid grid-cols-2 gap-8">
          <div>
            <div className="h-px bg-slate-300 mb-2" />
            <p className="text-sm font-bold text-brand-navy">{content.signatureRepName}</p>
            <p className="text-xs text-slate-500">{content.signatureRepRole}</p>
          </div>
          <div>
            <div className="h-px bg-slate-300 mb-2" />
            <p className="text-sm font-bold text-brand-navy">{content.signatureAiRole}</p>
            <p className="text-xs text-slate-500">{content.signatureNote}</p>
          </div>
        </div>

        <div className="pt-8 text-center text-xs text-slate-400">
          devmarkpe.com · correo@devmarkpe.com
        </div>
      </div>
    );
  }
);
ProposalDocument.displayName = 'ProposalDocument';
