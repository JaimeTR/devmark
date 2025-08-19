
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const technologies = [
    { 
      name: "Next.js", 
      icon: (
        <svg role="img" viewBox="0 0 48 48" className="h-8 w-8 text-foreground"><path d="M24 47c-2.3 0-4.5-.4-6.6-1.2a22.3 22.3 0 0 1-9.3-5.5A22.5 22.5 0 0 1 2.6 31a23.1 23.1 0 0 1 0-14A22.5 22.5 0 0 1 8.1 8.2a22.3 22.3 0 0 1 9.3-5.5A22.6 22.6 0 0 1 24 1c2.3 0 4.5.4 6.6 1.2a22.3 22.3 0 0 1 9.3 5.5a22.5 22.5 0 0 1 5.5 9.3a22.7 22.7 0 0 1 1.3 6.6A23.1 23.1 0 0 1 45.4 31a22.5 22.5 0 0 1-5.5 9.3a22.3 22.3 0 0 1-9.3 5.5c-2.1.8-4.3 1.2-6.6 1.2Zm0-43.7a20.4 20.4 0 0 0-5.4 1A19.9 19.9 0 0 0 5 19.9v8.2A19.9 19.9 0 0 0 18.6 41.7c1.8.6 3.6.9 5.4.9s3.6-.3 5.4-.9A19.9 19.9 0 0 0 43 28.1v-8.2A19.9 19.9 0 0 0 29.4 4.3a20.4 20.4 0 0 0-5.4-1Zm-1.8 33.1V14.6h3.4v17.2l10.4-17.2h3.9L27.1 27v11.7h-3.4V27.1l-10-15.8h-3.8v27.4h3.5Z" fill="currentColor"></path></svg>
      )
    },
    { 
      name: "React", 
      icon: (
        <svg role="img" viewBox="0 0 32 32" className="h-8 w-8 text-foreground"><path d="M31.39 16.27a1.39 1.39 0 0 0-1-2.45l-9.58-2.7a1.4 1.4 0 0 0-1.68.64l-1.95 3.38a1.39 1.39 0 0 0-.2.72v6.2a1.39 1.39 0 0 0 .2.72l1.96 3.39a1.4 1.4 0 0 0 1.68.63l9.58-2.7a1.39 1.39 0 0 0 1-2.45Z" fill="currentColor"></path><path d="M14.83 28.23a1.4 1.4 0 0 0-1.68-.64l-9.58 2.7a1.39 1.39 0 0 0-1 2.45l4.8 8.3a1.39 1.39 0 0 0 1.22.69h9.58a1.39 1.39 0 0 0 1.22-.69l4.8-8.3a1.39 1.39 0 0 0-1-2.45l-9.58-2.7a1.4 1.4 0 0 0-.68 0ZM1.61 15.73a1.39 1.39 0 0 0-1 2.45l4.8 8.3a1.39 1.39 0 0 0 1.22.69h9.58a1.39 1.39 0 0 0 1.22-.69l4.8-8.3a1.39 1.39 0 0 0-1-2.45L16.5 13a1.4 1.4 0 0 0-1.68.64L12.87 17a1.39 1.39 0 0 0-.2.72v6.2a1.39 1.39 0 0 0 .2.72l1.96 3.39a1.4 1.4 0 0 0 1.68.63Z" transform="rotate(120 12.03 16.27)" fill="currentColor"></path><path d="M22.5 16a6.5 6.5 0 1 0-13 0a6.5 6.5 0 0 0 13 0Z" fill="currentColor"></path></svg>
      )
    },
    { 
      name: "Firebase", 
      icon: (
        <svg role="img" viewBox="0 0 48 48" className="h-8 w-8 text-foreground"><path d="m3.3 36.7 17-17L3.3 2.9c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l19.5 19.5c.4.4.4 1 0 1.4L4.7 40.9c-.4.4-1 .4-1.4 0s-.4-1 0-1.4l-17-17L3.3 2.9Z" transform="translate(5.4 3.4)" fill="currentColor"></path><path d="M25.3 40.1c-.4.4-1 .4-1.4 0l-7-7c-.4-.4-.4-1 0-1.4l17-17c.4-.4 1-.4 1.4 0l7 7c.4.4.4 1 0 1.4l-17 17Z" transform="translate(5.4 3.4)" fill="currentColor"></path><path d="m3.3 36.7 17-17c.4-.4.4-1 0-1.4L4.7 2.9c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l15.6 15.6-17 17c-.4.4-.4 1 0 1.4s1 .4 1.4 0Z" transform="translate(5.4 3.4)" fill="currentColor"></path></svg>
      )
    },
    { 
      name: "Tailwind CSS", 
      icon: (
        <svg role="img" viewBox="0 0 256 154" className="h-8 w-8 text-foreground"><path d="M128 0C93.867 0 72.533 21.333 72.533 55.467c0 21.333 12.8 38.4 32 46.933-17.067-8.533-29.867-25.6-29.867-46.933C74.667 23.467 93.867 0 128 0c34.133 0 55.467 21.333 55.467 55.467 0 21.333-12.8 38.4-32 46.933 17.067-8.533 29.867-25.6 29.867-46.933C181.333 23.467 162.133 0 128 0ZM55.467 72.533C21.333 72.533 0 93.867 0 128c0 34.133 21.333 55.467 55.467 55.467 21.333 0 38.4-12.8 46.933-32-8.533 17.067-25.6 29.867-46.933 29.867C23.467 181.333 0 162.133 0 128c0-34.133 21.333-55.467 55.467-55.467Z" transform="translate(0 -37.2)" fill="currentColor"></path></svg>
      )
    },
    { 
      name: "Node.js", 
      icon: (
        <svg role="img" viewBox="0 0 48 48" className="h-8 w-8 text-foreground"><path d="M43.1 16.8c-.1-.2-.3-.3-.5-.4l-18-10.4c-.2-.1-.4-.2-.6-.2s-.4.1-.6.2l-18 10.4c-.2.1-.4.3-.5.4-.1.2-.2.4-.1.6l9 15.6c.1.2.3.3.5.4l18 10.4c.2.1.4.2.6.2s.4-.1.6-.2l18-10.4c.2-.1.4-.3.5-.4.1-.2.1-.4 0-.6l-9-15.6ZM24.4 4c.1 0 .2.1.3.1l17.1 9.9-8.6 14.9L24.4 4Zm-.8 0c-.1 0-.2.1-.3.1l-8.7 5 8.7-15-.3.1h.3Zm-1.1 39.8L5.2 28.9l8.6-14.9 8.8 15.2v15.2c-.1.1-.3.1-.4 0Zm1.5-15.1L12.4 13.8l17-9.8 8.6 14.9-17.2 9.9Zm17.1 5.1-8.5 4.9v-15l8.5-4.9v15Z" fill="currentColor"></path></svg>
      )
    },
    { 
      name: "Genkit", 
      icon: (
        <svg role="img" viewBox="0 0 1024 1024" className="h-8 w-8 text-foreground"><path d="M384 704a64 64 0 1 0 0-128a64 64 0 0 0 0 128zm0 128a192 192 0 1 1 0-384a192 192 0 0 1 0 384zm256-384a64 64 0 1 0 0-128a64 64 0 0 0 0 128zm0 128a192 192 0 1 1 0-384a192 192 0 0 1 0 384z" fill="currentColor"></path></svg>
      )
    },
    { 
      name: "TypeScript", 
      icon: (
        <svg role="img" viewBox="0 0 48 48" className="h-8 w-8 text-foreground"><path d="M24 0A24 24 0 1 0 24 48A24 24 0 1 0 24 0zM13.636 17.85h6.216V33h5.052V17.85h6.216v-4.104H13.636v4.104z" fill="currentColor"></path></svg>
      )
    },
    { 
      name: "ShadCN UI", 
      icon: (
        <svg role="img" viewBox="0 0 256 256" className="h-8 w-8 text-foreground"><path d="M128.001 0C57.32 0 0 57.312 0 128c0 70.68 57.32 128 128.001 128c70.68 0 128-57.32 128-128C256 57.312 198.681 0 128.001 0Zm-16.14 199.165L50.53 128.01l61.331-71.155l16.14 16.14l-45.19 55.015l45.19 55.015l-16.14 16.14Z" fill="currentColor"></path></svg>
      )
    }
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
                        {tech.icon}
                        <span className="font-semibold text-muted-foreground">{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
}
