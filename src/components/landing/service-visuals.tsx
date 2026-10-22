import { ArrowRight, Bot, MessageCircle, Search, ShoppingBag, User } from 'lucide-react';
import type { ServiceIcon } from '@/content/home';

// Mini interfaces dibujadas en codigo para cada servicio. Son ilustrativas: no muestran
// cifras ni resultados, solo la forma de lo que se entrega.

const Bar = ({ w, tone = 'bg-white/15' }: { w: string; tone?: string }) => <span className={`block h-2 rounded-full ${tone}`} style={{ width: w }} />;

function Browser({ children, url }: { children: React.ReactNode; url: string }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-ink-soft">
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-2 truncate rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-white/50">{url}</span>
      </div>
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}

function WebVisual() {
  return (
    <Browser url="tunegocio.pe">
      <div className="flex items-center justify-between">
        <Bar w="22%" tone="bg-white/30" />
        <div className="flex gap-2">
          <Bar w="28px" />
          <Bar w="28px" />
          <Bar w="28px" />
        </div>
      </div>
      <div className="mt-6 space-y-2.5">
        <span className="block h-4 w-4/5 rounded bg-white/80" />
        <span className="block h-4 w-3/5 rounded bg-periwinkle" />
        <Bar w="70%" />
        <Bar w="55%" />
      </div>
      <div className="mt-5 flex gap-2">
        <span className="h-7 w-24 rounded-md bg-white" />
        <span className="h-7 w-20 rounded-md border border-white/20" />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-14 rounded-lg bg-white/[0.07]" />
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
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-periwinkle" />
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg bg-white/[0.07] p-2">
            <span className={`block h-14 rounded-md ${i === 1 ? 'bg-periwinkle/70' : 'bg-white/10'}`} />
            <span className="mt-2 block h-1.5 w-3/4 rounded-full bg-white/25" />
            <div className="mt-2 flex items-center justify-between">
              <span className="block h-1.5 w-1/3 rounded-full bg-white/50" />
              <span className="h-4 w-4 rounded bg-white/80" />
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
            <div key={i} className="rounded-lg bg-white/[0.07] p-2.5">
              <Bar w="50%" />
              <span className="mt-2 block h-3 w-2/3 rounded bg-white/70" />
            </div>
          ))}
        </div>
        <div className="mt-4 flex h-28 items-end gap-2 rounded-lg bg-white/[0.04] p-3">
          {bars.map((h, i) => (
            <span key={i} className={`flex-1 rounded-t ${i === bars.length - 1 ? 'bg-periwinkle' : 'bg-white/20'}`} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="mt-3 space-y-2">
          <Bar w="90%" />
          <Bar w="75%" />
        </div>
      </div>
    </div>
  );
}

function AutomationVisual({ lang }: { lang: 'es' | 'en' }) {
  const nodes = lang === 'en' ? ['New lead', 'CRM', 'WhatsApp', 'Report'] : ['Nuevo lead', 'CRM', 'WhatsApp', 'Reporte'];
  return (
    <div className="flex h-full flex-col justify-center gap-3 rounded-xl border border-white/10 bg-ink-soft p-5">
      {nodes.map((n, i) => (
        <div key={n} className="flex items-center gap-3">
          <div className={`flex flex-1 items-center gap-3 rounded-lg px-3 py-3 ${i === 0 ? 'bg-white text-ink' : 'bg-white/[0.07] text-white'}`}>
            <span className={`grid h-7 w-7 place-items-center rounded-md text-[11px] font-semibold ${i === 0 ? 'bg-primary text-white' : 'bg-white/10'}`}>{i + 1}</span>
            <span className="text-sm font-medium">{n}</span>
            {i > 0 && <span className="ml-auto h-2 w-2 rounded-full bg-periwinkle" />}
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
      ? [
          { me: true, t: 'Do you ship to Arequipa?' },
          { me: false, t: 'Yes! Delivery takes 2 to 3 days. Shall I add the product to your cart?' },
          { me: true, t: 'Yes, please' },
        ]
      : [
          { me: true, t: '¿Hacen envíos a Arequipa?' },
          { me: false, t: '¡Sí! El envío llega en 2 a 3 días. ¿Te agrego el producto al carrito?' },
          { me: true, t: 'Sí, por favor' },
        ];
  return (
    <div className="flex h-full flex-col rounded-xl border border-white/10 bg-ink-soft">
      <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-3">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-white">
          <Bot className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-medium text-white">{lang === 'en' ? 'Store assistant' : 'Asistente de la tienda'}</p>
          <p className="text-[11px] text-periwinkle">{lang === 'en' ? 'Online' : 'En línea'}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-2.5 p-4">
        {msgs.map((m, i) => (
          <div key={i} className={`flex items-end gap-2 ${m.me ? 'justify-end' : ''}`}>
            {!m.me && <MessageCircle className="h-4 w-4 shrink-0 text-white/30" />}
            <p className={`max-w-[80%] rounded-xl px-3 py-2 text-[13px] leading-snug ${m.me ? 'rounded-br-sm bg-white text-ink' : 'rounded-bl-sm bg-white/10 text-white'}`}>{m.t}</p>
            {m.me && <User className="h-4 w-4 shrink-0 text-white/30" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function SeoVisual({ lang }: { lang: 'es' | 'en' }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-white/10 bg-ink-soft p-4">
      <div className="flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-2 text-[13px] text-white/70">
        <Search className="h-3.5 w-3.5" />
        {lang === 'en' ? 'web design agency lima' : 'diseño de páginas web lima'}
      </div>
      <div className="mt-4 space-y-2.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`rounded-lg p-3 ${i === 0 ? 'bg-white' : 'bg-white/[0.05]'}`}>
            <span className={`block text-[11px] ${i === 0 ? 'text-primary' : 'text-white/40'}`}>{i === 0 ? 'tunegocio.pe' : 'otro-sitio.com'}</span>
            <span className={`mt-1.5 block h-2.5 rounded ${i === 0 ? 'w-4/5 bg-ink' : 'w-3/5 bg-white/25'}`} />
            <span className={`mt-1.5 block h-1.5 rounded-full ${i === 0 ? 'w-11/12 bg-ink/25' : 'w-4/5 bg-white/10'}`} />
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
