import { getProjects } from '@/data/projects';
import { PortfolioPage } from '@/components/landing/portfolio-page';

export default async function Page() {
  const projects = await getProjects('en');
  return <PortfolioPage projects={projects} lang="en" />;
}
