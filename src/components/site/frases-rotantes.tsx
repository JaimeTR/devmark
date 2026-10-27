/**
 * Una linea que cambia de frase sin JavaScript: todas las frases estan en el HTML (los buscadores y las IA las leen
 * completas) y solo se ve una a la vez por una animacion de CSS. El titular <h1> se queda fijo.
 */
export function FrasesRotantes({ label, frases }: { label: string; frases: readonly string[] }) {
  return (
    <p className="mt-6 flex flex-wrap items-baseline gap-x-2 text-[clamp(1.05rem,1.6vw,1.35rem)] font-medium text-ink-muted">
      <span>{label}</span>
      <span className="frases-rotantes" style={{ ['--n' as string]: frases.length }}>
        {frases.map((f, i) => (
          <span key={f} className="frase" style={{ animationDelay: `${i * 3.2}s` }}>
            {f}
          </span>
        ))}
      </span>
    </p>
  );
}
