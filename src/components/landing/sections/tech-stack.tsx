
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  SiNextdotjs,
  SiReact,
  SiFirebase,
  SiTailwindcss,
  SiNodedotjs,
  SiTypescript,
  SiShadcnui,
  SiGooglecloud,
} from "react-icons/si";

const technologies = [
  { name: "Next.js", icon: <SiNextdotjs className="h-8 w-8" aria-hidden="true" /> },
  { name: "React", icon: <SiReact className="h-8 w-8" aria-hidden="true" /> },
  { name: "Firebase", icon: <SiFirebase className="h-8 w-8" aria-hidden="true" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="h-8 w-8" aria-hidden="true" /> },
  { name: "Node.js", icon: <SiNodedotjs className="h-8 w-8" aria-hidden="true" /> },
  { name: "Genkit", icon: <SiGooglecloud className="h-8 w-8" aria-hidden="true" /> },
  { name: "TypeScript", icon: <SiTypescript className="h-8 w-8" aria-hidden="true" /> },
  { name: "ShadCN UI", icon: <SiShadcnui className="h-8 w-8" aria-hidden="true" /> },
];

interface TechStackProps {
    title: string;
    subtitle: string;
}

export function TechStack({ title, subtitle }: TechStackProps) {
  return (
    <section id="tech-stack">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-gradient">{title}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {technologies.map((tech) => (
                  <div key={tech.name} className="flex flex-col items-center justify-center gap-4 p-6 bg-primary/5 backdrop-blur-sm border border-primary/10 rounded-lg transition-all duration-300 hover:bg-primary/10 hover:shadow-lg">
                    <span className="text-foreground" aria-hidden="true">{tech.icon}</span>
                    <span className="font-semibold text-muted-foreground">{tech.name}</span>
                  </div>
                ))}
            </div>
        </div>
    </section>
  );
}
