import { ArrowRight, Bot, MessageCircle, Search, ShoppingBag, Sparkles, User } from 'lucide-react';
import type { ServiceIcon } from '@/content/home';

// Mini interfaces dibujadas en codigo para cada servicio. Son ilustrativas: no muestran
// cifras ni resultados, solo la forma de lo que se entrega. Las clases lv-* las animan
// cuando estan dentro de un contenedor <Live> (ver globals.css); fuera de el se ven quietas.

type CSSVars = React.CSSProperties & { '--i'?: number };
export const stagger = (i: number): CSSVars => ({ '--i': i });

export const Bar = ({ w, tone = 'bg-white/15', className = '' }: { w: string; tone?: string; className?: string }) => (
  <span className={`block h-2 rounded-full ${tone} ${className}`} style={{ width: w }} />
);

export function Browser({ children, url }: { children: React.ReactNode; url: string }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-ink-soft">
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-2 truncate rounded-[5px] bg-white/5 px-2 py-0.5 text-[11px] text-white/50">{url}</span>
      </div>
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}

function WebVisual() {
  return (
    <Browser url="tunegocio.pe">
      <div className="flex items-center justify-between">
        <Bar w="22%" tone="bg-white/30" className="lv lv-grow lv-1" />
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <Bar key={i} w="28px" className="lv lv-1" />
          ))}
        </div>
      </div>
      <div className="mt-6 space-y-2.5">
        <span className="lv lv-grow lv-2 block h-4 w-4/5 rounded bg-white/80" />
        <span className="lv lv-grow lv-2 block h-4 w-3/5 rounded bg-periwinkle" style={stagger(2)} />
        <Bar w="70%" className="lv lv-grow lv-3" />
        <Bar w="55%" className="lv lv-grow lv-3" />
      </div>
      <div className="mt-5 flex gap-2">
        <span className="lv lv-pop lv-4 h-7 w-24 rounded-md bg-white" />
        <span className="lv lv-pop lv-4 h-7 w-20 rounded-md border border-white/20" style={stagger(1)} />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="lv lv-5 h-14 rounded-lg bg-white/[0.07]" style={stagger(i)} />
        ))}
      </div>
    </Browser>
  );
}

function CmsVisual() {
  return (
    <Browser url="tienda.tunegocio.pe">
      <div className="flex items-center justify-between">
        <Bar w="30%" tone="bg-white/30" />
        <span className="relative grid h-7 w-7 place-items-center rounded-md bg-white/10 text-white">
          <ShoppingBag className="h-3.5 w-3.5" />
          <span className="lv lv-pop lv-5 absolute -right-1 -top-1 h-3 w-3 rounded-full bg-periwinkle" />
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`lv rounded-lg bg-white/[0.07] p-2 ${i < 2 ? 'lv-1' : 'lv-2'}`} style={stagger(i % 2)}>
            <span className={`block h-14 rounded-md ${i === 1 ? 'bg-periwinkle/70' : 'bg-white/10'}`} />
            <span className="mt-2 block h-1.5 w-3/4 rounded-full bg-white/25" />
            <div className="mt-2 flex items-center justify-between">
              <span className="block h-1.5 w-1/3 rounded-full bg-white/50" />
              <span className={`h-4 w-4 rounded bg-white/80 ${i === 1 ? 'lv lv-pop lv-4' : ''}`} />
            </div>
          </div>
        ))}
      </div>
    </Browser>
  );
}

function SoftwareVisual() {
  const bars = [38, 62, 45, 80, 56, 72, 90];
  return (
    <div className="flex h-full overflow-hidden rounded-xl border border-white/10 bg-ink-soft">
      <div className="w-14 shrink-0 space-y-3 border-r border-white/10 p-3">
        <span className="block h-6 w-6 rounded-md bg-periwinkle" />
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={`block h-2 rounded-full ${i === 1 ? 'bg-white/60' : 'bg-white/15'}`} />
        ))}
      </div>
      <div className="flex-1 p-4">
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="lv lv-1 rounded-lg bg-white/[0.07] p-2.5" style={stagger(i)}>
              <Bar w="50%" />
              <span className="lv lv-grow lv-2 mt-2 block h-3 w-2/3 rounded bg-white/70" style={stagger(i)} />
            </div>
          ))}
        </div>
        <div className="mt-4 flex h-28 items-end gap-2 rounded-lg bg-white/[0.04] p-3">
          {bars.map((h, i) => (
            <span
              key={i}
              className={`lv lv-bar lv-3 flex-1 rounded-t ${i === bars.length - 1 ? 'bg-periwinkle' : 'bg-white/20'}`}
              style={{ height: `${h}%`, ...stagger(i) }}
            />
          ))}
        </div>
        <div className="mt-3 space-y-2">
          <Bar w="90%" className="lv lv-grow lv-4" />
          <Bar w="75%" className="lv lv-grow lv-4" />
        </div>
      </div>
    </div>
  );
}

