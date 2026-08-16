import { getProjects } from '@/data/projects';
import { PortfolioClient } from './portfolio-client';

export default async function PortfolioPage() {
  const projects = await getProjects('en');
  return <PortfolioClient projects={projects} />;
}
