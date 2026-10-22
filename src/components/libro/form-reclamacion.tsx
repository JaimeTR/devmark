'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Loader2, Mail, Printer, RotateCcw } from 'lucide-react';
import { EMAIL, PHONE_DISPLAY, WHATSAPP_GREETING, whatsappHref } from '@/lib/contact';
import { cn } from '@/lib/utils';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';

// Hoja de reclamacion (Ley 29571). Portada del sitio de FIMAV Peru: mismas reglas que valida la API
// del ERP, para avisar antes de enviar. La API vuelve a validar todo.

export type Proveedor = { razonSocial: string | null; ruc: string | null; nombreComercial: string; direccion: string | null; correo: string | null };
type TipoDoc = 'DNI' | 'CE' | 'PASAPORTE' | 'RUC';

const limpio = (t: string) => t.replace(/[<>]/g, '');
const fechaLarga = (d: string | Date) => new Date(d).toLocaleDateString('es-PE', { timeZone: 'America/Lima', day: 'numeric', month: 'long', year: 'numeric' });

const REGLAS: Record<TipoDoc, [RegExp, string]> = {
  DNI: [/^\d{8}$/, 'El DNI tiene 8 dígitos.'],
  RUC: [/^\d{11}$/, 'El RUC tiene 11 dígitos.'],
  PASAPORTE: [/^[A-Za-z0-9]{6,15}$/, 'El pasaporte tiene entre 6 y 15 letras o números.'],
  CE: [/^[A-Za-z0-9]{9,12}$/, 'El carné de extranjería tiene entre 9 y 12 letras o números.'],
};
const soloDoc = (t: TipoDoc, v: string) => (t === 'DNI' || t === 'RUC' ? v.replace(/\D/g, '') : v.replace(/[^A-Za-z0-9]/g, ''));
const maxDoc = (t: TipoDoc) => (t === 'DNI' ? 8 : t === 'RUC' ? 11 : t === 'CE' ? 12 : 15);

const inicial = {
  nombres: '', apellidos: '', tipoDocumento: 'DNI' as TipoDoc, nroDocumento: '', domicilio: '', telefono: '', correo: '',
  menorEdad: false, repNombres: '', repTipoDocumento: 'DNI' as Exclude<TipoDoc, 'RUC'>, repNroDocumento: '',
  tipoBien: 'SERVICIO' as 'PRODUCTO' | 'SERVICIO', monto: '', moneda: 'PEN' as 'PEN' | 'USD', descripcionBien: '', nroPedido: '',
  tipo: 'RECLAMO' as 'RECLAMO' | 'QUEJA', detalle: '', pedidoConsumidor: '', medioRespuesta: 'CORREO' as 'CORREO' | 'CARTA',
  acepta: false, website: '',
};
type Datos = typeof inicial;
type Hoja = { codigo?: string; fecha: string; fechaLimite?: string };

const ORDEN = ['nombres', 'apellidos', 'nroDocumento', 'domicilio', 'telefono', 'correo', 'repNombres', 'repNroDocumento', 'monto', 'descripcionBien', 'detalle', 'pedidoConsumidor', 'acepta'];

const campo = 'mt-1.5 block h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-[15px] text-ink transition-colors placeholder:text-ink/35 focus:border-primary focus:outline-none aria-[invalid=true]:border-red-500';
const area = campo.replace('h-12', 'min-h-28 py-3');
const opcion = 'flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-ink/15 bg-white px-4 text-[15px] transition-colors hover:border-ink/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5';
const bloque = 'grid gap-4 rounded-2xl bg-mist p-5 sm:grid-cols-2 sm:p-8';