function AutomationVisual({ lang }: { lang: 'es' | 'en' }) {
  const nodes = lang === 'en' ? ['New lead', 'CRM', 'WhatsApp', 'Report'] : ['Nuevo lead', 'CRM', 'WhatsApp', 'Reporte'];
  const stages = ['lv-1', 'lv-2', 'lv-3', 'lv-4'];
  return (
    <div className="flex h-full flex-col justify-center gap-3 rounded-xl border border-white/10 bg-ink-soft p-5">
      {nodes.map((n, i) => (
        <div key={n} className="flex items-center gap-3">
          <div className={`lv ${stages[i]} flex flex-1 items-center gap-3 rounded-lg px-3 py-3 ${i === 0 ? 'bg-white text-ink' : 'bg-white/[0.07] text-white'}`}>
            <span className={`grid h-7 w-7 place-items-center rounded-md text-[11px] font-semibold ${i === 0 ? 'bg-primary text-white' : 'bg-white/10'}`}>{i + 1}</span>
            <span className="text-sm font-medium">{n}</span>
            {i > 0 && <span className="lv-pulse ml-auto h-2 w-2 rounded-full bg-periwinkle" />}
          </div>
          {i < nodes.length - 1 && <ArrowRight className="hidden h-4 w-4 rotate-90 text-white/30" />}
        </div>
      ))}
    </div>
  );
}

function ChatbotVisual({ lang }: { lang: 'es' | 'en' }) {
  const msgs =
    lang === 'en'
      ? ['Do you ship to Arequipa?', 'Yes! Delivery takes 2 to 3 days. Shall I add the product to your cart?', 'Yes, please']
      : ['¿Hacen envíos a Arequipa?', '¡Sí! El envío llega en 2 a 3 días. ¿Te agrego el producto al carrito?', 'Sí, por favor'];
  const me = 'max-w-[80%] rounded-xl rounded-br-sm bg-white px-3 py-2 text-[13px] leading-snug text-ink';
  return (
    <div className="flex h-full flex-col rounded-xl border border-white/10 bg-ink-soft">
      <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-3">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-white">
          <Bot className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-medium text-white">{lang === 'en' ? 'Store assistant' : 'Asistente de la tienda'}</p>
          <p className="flex items-center gap-1.5 text-[11px] text-periwinkle">
            <span className="lv-pulse h-1.5 w-1.5 rounded-full bg-periwinkle" />
            {lang === 'en' ? 'Online' : 'En línea'}
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-2.5 p-4">
        <div className="lv lv-1 flex items-end justify-end gap-2">
          <p className={me}>{msgs[0]}</p>
          <User className="h-4 w-4 shrink-0 text-white/30" />
        </div>
        <div className="relative flex items-end gap-2">
          <MessageCircle className="h-4 w-4 shrink-0 text-white/30" />
          <span className="lv-typing absolute bottom-0 left-6 flex gap-1 rounded-xl rounded-bl-sm bg-white/10 px-3 py-3">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
          </span>
          <p className="lv lv-3 max-w-[80%] rounded-xl rounded-bl-sm bg-white/10 px-3 py-2 text-[13px] leading-snug text-white">{msgs[1]}</p>
        </div>
        <div className="lv lv-5 flex items-end justify-end gap-2">
          <p className={me}>{msgs[2]}</p>
          <User className="h-4 w-4 shrink-0 text-white/30" />
        </div>
      </div>
    </div>
  );
}

function SeoVisual({ lang }: { lang: 'es' | 'en' }) {
  // SEO (resultado en Google) y GEO (la respuesta de la IA cita a tunegocio.pe).
  return (
    <div className="flex h-full flex-col rounded-xl border border-white/10 bg-ink-soft p-4">
      <div className="flex items-center gap-2 rounded-[10px] bg-white/[0.07] px-3 py-2 text-[13px] text-white/70">
        <Search className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate">{lang === 'en' ? 'web design agency lima' : 'diseño de páginas web lima'}</span>
      </div>
      <div className="lv lv-3 mt-3 rounded-lg border border-periwinkle/30 bg-primary/15 p-3">
        <span className="flex items-center gap-1.5 text-[11px] text-periwinkle">
          <Sparkles className="h-3 w-3" />
          {lang === 'en' ? 'AI answer' : 'Respuesta con IA'}
        </span>
        <span className="lv lv-grow lv-4 mt-2 block h-1.5 w-11/12 rounded-full bg-white/40" />
        <span className="lv lv-grow lv-4 mt-1.5 block h-1.5 w-3/4 rounded-full bg-white/25" />
        <span className="lv lv-pop lv-5 mt-2.5 inline-flex rounded-[5px] bg-white px-2 py-0.5 text-[10px] font-medium text-primary">tunegocio.pe</span>
      </div>
      <div className="mt-2.5 space-y-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`lv rounded-lg p-3 ${i === 0 ? 'lv-2 bg-white' : 'lv-1 bg-white/[0.05]'}`} style={stagger(i)}>
            <span className={`block text-[11px] ${i === 0 ? 'text-primary' : 'text-white/40'}`}>{i === 0 ? 'tunegocio.pe' : 'otro-sitio.com'}</span>
            <span className={`mt-1.5 block h-2.5 rounded ${i === 0 ? 'w-4/5 bg-ink' : 'w-3/5 bg-white/25'}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ServiceVisual({ id, lang }: { id: ServiceIcon; lang: 'es' | 'en' }) {
  switch (id) {
    case 'web':
      return <WebVisual />;
    case 'cms':
      return <CmsVisual />;
    case 'software':
      return <SoftwareVisual />;
    case 'automation':
      return <AutomationVisual lang={lang} />;
    case 'chatbot':
      return <ChatbotVisual lang={lang} />;
    case 'seo':
      return <SeoVisual lang={lang} />;
  }
}
