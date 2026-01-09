'use client';

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DraftingCompass, Megaphone, Wrench, Lightbulb, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

interface Service {
  icon: string;
  title: string;
  description: string;
  href: string;
}

interface AdditionalServicesProps {
  title: string;
  subtitle: string;
  items: readonly Service[];
  moreInfoButton: string;
}

const icons = {
  DraftingCompass: <DraftingCompass className="h-8 w-8 text-primary" />,
  Megaphone: <Megaphone className="h-8 w-8 text-primary" />,
  Wrench: <Wrench className="h-8 w-8 text-primary" />,
  Lightbulb: <Lightbulb className="h-8 w-8 text-primary" />,
};

export function AdditionalServices({ title, subtitle, items, moreInfoButton }: AdditionalServicesProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="additional-services" className="py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter animate-fade-in-up">{title}</h2>
        <p className="mt-4 text-lg text-muted-foreground animate-fade-in-up stagger-1">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((service, index) => (
          <div key={index} className="group animate-fade-in-up" style={{animationDelay: `${(index % 4) * 0.1}s`}}>
             <Card className={cn(
                "relative h-full transition-all duration-300 flex flex-col",
                "bg-primary/3 backdrop-blur-sm border border-primary/10",
                hoveredIndex === index && "gradient-border-hover"
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              >
                <CardHeader className="p-8 h-full flex flex-col items-start text-left flex-grow">
                  <div className="p-3 bg-primary/10 rounded-lg mb-4 w-fit">
                    {icons[service.icon as keyof typeof icons]}
                  </div>
                  <CardTitle className="font-headline text-xl text-gradient mb-2">{service.title}</CardTitle>
                  <div className="flex-grow">
                    <CardDescription className="text-base text-muted-foreground">
                      {service.description}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" asChild className="mt-6 p-0 h-auto text-primary hover:bg-transparent hover:text-white">
                    <Link href={service.href ?? '#'}>
                      {moreInfoButton}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
              </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
