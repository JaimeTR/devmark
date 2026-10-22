import Link from 'next/link';
import { Bot, Code2, Gauge, LayoutTemplate, ServerCog, Workflow } from 'lucide-react';
import { homeContent, type Lang, type ServiceIcon } from '@/content/home';

export const SERVICE_ICONS: Record<ServiceIcon, typeof Code2> = {
  web: Code2,
  cms: LayoutTemplate,
  software: ServerCog,
  automation: Workflow,
  chatbot: Bot,
  seo: Gauge,
};

/** Banda lavanda que desfila con los servicios, pegada bajo el hero. */
export function ServiceBand({ lang }: { lang: Lang }) {
  const items = homeContent[lang].services.items;
  const loop = [...items, ...items];
  return (
    <div className="panel marquee mt-2 bg-band text-ink sm:mt-3" style={{ ['--marquee-speed' as string]: '44s' }}>
      <div className="marquee-track py-5 sm:py-7">
        {loop.map((s, i) => {
          const Icon = SERVICE_ICONS[s.id];
          return (
            <Link
              key={i}
              href={s.href}
              aria-hidden={i >= items.length}
              tabIndex={i >= items.length ? -1 : undefined}
              className="group flex shrink-0 items-center gap-6 px-6 sm:gap-8 sm:px-8"
            >
              <span className="headline text-[clamp(2rem,4.6vw,3.5rem)] transition-colors group-hover:text-primary">{s.short}</span>
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-ink text-white transition-colors group-hover:bg-primary sm:h-14 sm:w-14">
                <Icon className="h-5 w-5" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
