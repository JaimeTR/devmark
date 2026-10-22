import { ArrowUpRight } from 'lucide-react';
import { getProjects } from '@/data/projects';
import { homeContent, type Lang } from '@/content/home';
import { Btn } from '@/components/site/btn';
import { TitleText } from '@/components/site/title-text';
import { ProjectsGrid } from './projects-grid';

/** Trabajo real (desde Supabase). Si no hay proyectos cargados, lo dice y enlaza al portafolio. */
export async function Projects({ lang }: { lang: Lang }) {
  const t = homeContent[lang].projects;
  const all = await getProjects(lang);
  const featured = all.filter((p) => p.isFeatured);
  const projects = featured.length >= 3 ? featured : all;

  return (
    <section id="portfolio" className="panel-paper py-20 sm:py-28">
      <div className="panel-inner">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="headline reveal text-[clamp(2.1rem,4.6vw,4rem)]">
              <TitleText parts={t.title} />
            </h2>
            <p className="reveal mt-4 max-w-[46ch] text-[17px] text-ink/70">{t.text}</p>
          </div>
          <Btn href={t.href} icon={<ArrowUpRight className="h-5 w-5" />} variant="outline">
            {t.cta}
          </Btn>
        </div>
        {projects.length > 0 ? (
          <ProjectsGrid projects={projects} lang={lang} visit={t.visit} />
        ) : (
          <p className="rounded-2xl bg-mist p-10 text-center text-ink/60">{t.empty}</p>
        )}
      </div>
    </section>
  );
}
