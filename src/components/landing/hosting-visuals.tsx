import { ArrowRight, Check, Gauge, Inbox, Lock, Mail, Search, Server, ShieldCheck } from 'lucide-react';
import { stagger } from './service-visuals';

// Mini ilustraciones de la pagina de hosting, en el mismo lenguaje que las de servicios: se arman
// en bucle (clases lv-*) dentro de un <Live>. Son ilustrativas: no muestran cifras reales.

type Lang = 'es' | 'en';

function CorreosVisual({ lang }: { lang: Lang }) {
  const cuentas = lang === 'en' ? ['contact@', 'sales@', 'support@'] : ['contacto@', 'ventas@', 'soporte@'];
  return (
    <div className="flex h-full flex-col justify-center gap-2 p-4">
      {cuentas.map((c, i) => (
        <div key={c} className={`lv lv-${i + 1} flex items-center gap-2.5 rounded-lg bg-white/[0.07] px-3 py-2`}>
          <span className="grid h-6 w-6 place-items-center rounded-md bg-periwinkle/90 text-ink">
            <Mail className="h-3.5 w-3.5" />
          </span>
          <span className="truncate text-[12px] text-white/85">
            {c}
            <span className="text-white/45">{lang === 'en' ? 'yourcompany.com' : 'tuempresa.com'}</span>
          </span>
          <span className="lv lv-pop lv-4 ml-auto grid h-4 w-4 place-items-center rounded-[5px] bg-emerald-400 text-ink" style={stagger(i)}>
            <Check className="h-2.5 w-2.5" />
          </span>
        </div>
      ))}
    </div>
  );
}

function SslVisual({ lang }: { lang: Lang }) {
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-4">
      <div className="flex items-center gap-2 rounded-full bg-white/[0.07] px-3 py-2">
        <span className="relative grid h-5 w-5 place-items-center">
          <Lock className="lv lv-pop lv-2 h-3.5 w-3.5 text-emerald-400" />
        </span>
        <span className="text-[12px] text-white/50">
          <span className="lv lv-2 text-emerald-300">https://</span>
          {lang === 'en' ? 'yourcompany.com' : 'tuempresa.com'}
        </span>
      </div>
      <div className="lv lv-pop lv-3 mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300">
        <ShieldCheck className="h-7 w-7" />
      </div>
      <span className="lv lv-grow lv-4 mx-auto block h-1.5 w-2/3 rounded-full bg-emerald-400/60" />
    </div>
  );
}

function MigracionVisual() {
  return (
    <div className="flex h-full items-center justify-between gap-2 p-5">
      <div className="lv lv-1 grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-white/[0.07] text-white/60">
        <Server className="h-6 w-6" />
      </div>
      <div className="relative flex-1">
        <span className="block h-1.5 rounded-full bg-white/10" />
        <span className="lv lv-grow lv-2 absolute inset-0 block h-1.5 rounded-full bg-periwinkle" />
        <ArrowRight className="lv lv-3 absolute -top-6 left-[calc(50%-8px)] h-4 w-4 text-periwinkle" />
      </div>
      <div className="lv lv-pop lv-4 grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-primary text-white">
        <Server className="h-6 w-6" />
      </div>
    </div>
  );
}

function RendimientoVisual() {
  const barras = [30, 45, 55, 70, 85, 96];
  return (
    <div className="flex h-full items-end gap-3 p-4">
      <div className="flex h-full flex-1 items-end gap-1.5">
        {barras.map((h, i) => (
          <span key={i} className={`lv lv-bar lv-2 flex-1 rounded-t ${i === barras.length - 1 ? 'bg-emerald-400' : 'bg-white/20'}`} style={{ height: `${h}%`, ...stagger(i) }} />
        ))}
      </div>
      <div className="lv lv-pop lv-4 mb-1 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border-4 border-emerald-400 text-emerald-300">
        <Gauge className="h-6 w-6" />
      </div>
    </div>
  );
}

/** Ilustracion de cada servicio incluido, en el orden del contenido: correos, SSL, migracion, rendimiento. */
export function IncludedVisual({ index, lang }: { index: number; lang: Lang }) {
  if (index === 0) return <CorreosVisual lang={lang} />;
  if (index === 1) return <SslVisual lang={lang} />;
  if (index === 2) return <MigracionVisual />;
  return <RendimientoVisual />;
}

/** Buscador de dominio: escribe el nombre y aparecen las extensiones disponibles. */
export function DomainVisual({ lang }: { lang: Lang }) {
  const ext = ['.com', '.pe', '.net', '.org'];
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-5">
      <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-ink">
        <Search className="h-4 w-4 text-ink/40" />
        <span className="lv lv-1 block whitespace-nowrap text-[14px] font-medium">{lang === 'en' ? 'yourcompany' : 'tuempresa'}</span>
        <span className="ml-auto rounded-md bg-primary px-2.5 py-1 text-[11px] font-medium text-white">{lang === 'en' ? 'Search' : 'Buscar'}</span>
      </div>
      <div className="grid gap-1.5">
        {ext.map((e, i) => (
          <div key={e} className={`lv lv-${i < 2 ? 2 : 3} flex items-center justify-between rounded-lg bg-white/[0.07] px-3 py-1.5`} style={stagger(i % 2)}>
            <span className="text-[13px] text-white">
              <span className="text-white/50">{lang === 'en' ? 'yourcompany' : 'tuempresa'}</span>
              {e}
            </span>
            <span className={`lv lv-pop lv-4 grid h-4 w-4 place-items-center rounded-[5px] ${i === 3 ? 'bg-white/20 text-white/60' : 'bg-emerald-400 text-ink'}`} style={stagger(i)}>
              <Check className="h-2.5 w-2.5" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Bandeja de correo: llegan mensajes a tu@tuempresa.com y se llena el espacio de 1 GB. */
export function EmailVisual({ lang }: { lang: Lang }) {
  const mensajes = lang === 'en' ? ['New quote request', 'Order #1024 confirmed', 'Meeting tomorrow 10:00'] : ['Nueva solicitud de cotización', 'Pedido #1024 confirmado', 'Reunión mañana 10:00'];
  return (
    <div className="flex h-full flex-col gap-2 p-5">
      <div className="flex items-center gap-2 text-[12px] text-white/70">
        <Inbox className="h-4 w-4 text-periwinkle" />
        {lang === 'en' ? 'you@yourcompany.com' : 'tu@tuempresa.com'}
        <span className="lv-pulse ml-auto h-2 w-2 rounded-full bg-periwinkle" />
      </div>
      {mensajes.map((m, i) => (
        <div key={m} className={`lv lv-${i + 1} flex items-center gap-2.5 rounded-lg ${i === 0 ? 'bg-white text-ink' : 'bg-white/[0.07] text-white'} px-3 py-2`}>
          <span className={`h-2 w-2 shrink-0 rounded-full ${i === 0 ? 'bg-primary' : 'bg-white/30'}`} />
          <span className="truncate text-[12px]">{m}</span>
        </div>
      ))}
      <div className="mt-auto">
        <div className="flex justify-between text-[11px] text-white/50">
          <span>{lang === 'en' ? 'Storage' : 'Espacio'}</span>
          <span>1 GB</span>
        </div>
        <span className="mt-1 block h-1.5 rounded-full bg-white/10">
          <span className="lv lv-grow lv-4 block h-1.5 w-1/3 rounded-full bg-periwinkle" />
        </span>
      </div>
    </div>
  );
}
