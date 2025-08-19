
'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Bot, Download, MessageSquare, Sparkles } from 'lucide-react';
import { type FormState, quoteProjectAction } from '@/app/actions/quoter';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ProjectQuoterProps {
  content: {
    lang: 'es' | 'en';
    title: string;
    description: string;
    form: {
      projectName: {
        label: string;
        placeholder: string;
      };
      projectType: {
        label: string;
        items: { value: string; label: string }[];
      };
      features: {
        label: string;
        description: string;
        items: { id: string; label: string }[];
      };
      design: {
        label: string;
        items: { value: string; label: string }[];
      };
      additionalInfo: {
        label: string;
        placeholder: string;
      };
      contactEmail: {
        label: string;
        placeholder: string;
      };
      submitButton: string;
      submitButtonPending: string;
    };
    results: {
      title: string;
      downloadButton: string;
      contactButton: string;
      summaryLabel: string;
      scopeLabel: string;
      priceLabel: string;
      recommendationsLabel: string;
      paymentMethodsLabel: string;
      placeholder: string;
    };
  };
}

const formSchema = z.object({
    projectName: z.string().min(3, 'Project name must be at least 3 characters.'),
    projectType: z.enum(['landing-page', 'corporate-website', 'ecommerce', 'custom-software', 'pwa', 'other']),
    features: z.array(z.string()),
    design: z.enum(['no-design', 'have-idea', 'have-design']),
    additionalInfo: z.string().optional(),
    contactEmail: z.string().email('Please enter a valid email address.'),
    lang: z.enum(['es', 'en']),
});

type FormData = z.infer<typeof formSchema>;


export function ProjectQuoter({ content }: ProjectQuoterProps) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(quoteProjectAction, {
    message: null,
    data: null,
    errors: null,
    projectName: null,
  });
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      features: [],
      additionalInfo: '',
      contactEmail: '',
      lang: content.lang,
    },
  });

  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);
  const proposalRef = useRef<HTMLDivElement>(null);


  const handleDownloadPdf = async () => {
    const input = proposalRef.current;
    if (!input) return;

    try {
        const canvas = await html2canvas(input, {
            scale: 2,
            backgroundColor: null,
            useCORS: true,
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'px', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`proposal-${state.projectName?.replace(/\s+/g, '-').toLowerCase()}.pdf`);
    } catch (error) {
        console.error('Error generating PDF:', error);
        toast({
            title: "Error",
            description: "Could not generate PDF.",
            variant: "destructive",
        });
    }
  };

  useEffect(() => {
    if (state.message) {
      if (state.errors) {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      }
    }
     if (state.data) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state, toast]);
  

  return (
    <section id="project-quoter" className="py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-gradient">{content.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{content.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <Card className="bg-primary/5 backdrop-blur-sm border-primary/10">
          <CardHeader>
            <CardTitle>{content.form.projectName.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(formAction)} className="space-y-8">
                 <input type="hidden" {...form.register('lang')} />
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{content.form.projectName.label}</FormLabel>
                      <FormControl>
                        <Input placeholder={content.form.projectName.placeholder} {...field} className="bg-background/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                 <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>{content.form.projectType.label}</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {content.form.projectType.items.map(item => (
                            <FormItem key={item.value} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={item.value} />
                              </FormControl>
                              <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="features"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>{content.form.features.label}</FormLabel>
                        <FormDescription>{content.form.features.description}</FormDescription>
                      </div>
                      {content.form.features.items.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="features"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), item.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="design"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>{content.form.design.label}</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                           {content.form.design.items.map(item => (
                            <FormItem key={item.value} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={item.value} />
                              </FormControl>
                              <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{content.form.additionalInfo.label}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={content.form.additionalInfo.placeholder} className="bg-background/50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                 <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{content.form.contactEmail.label}</FormLabel>
                      <FormControl>
                        <Input placeholder={content.form.contactEmail.placeholder} {...field} className="bg-background/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending} className="w-full btn-gradient text-white">
                  {isPending ? (
                    <>
                      <Bot className="mr-2 h-4 w-4 animate-spin" />
                      {content.form.submitButtonPending}
                    </>
                  ) : (
                    content.form.submitButton
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="lg:sticky top-24 h-fit" ref={resultsRef}>
          <Card className="bg-primary/5 backdrop-blur-sm border-primary/10">
            <CardHeader>
              <CardTitle>
                {state.projectName ? `${content.results.title} ${state.projectName}` : content.results.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
            {state.data ? (
              <div>
                <div ref={proposalRef} className="space-y-6 bg-background p-6 rounded-lg">
                    <div>
                        <h3 className="font-semibold mb-2 text-primary">{content.results.summaryLabel}</h3>
                        <p className="text-muted-foreground">{state.data.summary}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2 text-primary">{content.results.scopeLabel}</h3>
                        <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                            {state.data.scope.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2 text-primary">{content.results.priceLabel}</h3>
                        <p className="text-2xl font-bold text-gradient">{state.data.price}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2 text-primary">{content.results.recommendationsLabel}</h3>
                        <div className="p-4 rounded-md bg-background/50 prose prose-invert prose-sm max-w-none">
                            <p>{state.data.recommendations}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2 text-primary">{content.results.paymentMethodsLabel}</h3>
                        <p className="text-muted-foreground">{state.data.paymentMethods}</p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button onClick={handleDownloadPdf} variant="outline" className="w-full sm:w-auto border-primary/50 text-primary hover:bg-primary/10 hover:text-white">
                        <Download className="mr-2 h-4 w-4" /> {content.results.downloadButton}
                    </Button>
                    <Button asChild className="w-full sm:w-auto btn-gradient text-white">
                        <a href="#contact">
                            <MessageSquare className="mr-2 h-4 w-4" /> {content.results.contactButton}
                        </a>
                    </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8 border-2 border-dashed rounded-lg">
                <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{content.results.placeholder}</p>
              </div>
            )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
