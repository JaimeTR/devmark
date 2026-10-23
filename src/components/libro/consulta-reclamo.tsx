'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, Search } from 'lucide-react';

const campo = 'mt-1.5 block h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-[15px] text-ink transition-colors placeholder:text-ink/35 focus:border-primary focus:outline-none';
const fecha = (d: string) => new Date(d).toLocaleDateString('es-PE', { timeZone: 'America/Lima', day: 'numeric', month: 'long', year: 'numeric' });
const ESTADOS: Record<string, string> = { RECIBIDO: 'Recibido', EN_PROCESO: 'En proceso', RESPONDIDO: 'Respondido' };
type Hoja = { codigo: string; tipo: string; estado: string; fecha: string; fechaLimite: string; respuesta?: string | null; respondidoEn?: string | null };

/** Consulta del estado de una hoja con su codigo y el documento del consumidor. */
export function ConsultaReclamo() {
  const [codigo, setCodigo] = useState('');
  const [documento, setDocumento] = useState('');
  const [cargando, setCargando] = useState(false);
  const [hoja, setHoja] = useState<Hoja | null>(null);
  const [error, setError] = useState('');
  const salidaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (hoja || error) salidaRef.current?.focus();
  }, [hoja, error]);

  const consultar = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setHoja(null);
    setError('');
    if (!codigo.trim() || !documento.trim()) return setError('Ingresa el código y el documento.');
    setCargando(true);
    try {
      const res = await fetch('/api/reclamaciones/consulta', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ codigo: codigo.trim(), documento: documento.trim() }) });
      const j = await res.json().catch(() => ({}));
      if (res.ok) setHoja(j);
      else if (res.status === 404) setError('No encontramos una hoja con esos datos.');
      else if (res.status === 429) setError('Demasiadas consultas seguidas. Intenta de nuevo en unos minutos.');
      else if (res.status === 503) setError('La consulta en línea aún no está disponible. Escríbenos a contacto@devmarkpe.com con tu código y te respondemos.');
      else setError('No pudimos consultar ahora. Intenta de nuevo más tarde.');
    } catch {
      setError('No pudimos consultar ahora. Intenta de nuevo más tarde.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="rounded-2xl bg-mist p-5 sm:p-8">
      <form onSubmit={consultar} noValidate className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <div>
          <label htmlFor="c-codigo" className="text-sm font-medium text-ink/80">Código de la hoja</label>
          <input id="c-codigo" value={codigo} onChange={(e) => setCodigo(e.target.value)} maxLength={40} placeholder="LR-0001-2026" className={campo} />
        </div>
        <div>
          <label htmlFor="c-doc" className="text-sm font-medium text-ink/80">N.º de documento</label>
          <input id="c-doc" value={documento} onChange={(e) => setDocumento(e.target.value)} maxLength={40} className={campo} />
        </div>
        <button type="submit" disabled={cargando} className="btn-ink disabled:opacity-60">
          <span className="btn-tile">{cargando ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}</span>
          Consultar estado
        </button>
      </form>
      <div ref={salidaRef} tabIndex={-1} className="outline-none">
        {error && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}
        {hoja && (
          <dl role="status" className="mt-6 grid gap-3 rounded-xl bg-white p-5 text-[15px] sm:grid-cols-2">
            <div><dt className="text-sm text-ink/55">Hoja</dt><dd>{hoja.codigo} · {hoja.tipo === 'QUEJA' ? 'Queja' : 'Reclamo'}</dd></div>
            <div><dt className="text-sm text-ink/55">Estado</dt><dd className="font-medium">{ESTADOS[hoja.estado] ?? hoja.estado}</dd></div>
            <div><dt className="text-sm text-ink/55">Registrada</dt><dd>{fecha(hoja.fecha)}</dd></div>
            <div><dt className="text-sm text-ink/55">Fecha límite de respuesta</dt><dd>{fecha(hoja.fechaLimite)}</dd></div>
            {hoja.respuesta && (
              <div className="sm:col-span-2">
                <dt className="text-sm text-ink/55">Respuesta{hoja.respondidoEn ? ` (${fecha(hoja.respondidoEn)})` : ''}</dt>
                <dd className="mt-1 whitespace-pre-line break-words">{hoja.respuesta}</dd>
              </div>
            )}
          </dl>
        )}
      </div>
    </div>
  );
}
