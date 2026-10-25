import { FileText, LifeBuoy, ReceiptText, TrendingUp } from 'lucide-react';
import { homeContent, type Lang } from '@/content/home';
import { TitleText } from '@/components/site/title-text';

const icons = [TrendingUp, ReceiptText, LifeBuoy, FileText];

/** Vista ilustrativa del portal del cliente (DEVMARK ERP): avance, cobro, ticket e informe. */
function PortalMock({ lang }: { lang: Lang }) {
  const m = homeContent[lang].portal.mock;
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-soft shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
        {/* eslint-disable-next-line @next/next/no-img-element -- logo decorativo de la maqueta */}
        <img src="/marca/devmark-logotipo-fondo-oscuro-sin-lema.svg" alt="DEVMARK" width={142} height={14} className="h-[14px] w-auto" />
        <span className="grid h-7 w-7 place-items-center rounded-md bg-band text-[11px] font-semibold text-ink">TN</span>
      </div>
      <div className="grid gap-3 p-5">
        <div className="rounded-xl bg-white/[0.06] p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white">{m.project}</span>
            <span className="text-ink-muted">{m.progress} 60%</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[60%] rounded-full bg-periwinkle" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-[7px] bg-emerald-400/15 px-2 py-1 text-emerald-200">{m.stage}</span>
            <span className="rounded-[7px] bg-white/10 px-2 py-1 text-ink-muted">{m.next}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/[0.06] p-4">
            <p className="text-xs text-ink-muted">{m.invoice}</p>
            <p className="headline mt-1 text-xl text-white">15 nov</p>
          </div>
          <div className="rounded-xl bg-white/[0.06] p-4">
            <p className="text-xs text-ink-muted">{m.ticket.split(' · ')[0]}</p>
            <p className="mt-1 text-sm text-emerald-200">{m.ticket.split(' · ')[1]}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl bg-white p-3.5 text-ink">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-white">
            <FileText className="h-4 w-4" />
          </span>
          <span className="text-sm font-medium">{m.report}</span>
        </div>
      </div>
    </div>
  );
}

/** Portal de clientes: el cliente revisa su proyecto, pagos, soporte y documentos. */
export function ClientPortal({ lang }: { lang: Lang }) {
  const t = homeContent[lang].portal;
  return (
    <section id="portal" data-tone="dark" className="panel-ink py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute -right-32 top-1/3 h-[520px] w-[520px] rounded-full bg-primary/30 blur-[130px]" />
      <div className="panel-inner relative grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <h2 className="headline reveal text-[clamp(2.1rem,4.6vw,4rem)]">
            <TitleText parts={t.title} />
          </h2>
          <p className="reveal mt-5 max-w-[46ch] text-[17px] leading-relaxed text-ink-muted">{t.text}</p>
          <dl className="mt-10 grid gap-3 sm:grid-cols-2">
            {t.items.map((it, i) => {
              const Icon = icons[i];
              return (
                <div key={it.title} className="reveal lift group rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-white/20 hover:bg-white/[0.06]">
                  <dt className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-periwinkle">
                      <Icon className="icon-tilt h-4 w-4" />
                    </span>
                    <span className="headline text-xl">{it.title}</span>
                  </dt>
                  <dd className="mt-3 text-[15px] leading-relaxed text-ink-muted">{it.text}</dd>
                </div>
              );
            })}
          </dl>
        </div>
        <div className="reveal">
          <PortalMock lang={lang} />
        </div>
      </div>
    </section>
  );
}
