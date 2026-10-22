import {
  BarChart3,
  Blocks,
  Bot,
  Check,
  Code2,
  Compass,
  Cpu,
  Globe,
  Layers,
  LifeBuoy,
  MousePointer2,
  Palette,
  Receipt,
  Search,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Users,
  Workflow,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TOPIC_LABEL, type BlogTopic } from '@/data/blog-topics';
import { Bar, Browser, ServiceVisual, stagger } from '@/components/landing/service-visuals';

// Portadas del blog dibujadas en codigo: una mini interfaz por tema sobre tinta, con un
// brillo indigo que cambia de lugar segun el tema para que la grilla no se vea repetida.
// Se arman (clases lv-*) al pasar el cursor por la tarjeta que las contiene (.group).

export const TOPIC_ICON: Record<BlogTopic, React.ComponentType<{ className?: string }>> = {
  web: Globe,
  pwa: Smartphone,
  cms: Blocks,
  shop: ShoppingBag,
  software: Cpu,
  crm: Users,
  seo: Search,
  marketing: BarChart3,
  automation: Workflow,
  chatbot: Bot,
  ai: Sparkles,
  uiux: Palette,
  consulting: Compass,
  pricing: Receipt,
  support: LifeBuoy,
  stack: Layers,
};

const GLOW: Record<BlogTopic, string> = {
  web: 'left-[10%] top-[-30%]',
  pwa: 'right-[-10%] top-[10%]',
  cms: 'left-[-15%] bottom-[-30%]',
  shop: 'right-[5%] top-[-35%]',
  software: 'left-[30%] top-[-40%]',
  crm: 'right-[-15%] bottom-[-20%]',
  seo: 'left-[-10%] top-[-20%]',
  marketing: 'right-[20%] bottom-[-40%]',
  automation: 'left-[20%] bottom-[-35%]',
  chatbot: 'right-[-5%] top-[-25%]',
  ai: 'left-[35%] top-[-10%]',
  uiux: 'left-[-20%] top-[0%]',
  consulting: 'right-[0%] bottom-[-30%]',
  pricing: 'left-[5%] bottom-[-25%]',
  support: 'right-[10%] top-[-30%]',
  stack: 'left-[25%] bottom-[-45%]',
};

function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('h-full overflow-hidden rounded-xl border border-white/10 bg-ink-soft', className)}>{children}</div>;
}

function PwaVisual() {
  return (
    <div className="flex h-full items-end justify-center gap-4">
      <div className="lv lv-1 h-[92%] w-[38%] rounded-[22px] border border-white/15 bg-ink-soft p-2">
        <div className="h-full rounded-[16px] bg-white/[0.04] p-3">
          <span className="mx-auto block h-1 w-8 rounded-full bg-white/20" />
          <span className="lv lv-grow lv-2 mt-4 block h-3 w-4/5 rounded bg-white/80" />
          <span className="lv lv-grow lv-2 mt-2 block h-3 w-3/5 rounded bg-periwinkle" style={stagger(2)} />
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="lv lv-3 h-10 rounded-lg bg-white/10" style={stagger(i)} />
            ))}
          </div>
          <span className="lv lv-pop lv-4 mt-4 block h-7 rounded-lg bg-white" />
        </div>
      </div>
      <div className="lv lv-5 mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-primary text-white shadow-lg">
        <Smartphone className="h-6 w-6" />
      </div>
    </div>
  );
}

