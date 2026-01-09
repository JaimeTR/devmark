
'use client';
import { Button } from "@/components/ui/button";
import globeData from "@/data/globe.json";
import { cn } from "@/lib/utils";
import { Rocket, Eye } from "lucide-react";
import Link from "next/link";
import { geoGraticule, geoOrthographic, geoPath } from "d3-geo";
import { useEffect, useMemo, useState } from "react";

interface Stat {
  value: string;
  label: string;
  description: string;
}

interface WorldProps {
  title: string;
  subtitle: string;
  description: string;
  ctaButton: string;
  ctaButton2: string;
  ctaButton2Link?: string;
  stats: readonly Stat[];
}

const D3_SCALE = 150;
const D3_CENTER = [0, 0];

export function World(props: WorldProps) {
  const [rotation, setRotation] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    let lastTime = 0;
    let frameId: number;

    const animate = (time: number) => {
      if (lastTime) {
        setRotation(r => r + (time - lastTime) / 100);
      }
      lastTime = time;
      frameId = requestAnimationFrame(animate);
    }
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const projection = useMemo(() => geoOrthographic()
    .scale(D3_SCALE)
    .center(D3_CENTER as [number, number])
    .rotate([rotation, -20])
    .translate([D3_SCALE, D3_SCALE]), [rotation]);

  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection]);

  const graticule = useMemo(() => geoGraticule()(), []);

  return (
    <section id="world" className="py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="max-w-xl text-center lg:text-left">
          <p className="font-bold uppercase tracking-wider text-gradient-blue mb-2 animate-fade-in-left">{props.subtitle}</p>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter animate-fade-in-left stagger-1">{props.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground animate-fade-in-left stagger-2">
            {props.description}
          </p>
          <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start animate-fade-in-left stagger-3">
            <Button asChild className="btn-gradient text-white" size="lg">
              <Link href="#contact">{props.ctaButton} <Rocket className="ml-2 h-5 w-5"/></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:border-white/80 hover:text-white transition-all">
              <Link href={props.ctaButton2Link ?? '#portfolio'} target={props.ctaButton2Link ? '_blank' : '_self'}>
                {props.ctaButton2} <Eye className="ml-2 h-5 w-5"/>
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative flex items-center justify-center h-96 animate-fade-in-right">
          <div className="absolute inset-0 -z-10 w-full h-full bg-primary/10 rounded-full filter blur-3xl" />
          {isClient ? (
            <svg
                width={D3_SCALE * 2}
                height={D3_SCALE * 2}
                viewBox={`0 0 ${D3_SCALE*2} ${D3_SCALE*2}`}
                className="w-full h-auto max-w-lg"
            >
                <g>
                    <circle
                        fill="hsl(var(--primary) / 0.1)"
                        cx={D3_SCALE}
                        cy={D3_SCALE}
                        r={D3_SCALE}
                    />
                    <path
                        d={pathGenerator(graticule) || ""}
                        fill="none"
                        stroke="hsl(var(--primary) / 0.2)"
                    />
                    <path
                        d={pathGenerator(globeData as any) || ""}
                        fill="hsl(var(--primary) / 0.4)"
                        stroke="hsl(var(--background))"
                    />
                </g>
            </svg>
          ) : (
            <div className="w-full h-full max-w-lg" />
          )}
        </div>
      </div>
      <div className="mt-16 md:mt-24">
        <div className="bg-primary/5 backdrop-blur-sm border-primary/10 rounded-2xl p-8 animate-fade-in-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {props.stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in-up" style={{animationDelay: `${(index % 4) * 0.1}s`}}>
                <h3 className="font-headline text-5xl md:text-6xl font-bold text-primary mb-2">
                  {stat.value}
                </h3>
                <p className="text-lg font-semibold">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
