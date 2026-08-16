import { PortfolioSkeleton } from '@/components/home/portfolio-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-20" />
      <section className="pt-32 pb-16 bg-gradient-to-b from-brand-light/80 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Skeleton className="h-10 w-72 mx-auto bg-slate-200/70" />
          <Skeleton className="h-5 w-96 max-w-full mx-auto bg-slate-200/70" />
        </div>
      </section>
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <PortfolioSkeleton />
        </div>
      </section>
    </div>
  );
}
