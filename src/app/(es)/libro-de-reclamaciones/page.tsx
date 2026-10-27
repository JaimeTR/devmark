import type { Metadata } from 'next';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { PageHero } from '@/components/site/page-hero';
import { FormReclamacion } from '@/components/libro/form-reclamacion';
import { ConsultaReclamo } from '@/components/libro/consulta-reclamo';
import { getProveedor } from '@/lib/reclamaciones';

export const metadata: Metadata = {
  title: 'Libro de Reclamaciones',
  description: 'Registra un reclamo o una queja sobre los servicios de DEVMARK y consulta su estado. Respondemos en un plazo máximo de 15 días hábiles.',
  alternates: { canonical: 'https://devmarkpe.com/libro-de-reclamaciones' },
};

// Los datos del proveedor salen del ERP y se refrescan cada hora.
export const revalidate = 3600;

export default async function LibroReclamacionesPage() {
  const proveedor = await getProveedor();
  return (
    <div className="bg-paper">
      <div className="print:hidden">
        <Header lang="es" contactButton="Contactar" aiAssistant="Asistente IA" aiAssistantTooltip="¡Hola! Soy tu asistente de IA." />
      </div>
      <main id="main-content" className="flex flex-col gap-2 sm:gap-3">
        <div className="print:hidden">
          <PageHero
            title={['Libro de', { em: 'Reclamaciones.' }]}
            description="Conforme a la Ley 29571, Código de Protección y Defensa del Consumidor, puedes registrar aquí un reclamo o una queja. Te respondemos en un plazo máximo de 15 días hábiles y recibes una copia en tu correo."
          />
        </div>
        <section className="panel-paper py-12 sm:py-16 print:py-0">
          <div className="panel-inner max-w-4xl">
            <FormReclamacion proveedor={proveedor} />
            <section aria-labelledby="h-consulta" className="mt-16 print:hidden">
              <h2 id="h-consulta" className="headline text-[clamp(1.75rem,3vw,2.5rem)]">
                Consulta el estado de tu hoja
              </h2>
              <p className="mt-3 max-w-[56ch] text-[15px] text-ink/70">Con el código que recibiste en tu correo y tu número de documento.</p>
              <div className="mt-6">
                <ConsultaReclamo />
              </div>
            </section>
          </div>
        </section>
      </main>
      <div className="print:hidden">
        <Footer lang="es" copyright="DEVMARK. Todos los derechos reservados." />
      </div>
    </div>
  );
}
