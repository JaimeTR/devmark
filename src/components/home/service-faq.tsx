import { Plus } from 'lucide-react';

interface ServiceFaqProps {
  title: string;
  items: readonly { question: string; answer: string }[];
}

/** Preguntas frecuentes de un servicio con <details> nativo, sobre tinta. */
export function ServiceFaq({ title, items }: ServiceFaqProps) {
  return (
    <section id="faq" data-tone="dark" className="panel-ink py-20 sm:py-28">
      <div className="panel-inner grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <h2 className="headline reveal text-[clamp(2rem,4.2vw,3.5rem)]">{title}</h2>
        <div className="border-t border-white/10">
          {items.map((it) => (
            <details key={it.question} className="group border-b border-white/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <span className="headline text-[1.3rem] sm:text-2xl">{it.question}</span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/15 transition-transform duration-300 group-open:rotate-45">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="max-w-[62ch] pb-6 text-[16px] leading-relaxed text-ink-muted">{it.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
