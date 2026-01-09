
'use client'

import React, { useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface Testimonial {
  name: string;
  company: string;
  avatar: string;
  image: string;
  hint: string;
  quote: string;
}

interface TestimonialsProps {
  badge: string;
  title: string;
  subtitle: string;
  items: readonly Testimonial[];
}

export function Testimonials({ badge, title, subtitle, items }: TestimonialsProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <section id="testimonials" className="py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge variant="outline" className="mb-4 text-primary border-primary/50 animate-fade-in-up">{badge}</Badge>
        <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter animate-fade-in-up stagger-1">{title}</h2>
        <p className="mt-4 text-lg text-muted-foreground animate-fade-in-up stagger-2">{subtitle}</p>
      </div>

      <Carousel
        plugins={[plugin.current]}
        className="w-full animate-fade-in-up"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {items.map((testimonial, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <Card className={cn(
                  "relative h-full transition-all duration-300 flex flex-col group",
                  "bg-primary/5 backdrop-blur-sm border border-primary/10",
                  "hover:bg-gradient-to-br hover:from-primary/10 hover:to-primary/20 hover:border-primary/30 hover:shadow-2xl"
                )}>
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <blockquote className="text-lg mb-6 text-muted-foreground group-hover:text-foreground transition-colors">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="relative p-0.5 rounded-full bg-gradient-to-br from-primary/30 to-primary/80">
                         <Avatar>
                          <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.hint} />
                          <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <p className="font-semibold text-gradient-blue">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
}