function CrmVisual({ lang }: { lang: 'es' | 'en' }) {
  const cols = lang === 'en' ? ['Lead', 'Proposal', 'Won'] : ['Lead', 'Propuesta', 'Ganado'];
  return (
    <Frame className="grid grid-cols-3 gap-2 p-3">
      {cols.map((c, ci) => (
        <div key={c} className="rounded-lg bg-white/[0.04] p-2">
          <p className="text-[11px] text-white/50">{c}</p>
          <div className="mt-2 space-y-2">
            {Array.from({ length: 3 - ci }).map((_, i) => (
              <div key={i} className={cn('lv rounded-md p-2', ci === 2 ? 'lv-4 bg-white' : 'bg-white/10', ci === 0 ? 'lv-1' : ci === 1 && 'lv-2')} style={stagger(i)}>
                <span className={cn('block h-1.5 w-3/4 rounded-full', ci === 2 ? 'bg-ink/60' : 'bg-white/40')} />
                <span className={cn('mt-1.5 block h-1.5 w-1/2 rounded-full', ci === 2 ? 'bg-primary' : 'bg-white/15')} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </Frame>
  );
}

function MarketingVisual() {
  const pts = '0,70 40,62 80,66 120,48 160,52 200,30 240,34 280,12';
  return (
    <Frame className="flex flex-col p-4">
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="lv lv-1 rounded-lg bg-white/[0.07] p-2.5" style={stagger(i)}>
            <Bar w="45%" />
            <span className={cn('mt-2 block h-3 rounded', i === 2 ? 'w-1/2 bg-periwinkle' : 'w-2/3 bg-white/70')} />
          </div>
        ))}
      </div>
      <div className="mt-3 flex-1 rounded-lg bg-white/[0.04] p-3">
        <svg viewBox="0 0 280 80" preserveAspectRatio="none" className="lv lv-grow lv-2 h-full w-full" aria-hidden>
          <polyline points={`${pts} 280,80 0,80`} fill="rgba(169,180,255,0.15)" stroke="none" />
          <polyline points={pts} fill="none" stroke="#A9B4FF" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        </svg>
      </div>
    </Frame>
  );
}

function AiVisual({ lang }: { lang: 'es' | 'en' }) {
  return (
    <Frame className="flex flex-col p-4">
      <div className="lv lv-1 flex items-center gap-2 rounded-lg bg-white/[0.07] px-3 py-2.5 text-[12px] text-white/70">
        <Sparkles className="h-3.5 w-3.5 text-periwinkle" />
        {lang === 'en' ? 'Summarize this month’s sales' : 'Resume las ventas del mes'}
      </div>
      <div className="mt-3 flex-1 space-y-2 rounded-lg border border-periwinkle/30 bg-primary/10 p-3">
        <Bar w="90%" tone="bg-white/50" className="lv lv-grow lv-2" />
        <Bar w="75%" tone="bg-white/30" className="lv lv-grow lv-2" />
        <Bar w="82%" tone="bg-white/30" className="lv lv-grow lv-3" />
        <div className="lv lv-4 mt-3 flex gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-8 flex-1 rounded-md bg-white/10" />
          ))}
        </div>
      </div>
    </Frame>
  );
}

function UiuxVisual() {
  return (
    <Frame className="relative grid grid-cols-[1fr_72px] gap-3 p-4">
      <div className="space-y-2 rounded-lg border border-dashed border-white/20 p-3">
        <span className="lv lv-1 block h-12 rounded-md bg-white/10" />
        <span className="lv lv-grow lv-2 block h-2.5 w-3/4 rounded bg-white/70" />
        <span className="lv lv-grow lv-2 block h-2 w-1/2 rounded bg-white/25" />
        <div className="lv lv-3 flex gap-2 pt-1">
          <span className="h-6 w-16 rounded-md bg-periwinkle" />
          <span className="h-6 w-12 rounded-md border border-white/20" />
        </div>
      </div>
      <div className="space-y-2">
        {['bg-primary', 'bg-periwinkle', 'bg-band', 'bg-white', 'bg-ink'].map((c, i) => (
          <span key={c} className={cn('lv lv-pop lv-1 block h-7 rounded-md border border-white/10', c)} style={stagger(i)} />
        ))}
      </div>
      <MousePointer2 className="lv lv-4 absolute bottom-[22%] left-[38%] h-5 w-5 fill-white text-white" />
    </Frame>
  );
}

function ConsultingVisual({ lang }: { lang: 'es' | 'en' }) {
  const steps = lang === 'en' ? ['Diagnosis', 'Roadmap', 'Stack', 'Launch'] : ['Diagnóstico', 'Hoja de ruta', 'Tecnología', 'Lanzamiento'];
  const stages = ['lv-1', 'lv-2', 'lv-3', 'lv-4'];
  return (
    <Frame className="flex flex-col justify-center gap-3 p-5">
      {steps.map((s, i) => (
        <div key={s} className={cn('lv flex items-center gap-3', stages[i])}>
          <span className={cn('grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold', i < 2 ? 'bg-periwinkle text-ink' : 'bg-white/10 text-white')}>
            {i < 2 ? <Check className="h-3.5 w-3.5" /> : i + 1}
          </span>
          <span className="text-sm text-white">{s}</span>
          <span className={cn('ml-auto h-1.5 rounded-full', i < 2 ? 'w-16 bg-periwinkle/60' : 'w-10 bg-white/10')} />
        </div>
      ))}
    </Frame>
  );
}

function PricingVisual({ lang }: { lang: 'es' | 'en' }) {
  const rows = lang === 'en' ? ['Design', 'Development', 'Hosting'] : ['Diseño', 'Desarrollo', 'Hosting'];
  return (
    <Frame className="flex flex-col p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white">{lang === 'en' ? 'Quote' : 'Cotización'}</span>
        <span className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] text-white/60">PDF</span>
      </div>
      <div className="mt-3 space-y-2">
        {rows.map((r, i) => (
          <div key={r} className="lv lv-1 flex items-center justify-between rounded-md bg-white/[0.06] px-3 py-2" style={stagger(i)}>
            <span className="text-[12px] text-white/70">{r}</span>
            <Bar w="48px" tone="bg-white/30" />
          </div>
        ))}
      </div>
      <div className="lv lv-pop lv-3 mt-auto flex items-center justify-between rounded-lg bg-white px-3 py-3">
        <span className="text-[12px] font-medium text-ink">Total</span>
        <span className="block h-3 w-20 rounded bg-primary" />
      </div>
    </Frame>
  );
}