export function FormReclamacion({ proveedor }: { proveedor: Proveedor }) {
  const [f, setF] = useState<Datos>(inicial);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [enviando, setEnviando] = useState(false);
  const [hoja, setHoja] = useState<Hoja | null>(null);
  const [fallo, setFallo] = useState(false);
  const [errorApi, setErrorApi] = useState('');
  const [hoy, setHoy] = useState('');
  const resultadoRef = useRef<HTMLDivElement>(null);
  const errorApiRef = useRef<HTMLParagraphElement>(null);

  // La fecha se pone en el navegador: el HTML del servidor puede ser de otro dia.
  useEffect(() => {
    const id = setTimeout(() => setHoy(fechaLarga(new Date())), 0);
    return () => clearTimeout(id);
  }, []);
  useEffect(() => {
    if (hoja || fallo) resultadoRef.current?.focus();
  }, [hoja, fallo]);
  useEffect(() => {
    if (errorApi) errorApiRef.current?.focus();
  }, [errorApi]);

  const set = <K extends keyof Datos>(k: K, v: Datos[K]) => {
    setF((x) => ({ ...x, [k]: v }));
    setErrores((x) => (x[k] ? { ...x, [k]: '' } : x));
  };

  const validar = () => {
    const e: Record<string, string> = {};
    const min = (k: keyof Datos, n: number, msg: string) => {
      if (limpio(String(f[k])).trim().length < n) e[k] = msg;
    };
    min('nombres', 2, 'Ingresa tus nombres.');
    min('apellidos', 2, 'Ingresa tus apellidos.');
    if (!REGLAS[f.tipoDocumento][0].test(f.nroDocumento)) e.nroDocumento = REGLAS[f.tipoDocumento][1];
    min('domicilio', 5, 'Ingresa tu domicilio.');
    if (!/^[0-9+()\s-]{6,20}$/.test(f.telefono.trim())) e.telefono = 'Ingresa un teléfono válido.';
    if (!/^\S+@\S+\.\S+$/.test(f.correo.trim())) e.correo = 'Ingresa un correo válido.';
    if (f.menorEdad) {
      min('repNombres', 2, 'Ingresa los nombres del padre, madre o apoderado.');
      if (!REGLAS[f.repTipoDocumento][0].test(f.repNroDocumento)) e.repNroDocumento = REGLAS[f.repTipoDocumento][1];
    }
    if (f.monto.trim() && !(/^\d+(\.\d{1,2})?$/.test(f.monto.trim()) && Number(f.monto) <= 100_000_000)) e.monto = 'Ingresa un monto válido, con hasta 2 decimales.';
    min('descripcionBien', 3, 'Describe el producto o servicio.');
    min('detalle', 10, 'Cuéntanos qué pasó (mínimo 10 caracteres).');
    min('pedidoConsumidor', 5, 'Indica qué solicitas.');
    if (!f.acepta) e.acepta = 'Debes declarar que la información es veraz.';
    setErrores(e);
    const primero = ORDEN.find((k) => e[k]);
    if (primero) document.getElementById(primero)?.focus();
    return !primero;
  };

  const enviar = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setErrorApi('');
    if (!validar()) return;
    setEnviando(true);
    const t = (v: string) => limpio(v).trim();
    const cuerpo = {
      nombres: t(f.nombres), apellidos: t(f.apellidos), tipoDocumento: f.tipoDocumento, nroDocumento: f.nroDocumento,
      domicilio: t(f.domicilio), telefono: f.telefono.trim(), correo: f.correo.trim(), menorEdad: f.menorEdad,
      ...(f.menorEdad ? { repNombres: t(f.repNombres), repTipoDocumento: f.repTipoDocumento, repNroDocumento: f.repNroDocumento } : {}),
      tipoBien: f.tipoBien, ...(f.monto.trim() ? { montoReclamado: Number(f.monto) } : {}), moneda: f.moneda,
      descripcionBien: t(f.descripcionBien), ...(t(f.nroPedido) ? { nroPedido: t(f.nroPedido) } : {}),
      tipo: f.tipo, detalle: t(f.detalle), pedidoConsumidor: t(f.pedidoConsumidor), medioRespuesta: f.medioRespuesta,
      aceptaVeracidad: f.acepta, origen: 'devmarkpe.com/libro-de-reclamaciones', website: f.website,
    };
    try {
      const res = await fetch('/api/reclamaciones', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cuerpo) });
      const j = await res.json().catch(() => ({}));
      if (res.ok) setHoja({ ...j, fecha: j.fecha ?? new Date().toISOString() });
      else if (res.status === 429) setErrorApi('Recibimos varias hojas seguidas desde tu conexión. Espera unos minutos e inténtalo de nuevo.');
      else if (res.status >= 500) setFallo(true);
      else setErrorApi(Array.isArray(j.message) ? j.message.join(' ') : j.message ?? 'No pudimos registrar la hoja.');
    } catch {
      setFallo(true);
    } finally {
      setEnviando(false);
    }
  };

  const err = (k: string) =>
    errores[k] ? (
      <p id={`e-${k}`} role="alert" className="mt-1.5 text-sm text-red-600">
        {errores[k]}
      </p>
    ) : null;
  const aria = (k: string) => ({ 'aria-invalid': errores[k] ? true : undefined, 'aria-describedby': errores[k] ? `e-${k}` : undefined });
  const lbl = (id: string, t: string, req = true) => (
    <label htmlFor={id} className="text-sm font-medium text-ink/80">
      {t} {req && <span aria-hidden="true" className="text-primary">*</span>}
    </label>
  );
  const docSelect = (id: string, valor: string, cambiar: (v: TipoDoc) => void, ruc: boolean) => (
    <select id={id} value={valor} onChange={(e) => cambiar(e.target.value as TipoDoc)} className={campo}>
      <option value="DNI">DNI</option>
      <option value="CE">Carné de extranjería</option>
      <option value="PASAPORTE">Pasaporte</option>
      {ruc && <option value="RUC">RUC</option>}
    </select>
  );
  const proveedorTexto = `${proveedor.razonSocial ?? proveedor.nombreComercial}${proveedor.ruc ? ` · RUC ${proveedor.ruc}` : ''}`;

  if (fallo)
    return (
      <div ref={resultadoRef} tabIndex={-1} role="status" className="rounded-2xl bg-mist p-6 outline-none sm:p-8">
        <h2 className="headline text-2xl">No pudimos registrar tu hoja</h2>
        <p className="mt-3 max-w-[60ch] leading-relaxed text-ink/70">
          Por un problema temporal no se guardó. Puedes presentarla escribiéndonos; tus datos siguen en el formulario.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={`mailto:${proveedor.correo ?? EMAIL}?subject=${encodeURIComponent('Hoja de reclamación')}`} className="btn-ink btn-sm">
            <span className="btn-tile"><Mail className="h-4 w-4" /></span>
            {proveedor.correo ?? EMAIL}
          </a>
          <a href={whatsappHref(WHATSAPP_GREETING.es)} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm bg-white">
            <span className="btn-tile"><WhatsAppIcon className="h-4 w-4" /></span>
            {PHONE_DISPLAY}
          </a>
          <button type="button" onClick={() => setFallo(false)} className="btn-outline btn-sm bg-white">
            <span className="btn-tile"><RotateCcw className="h-4 w-4" /></span>
            Volver al formulario
          </button>
        </div>
      </div>
    );

  if (hoja) {
    const filas: [string, string | null][] = [
      ['Proveedor', proveedorTexto],
      ['Dirección del proveedor', proveedor.direccion],
      ['Consumidor', `${f.nombres.trim()} ${f.apellidos.trim()}`],
      ['Documento', `${f.tipoDocumento} ${f.nroDocumento}`],
      ['Domicilio', f.domicilio.trim()],
      ['Teléfono', f.telefono.trim()],
      ['Correo', f.correo.trim()],
      ['Padre, madre o apoderado', f.menorEdad ? `${f.repNombres.trim()} · ${f.repTipoDocumento} ${f.repNroDocumento}` : null],
      ['Bien contratado', `${f.tipoBien === 'PRODUCTO' ? 'Producto' : 'Servicio'}: ${f.descripcionBien.trim()}`],
      ['Monto reclamado', f.monto.trim() ? `${f.moneda === 'PEN' ? 'S/' : 'US$'} ${f.monto.trim()}` : null],
      ['N.º de pedido o comprobante', f.nroPedido.trim() || null],
      ['Tipo', f.tipo === 'RECLAMO' ? 'Reclamo' : 'Queja'],
      ['Detalle', f.detalle.trim()],
      ['Pedido del consumidor', f.pedidoConsumidor.trim()],
      ['Medio de respuesta', f.medioRespuesta === 'CORREO' ? 'Correo electrónico' : 'Carta'],
    ];
    return (
      <div ref={resultadoRef} tabIndex={-1} role="status" className="rounded-2xl bg-mist p-6 outline-none sm:p-8 print:bg-white print:p-0">
        <h2 className="headline text-[clamp(1.75rem,3vw,2.5rem)]">{hoja.codigo ? 'Hoja de reclamación registrada' : 'Recibimos tu hoja'}</h2>
        {hoja.codigo ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-4">
              <p className="text-sm text-ink/55">Código</p>
              <p className="headline mt-1 text-2xl tabular-nums">{hoja.codigo}</p>
            </div>
            <div className="rounded-xl bg-white p-4">
              <p className="text-sm text-ink/55">Registrada</p>
              <p className="mt-1 text-[17px]">{fechaLarga(hoja.fecha)}</p>
            </div>
            {hoja.fechaLimite && (
              <div className="rounded-xl bg-white p-4">
                <p className="text-sm text-ink/55">Te respondemos a más tardar</p>
                <p className="mt-1 text-[17px]">{fechaLarga(hoja.fechaLimite)}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="mt-3 text-ink/70">Gracias. Te contactaremos por el medio que indicaste.</p>
        )}
        <p className="mt-5 max-w-[64ch] text-[15px] leading-relaxed text-ink/70">
          Te enviamos una copia a tu correo. Guarda el código para consultar el estado más abajo. Presentar un reclamo no impide acudir a Indecopi.
        </p>

        <dl className="mt-6 hidden gap-x-6 gap-y-2 print:grid print:grid-cols-[13rem_1fr]">
          {filas
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="font-medium">{k}</dt>
                <dd className="break-words">{v}</dd>
              </div>
            ))}
        </dl>
        <p className="mt-6 hidden text-sm print:block">Ley 29571, Código de Protección y Defensa del Consumidor, y su reglamento.</p>

        <div className="mt-6 flex flex-wrap gap-3 print:hidden">
          <button type="button" onClick={() => window.print()} className="btn-ink btn-sm">
            <span className="btn-tile"><Printer className="h-4 w-4" /></span>
            Imprimir o guardar PDF
          </button>
          <button
            type="button"
            onClick={() => {
              setHoja(null);
              setF(inicial);
              setErrores({});
            }}
            className="btn-outline btn-sm bg-white"
          >
            <span className="btn-tile"><RotateCcw className="h-4 w-4" /></span>
            Registrar otra hoja
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} noValidate className="grid gap-4">
      <section aria-labelledby="h-prov" className="flex flex-col gap-1 rounded-2xl border border-ink/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 id="h-prov" className="text-sm text-ink/55">Proveedor</h2>
          <p className="mt-1 text-[17px] font-medium">{proveedorTexto}</p>
          {proveedor.direccion && <p className="text-[15px] text-ink/70">{proveedor.direccion}</p>}
          {proveedor.correo && <p className="break-all text-[15px] text-ink/70">{proveedor.correo}</p>}
        </div>
        <p className="text-sm text-ink/55">Fecha: {hoy || '—'}</p>
      </section>

      <fieldset className={bloque}>
        <legend className="float-left mb-2 w-full sm:col-span-2">
          <span className="headline text-2xl">1. Tus datos</span>
          <span className="mt-1 block text-sm text-ink/55">Los campos con * son obligatorios.</span>
        </legend>
        <div>{lbl('nombres', 'Nombres')}<input id="nombres" value={f.nombres} onChange={(e) => set('nombres', e.target.value)} autoComplete="given-name" maxLength={80} className={campo} aria-required="true" {...aria('nombres')} />{err('nombres')}</div>
        <div>{lbl('apellidos', 'Apellidos')}<input id="apellidos" value={f.apellidos} onChange={(e) => set('apellidos', e.target.value)} autoComplete="family-name" maxLength={80} className={campo} aria-required="true" {...aria('apellidos')} />{err('apellidos')}</div>
        <div>
          {lbl('tipoDocumento', 'Tipo de documento')}
          {docSelect('tipoDocumento', f.tipoDocumento, (v) => { setF((x) => ({ ...x, tipoDocumento: v, nroDocumento: '' })); setErrores((x) => ({ ...x, nroDocumento: '' })); }, true)}
        </div>
        <div>{lbl('nroDocumento', 'N.º de documento')}<input id="nroDocumento" value={f.nroDocumento} onChange={(e) => set('nroDocumento', soloDoc(f.tipoDocumento, e.target.value))} inputMode={f.tipoDocumento === 'DNI' || f.tipoDocumento === 'RUC' ? 'numeric' : 'text'} maxLength={maxDoc(f.tipoDocumento)} className={campo} aria-required="true" {...aria('nroDocumento')} />{err('nroDocumento')}</div>
        <div className="sm:col-span-2">{lbl('domicilio', 'Domicilio')}<input id="domicilio" value={f.domicilio} onChange={(e) => set('domicilio', e.target.value)} autoComplete="street-address" maxLength={200} className={campo} aria-required="true" {...aria('domicilio')} />{err('domicilio')}</div>
        <div>{lbl('telefono', 'Teléfono')}<input id="telefono" type="tel" value={f.telefono} onChange={(e) => set('telefono', e.target.value)} autoComplete="tel" maxLength={20} className={campo} aria-required="true" {...aria('telefono')} />{err('telefono')}</div>
        <div>{lbl('correo', 'Correo')}<input id="correo" type="email" value={f.correo} onChange={(e) => set('correo', e.target.value)} autoComplete="email" maxLength={120} className={campo} aria-required="true" {...aria('correo')} />{err('correo')}</div>
        <label className={cn(opcion, 'sm:col-span-2')}>
          <input type="checkbox" checked={f.menorEdad} onChange={(e) => { set('menorEdad', e.target.checked); setErrores((x) => ({ ...x, repNombres: '', repNroDocumento: '' })); }} className="h-4 w-4 accent-primary" />
          Soy menor de edad
        </label>
        {f.menorEdad && (
          <>
            <p className="text-sm text-ink/60 sm:col-span-2">Indica los datos de tu padre, madre o apoderado.</p>
            <div className="sm:col-span-2">{lbl('repNombres', 'Nombres y apellidos del padre, madre o apoderado')}<input id="repNombres" value={f.repNombres} onChange={(e) => set('repNombres', e.target.value)} maxLength={120} className={campo} aria-required="true" {...aria('repNombres')} />{err('repNombres')}</div>
            <div>
              {lbl('repTipoDocumento', 'Tipo de documento')}
              {docSelect('repTipoDocumento', f.repTipoDocumento, (v) => { setF((x) => ({ ...x, repTipoDocumento: v as Datos['repTipoDocumento'], repNroDocumento: '' })); setErrores((x) => ({ ...x, repNroDocumento: '' })); }, false)}
            </div>
            <div>{lbl('repNroDocumento', 'N.º de documento')}<input id="repNroDocumento" value={f.repNroDocumento} onChange={(e) => set('repNroDocumento', soloDoc(f.repTipoDocumento, e.target.value))} inputMode={f.repTipoDocumento === 'DNI' ? 'numeric' : 'text'} maxLength={maxDoc(f.repTipoDocumento)} className={campo} aria-required="true" {...aria('repNroDocumento')} />{err('repNroDocumento')}</div>
          </>
        )}
      </fieldset>

      <fieldset className={bloque}>
        <legend className="float-left mb-2 w-full sm:col-span-2">
          <span className="headline text-2xl">2. Lo que contrataste</span>
        </legend>
        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-medium text-ink/80">Tipo de bien</legend>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {([['SERVICIO', 'Servicio'], ['PRODUCTO', 'Producto']] as const).map(([v, t]) => (
              <label key={v} className={opcion}>
                <input type="radio" name="tipoBien" checked={f.tipoBien === v} onChange={() => set('tipoBien', v)} className="h-4 w-4 accent-primary" /> {t}
              </label>
            ))}
          </div>
        </fieldset>
        <div>
          {lbl('monto', 'Monto reclamado (opcional)', false)}
          <div className="flex gap-2">
            <select aria-label="Moneda" value={f.moneda} onChange={(e) => set('moneda', e.target.value as 'PEN' | 'USD')} className={cn(campo, 'w-24 shrink-0')}>
              <option value="PEN">S/</option>
              <option value="USD">US$</option>
            </select>
            <input id="monto" value={f.monto} onChange={(e) => set('monto', e.target.value)} inputMode="decimal" placeholder="0.00" className={cn(campo, 'min-w-0')} {...aria('monto')} />
          </div>
          {err('monto')}
        </div>
        <div>{lbl('nroPedido', 'N.º de pedido o comprobante (opcional)', false)}<input id="nroPedido" value={f.nroPedido} onChange={(e) => set('nroPedido', e.target.value)} maxLength={60} className={campo} /></div>
        <div className="sm:col-span-2">{lbl('descripcionBien', 'Descripción del producto o servicio')}<textarea id="descripcionBien" value={f.descripcionBien} onChange={(e) => set('descripcionBien', e.target.value)} rows={2} maxLength={300} className={area} aria-required="true" {...aria('descripcionBien')} />{err('descripcionBien')}</div>
      </fieldset>

      <fieldset className={bloque}>
        <legend className="float-left mb-2 w-full sm:col-span-2">
          <span className="headline text-2xl">3. Tu reclamo o queja</span>
        </legend>
        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-medium text-ink/80">Tipo de hoja</legend>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {([
              ['RECLAMO', 'Reclamo', 'Disconformidad con el producto o servicio.'],
              ['QUEJA', 'Queja', 'Malestar por la atención, sin relación con el producto o servicio.'],
            ] as const).map(([v, t, d]) => (
              <label key={v} className={cn(opcion, 'items-start py-3.5')}>
                <input type="radio" name="tipo" checked={f.tipo === v} onChange={() => set('tipo', v)} className="mt-1 h-4 w-4 accent-primary" />
                <span>
                  <span className="block font-medium">{t}</span>
                  <span className="block text-sm text-ink/60">{d}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="sm:col-span-2">{lbl('detalle', 'Detalle: ¿qué pasó?')}<textarea id="detalle" value={f.detalle} onChange={(e) => set('detalle', e.target.value)} rows={5} maxLength={2000} className={area} aria-required="true" {...aria('detalle')} />{err('detalle')}</div>
        <div className="sm:col-span-2">{lbl('pedidoConsumidor', 'Pedido: ¿qué solicitas?')}<textarea id="pedidoConsumidor" value={f.pedidoConsumidor} onChange={(e) => set('pedidoConsumidor', e.target.value)} rows={3} maxLength={1000} className={area} aria-required="true" {...aria('pedidoConsumidor')} />{err('pedidoConsumidor')}</div>
        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-medium text-ink/80">¿Cómo quieres recibir la respuesta?</legend>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {([['CORREO', 'Por correo electrónico'], ['CARTA', 'Por carta a mi domicilio']] as const).map(([v, t]) => (
              <label key={v} className={opcion}>
                <input type="radio" name="medio" checked={f.medioRespuesta === v} onChange={() => set('medioRespuesta', v)} className="h-4 w-4 accent-primary" /> {t}
              </label>
            ))}
          </div>
        </fieldset>
      </fieldset>

      {/* Honeypot: un humano nunca lo llena. */}
      <input name="website" value={f.website} onChange={(e) => set('website', e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="rounded-2xl border border-ink/10 p-5 sm:p-6">
        <label className="flex items-start gap-3 text-[15px]">
          <input id="acepta" type="checkbox" checked={f.acepta} onChange={(e) => set('acepta', e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-primary" aria-required="true" {...aria('acepta')} />
          <span>
            Declaro que la información es veraz y corresponde a lo ocurrido. <span aria-hidden="true" className="text-primary">*</span>
          </span>
        </label>
        {err('acepta')}
        <p className="mt-3 text-sm text-ink/60">Te responderemos en un plazo máximo de 15 días hábiles. Presentar un reclamo no impide acudir a Indecopi.</p>
        {errorApi && (
          <p ref={errorApiRef} tabIndex={-1} role="alert" className="mt-3 rounded-xl bg-red-500/10 p-3 text-sm text-red-700 outline-none">
            {errorApi}
          </p>
        )}
        <button type="submit" disabled={enviando} className="btn-ink mt-5 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
          <span className="btn-tile">{enviando ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowUpRight className="h-5 w-5" />}</span>
          {enviando ? 'Enviando…' : 'Enviar hoja de reclamación'}
        </button>
      </div>
    </form>
  );
}