function SupportVisual({ lang }: { lang: 'es' | 'en' }) {
  const checks = lang === 'en' ? ['Backups', 'Updates', 'SSL', 'Uptime'] : ['Copias de seguridad', 'Actualizaciones', 'SSL', 'Disponibilidad'];
  return (
    <Frame className="flex flex-col p-4">
      <div className="flex h-12 items-end gap-[3px] rounded-lg bg-white/[0.04] p-2">
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} className={cn('lv lv-bar lv-1 flex-1 rounded-sm', i === 21 ? 'h-1/2 bg-white/30' : 'h-full bg-periwinkle/70')} style={stagger(i % 8)} />
        ))}
      </div>
      <ul className="mt-3 space-y-2">
        {checks.map((c, i) => (
          <li key={c} className={cn('lv flex items-center gap-2 text-[12px] text-white/80', i < 2 ? 'lv-2' : 'lv-3')} style={stagger(i % 2)}>
            <span className="grid h-5 w-5 place-items-center rounded-md bg-periwinkle text-ink">
              <Check className="h-3 w-3" />
            </span>
            {c}
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function StackVisual() {
  const layers = [
    { w: '62%', tone: 'bg-white text-ink', Icon: Globe },
    { w: '74%', tone: 'bg-periwinkle text-ink', Icon: Code2 },
    { w: '86%', tone: 'bg-white/15 text-white', Icon: Cpu },
    { w: '98%', tone: 'bg-white/[0.08] text-white', Icon: Layers },
  ];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2.5">
      {layers.map(({ w, tone, Icon }, i) => (
        <div key={i} className={cn('lv flex h-11 items-center gap-3 rounded-xl px-4', tone, ['lv-4', 'lv-3', 'lv-2', 'lv-1'][i])} style={{ width: w }}>
          <Icon className="h-4 w-4" />
          <span className="block h-2 w-1/3 rounded-full bg-current opacity-40" />
        </div>
      ))}
    </div>
  );
}

function ShopVisual() {
  return (
    <Browser url="tienda.pe">
      <div className="grid h-full grid-cols-[1fr_0.9fr] gap-3">
        <span className="lv lv-1 rounded-lg bg-periwinkle/60" />
        <div className="flex flex-col">
          <span className="lv lv-grow lv-2 block h-3 w-4/5 rounded bg-white/80" />
          <span className="lv lv-grow lv-2 mt-2 block h-2 w-1/2 rounded bg-white/25" />
          <span className="lv lv-pop lv-3 mt-3 block h-4 w-1/3 rounded bg-white/60" />
          <span className="lv lv-pop lv-4 mt-auto flex h-8 items-center justify-center gap-1.5 rounded-md bg-white text-ink">
            <ShoppingBag className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Browser>
  );
}

function TopicVisual({ topic, lang }: { topic: BlogTopic; lang: 'es' | 'en' }) {
  switch (topic) {
    case 'web':
    case 'cms':
    case 'software':
    case 'seo':
    case 'automation':
    case 'chatbot':
      return <ServiceVisual id={topic} lang={lang} />;
    case 'pwa':
      return <PwaVisual />;
    case 'crm':
      return <CrmVisual lang={lang} />;
    case 'shop':
      return <ShopVisual />;
    case 'marketing':
      return <MarketingVisual />;
    case 'ai':
      return <AiVisual lang={lang} />;
    case 'uiux':
      return <UiuxVisual />;
    case 'consulting':
      return <ConsultingVisual lang={lang} />;
    case 'pricing':
      return <PricingVisual lang={lang} />;
    case 'support':
      return <SupportVisual lang={lang} />;
    case 'stack':
      return <StackVisual />;
  }
}

/** Portada ilustrada. Ocupa todo su contenedor (que debe tener alto y posicion relativa). */
export function BlogCover({ topic, lang, label = true, className }: { topic: BlogTopic; lang: 'es' | 'en'; label?: boolean; className?: string }) {
  const Icon = TOPIC_ICON[topic];
  return (
    <div aria-hidden className={cn('live-hover zoom absolute inset-0 overflow-hidden bg-ink', className)}>
      <div className={cn('pointer-events-none absolute h-[90%] w-[70%] rounded-full bg-primary/50 blur-[70px]', GLOW[topic])} />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)', backgroundSize: '18px 18px' }}
      />
      <div className="zoom-target absolute inset-x-0 bottom-[-8%] top-[20%] mx-auto w-[76%] max-w-[560px]">
        <TopicVisual topic={topic} lang={lang} />
      </div>
      {label && (
        <span className="chip glass-dark absolute left-3 top-3 py-1 pl-1 pr-3 text-xs text-white">
          <span className="chip-tile icon-tilt h-6 w-6 bg-white/10">
            <Icon className="h-3.5 w-3.5" />
          </span>
          {TOPIC_LABEL[topic][lang]}
        </span>
      )}
    </div>
  );
}
