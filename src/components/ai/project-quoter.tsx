
'use client';

import Image from 'next/image';
import { useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, ArrowRight, Bot, Check, Download, MessageSquare, Sparkles } from 'lucide-react';
import { type FormState, quoteProjectAction, notifyProposalDownloaded } from '@/app/actions/quoter';
import { ProposalDocument } from '@/components/ai/proposal-document';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const WHATSAPP_NUMBER = '+51975646074';
const VALID_DAYS = 15;

interface ProjectQuoterProps {
  content: {
    lang: 'es' | 'en';
    badgeLabel: string;
    title: string;
    description: string;
    form: {
      responsibleName: {
        label: string;
        placeholder: string;
      };
      companyName: {
        label: string;
        placeholder: string;
      };
      projectName: {
        label: string;
        placeholder: string;
      };
      projectType: {
        label: string;
        items: { value: string; label: string }[];
        otherLabel: string;
        otherPlaceholder: string;
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
      timeline: {
        label: string;
        items: { value: string; label: string }[];
      };
      currency: {
        label: string;
        items: { value: string; label: string }[];
        otherLabel: string;
        otherPlaceholder: string;
      };
      additionalInfo: {
        label: string;
        placeholder: string;
      };
      contactEmail: {
        label: string;
        placeholder: string;
      };
      nextButton: string;
      backButton: string;
      editStepButton: string;
      editButton: string;
      submitButton: string;
      submitButtonPending: string;
    };
    results: {
      title: string;
      downloadButton: string;
      contactButton: string;
      whatsappButton: string;
      disclaimer: string;
      summaryLabel: string;
      scopeLabel: string;
      priceLabel: string;
      recommendationsLabel: string;
      paymentMethodsLabel: string;
      qrCaption: string;
      placeholder: string;
      generatedLabel: string;
      validUntilLabel: string;
      documentTitle: string;
      projectLabel: string;
      contactLabel: string;
      preparedForLabel: string;
      totalLabel: string;
      signatureRepName: string;
      signatureRepRole: string;
      signatureAiRole: string;
      signatureNote: string;
    };
  };
}

const formSchema = z.object({
    responsibleName: z.string().min(2, 'Name must be at least 2 characters.'),
    companyName: z.string().optional(),
    projectName: z.string().min(3, 'Project name must be at least 3 characters.'),
    projectType: z.enum(['landing-page', 'corporate-website', 'ecommerce', 'custom-software', 'pwa', 'other']),
    projectTypeOther: z.string().optional(),
    features: z.array(z.string()),
    design: z.enum(['no-design', 'have-idea', 'have-design']),
    timeline: z.enum(['urgent', '1-2-months', 'flexible']),
    currency: z.enum(['PEN', 'USD', 'other']),
    currencyOther: z.string().optional(),
    additionalInfo: z.string().optional(),
    contactEmail: z.string().email('Please enter a valid email address.'),
    lang: z.enum(['es', 'en']),
  })
  .refine((data) => data.projectType !== 'other' || !!data.projectTypeOther?.trim(), {
    message: 'Please describe what you need.',
    path: ['projectTypeOther'],
  })
  .refine((data) => data.currency !== 'other' || !!data.currencyOther?.trim(), {
    message: 'Please specify the currency.',
    path: ['currencyOther'],
  });

type FormData = z.infer<typeof formSchema>;

const VALID_PROJECT_TYPES = ['landing-page', 'corporate-website', 'ecommerce', 'custom-software', 'pwa', 'other'] as const;

function readPrefilledProjectType(value: string | null): FormData['projectType'] | undefined {
  return VALID_PROJECT_TYPES.find(v => v === value);
}

// Un paso del wizard por campo visible; features y additionalInfo son opcionales
// (form.trigger igual valida y no bloquea si están vacíos).
const STEP_FIELDS = ['responsibleName', 'projectName', 'projectType', 'features', 'design', 'timeline', 'currency', 'additionalInfo', 'contactEmail'] as const;
type StepField = (typeof STEP_FIELDS)[number];

// Texto legible de lo ya respondido, para la lista que queda visible arriba
// de la pregunta activa (no se oculta lo ya contestado).
function summarizeStep(field: StepField, values: FormData, content: ProjectQuoterProps['content'], lang: 'es' | 'en'): string {
  const noneLabel = lang === 'es' ? 'Ninguna seleccionada' : 'None selected';
  const emptyLabel = lang === 'es' ? 'Sin comentarios adicionales' : 'No additional comments';
  switch (field) {
    case 'responsibleName':
      return values.companyName?.trim() ? `${values.responsibleName} · ${values.companyName}` : (values.responsibleName || '—');
    case 'projectName':
      return values.projectName || '—';
    case 'projectType':
      return values.projectType === 'other'
        ? (values.projectTypeOther || '—')
        : content.form.projectType.items.find((i) => i.value === values.projectType)?.label ?? '—';
    case 'features':
      return values.features.length
        ? values.features.map((id) => content.form.features.items.find((i) => i.id === id)?.label).filter(Boolean).join(', ')
        : noneLabel;
    case 'design':
      return content.form.design.items.find((i) => i.value === values.design)?.label ?? '—';
    case 'timeline':
      return content.form.timeline.items.find((i) => i.value === values.timeline)?.label ?? '—';
    case 'currency':
      return values.currency === 'other'
        ? (values.currencyOther || '—')
        : content.form.currency.items.find((i) => i.value === values.currency)?.label ?? '—';
    case 'additionalInfo':
      return values.additionalInfo?.trim() ? values.additionalInfo : emptyLabel;
    case 'contactEmail':
      return values.contactEmail || '—';
  }
}

export function ProjectQuoter({ content }: ProjectQuoterProps) {
  const [isPendingTransition, startTransition] = useTransition();
  const [state, formAction] = useActionState<FormState, FormData>(quoteProjectAction, {
    message: null,
    data: null,
    errors: null,
    projectName: null,
  });

  // Llega desde el portafolio con ?type= preseleccionado según el proyecto
  // que se estaba viendo (ver getQuoteHref en portfolio-client.tsx).
  const searchParams = useSearchParams();
  const prefilledType = readPrefilledProjectType(searchParams.get('type'));

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      responsibleName: '',
      companyName: '',
      projectName: '',
      projectType: prefilledType,
      projectTypeOther: '',
      features: [],
      currencyOther: '',
      additionalInfo: '',
      contactEmail: '',
      lang: content.lang,
    },
  });

  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<HTMLDivElement>(null);

  const [currentStep, setCurrentStep] = useState(0);
  const [showForm, setShowForm] = useState(true);
  const [qrError, setQrError] = useState(false);
  const isLastStep = currentStep === STEP_FIELDS.length - 1;

  const [proposalMeta, setProposalMeta] = useState<{ generatedAt: Date; validUntil: Date } | null>(null);

  // Se re-renderiza el paso cuando cambian, para mostrar/ocultar el campo
  // de detalle de "Otro" al vuelo.
  const watchedProjectType = form.watch('projectType');
  const watchedCurrency = form.watch('currency');

  const goNext = async () => {
    const field = STEP_FIELDS[currentStep];
    const valid = await form.trigger(field);
    if (!valid) return;

    // Validación manual del detalle de "Otro": el .refine() del schema no
    // corre mientras falten por responder otros campos requeridos de pasos
    // posteriores (Zod no evalúa refine si el objeto base no valida antes),
    // así que acá se chequea a mano para bloquear el avance del wizard.
    if (field === 'projectType' && watchedProjectType === 'other' && !form.getValues('projectTypeOther')?.trim()) {
      form.setError('projectTypeOther', { type: 'manual', message: content.form.projectType.otherLabel });
      return;
    }
    if (field === 'currency' && watchedCurrency === 'other' && !form.getValues('currencyOther')?.trim()) {
      form.setError('currencyOther', { type: 'manual', message: content.form.currency.otherLabel });
      return;
    }

    setCurrentStep((s) => Math.min(s + 1, STEP_FIELDS.length - 1));
  };

  const goBack = () => {
    setCurrentStep((s) => Math.max(s - 1, 0));
  };

  const handleDownloadPdf = async () => {
    const input = documentRef.current;
    if (!input || !state.data) return;

    try {
        const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
          import('html2canvas'),
          import('jspdf'),
        ]);
        const canvas = await html2canvas(input, {
            scale: 2,
            backgroundColor: '#ffffff',
            useCORS: true,
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ unit: 'px', format: [canvas.width, canvas.height] });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`propuesta-${state.projectName?.replace(/\s+/g, '-').toLowerCase()}.pdf`);

        const contactEmail = form.getValues('contactEmail');
        if (state.projectName && contactEmail) {
          notifyProposalDownloaded(state.projectName, contactEmail, content.lang).catch(() => {});
        }
    } catch (error) {
        console.error('Error generating PDF:', error);
        toast({
            title: "Error",
            description: "Could not generate PDF.",
            variant: "destructive",
        });
    }
  };

  // Abrir WhatsApp primero (mientras el clic todavía cuenta como gesto del
  // usuario, así los navegadores no bloquean la ventana) y disparar la
  // descarga del PDF en paralelo. wa.me no soporta adjuntar archivos desde
  // un link, así que el mensaje le pide a la persona adjuntar el PDF que
  // se le acaba de descargar.
  const handleWhatsappClick = () => {
    if (!state.data || !state.projectName) return;
    const message = content.lang === 'en'
      ? `Hi DEVMARK, I got a quote for "${state.projectName}" (estimated: ${state.data.price}). I'm attaching the PDF proposal I just downloaded — I'd like to validate this budget now.`
      : `Hola DEVMARK, coticé el proyecto "${state.projectName}" (estimado: ${state.data.price}). Te adjunto el PDF de la propuesta que acabo de descargar, quiero validar este presupuesto ahora.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    handleDownloadPdf();
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
      setShowForm(false);
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      const now = new Date();
      setProposalMeta({ generatedAt: now, validUntil: new Date(now.getTime() + VALID_DAYS * 24 * 60 * 60 * 1000) });
    }
  }, [state, toast]);


  return (
    <section id="project-quoter" className="py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2.5 px-4 py-2.5 mb-5 rounded-2xl bg-brand-lavender/80 backdrop-blur-md text-brand-navy border border-brand-lavender/50 shadow-lg shadow-brand-blue/15 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-brand-blue shrink-0" />
          <span className="font-medium text-[11px] sm:text-sm tracking-wider uppercase">{content.badgeLabel}</span>
        </div>
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-gradient">{content.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{content.description}</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {showForm ? (
          <Card className="bg-primary/5 backdrop-blur-sm border-primary/10">
            <CardHeader className="p-8 pb-0">
              <div className="flex items-center justify-between mb-1">
                <CardTitle>{content.form[STEP_FIELDS[currentStep]].label}</CardTitle>
                <span className="text-xs font-semibold text-muted-foreground shrink-0 ml-4">{currentStep + 1} / {STEP_FIELDS.length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {STEP_FIELDS.map((_, i) => (
                  <div key={i} className={cn('h-1.5 flex-1 rounded-full transition-colors duration-300', i <= currentStep ? 'bg-brand-blue' : 'bg-primary/10')} />
                ))}
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {currentStep > 0 && (
                <div className="mb-6 divide-y divide-border/50 border-b border-border/50">
                  {STEP_FIELDS.slice(0, currentStep).map((field, i) => (
                    <div key={field} className="flex items-center gap-3 py-3 animate-fade-in-up">
                      <div className="w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground">{content.form[field].label}</p>
                        <p className="text-sm font-semibold truncate">{summarizeStep(field, form.getValues(), content, content.lang)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(i)}
                        className="text-xs font-semibold text-brand-blue shrink-0 hover:underline"
                      >
                        {content.form.editStepButton}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) => {
                    startTransition(() => formAction(data));
                  })}
                  onKeyDown={(e) => {
                    const target = e.target as HTMLElement;
                    if (e.key === 'Enter' && target.tagName !== 'TEXTAREA' && !isLastStep) {
                      e.preventDefault();
                      goNext();
                    }
                  }}
                  className="space-y-8"
                >
                   <input type="hidden" {...form.register('lang')} />

                  {currentStep === 0 && (
                    <div className="space-y-6 animate-fade-in-up">
                      <FormField
                        control={form.control}
                        name="responsibleName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{content.form.responsibleName.label}</FormLabel>
                            <FormControl>
                              <Input placeholder={content.form.responsibleName.placeholder} {...field} className="bg-background/50" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{content.form.companyName.label}</FormLabel>
                            <FormControl>
                              <Input placeholder={content.form.companyName.placeholder} {...field} className="bg-background/50" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {currentStep === 1 && (
                    <FormField
                      control={form.control}
                      name="projectName"
                      render={({ field }) => (
                        <FormItem className="animate-fade-in-up">
                          <FormLabel>{content.form.projectName.label}</FormLabel>
                          <FormControl>
                            <Input placeholder={content.form.projectName.placeholder} {...field} className="bg-background/50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {currentStep === 2 && (
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem className="space-y-3 animate-fade-in-up">
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
                  )}

                  {currentStep === 2 && watchedProjectType === 'other' && (
                    <FormField
                      control={form.control}
                      name="projectTypeOther"
                      render={({ field }) => (
                        <FormItem className="animate-fade-in-up">
                          <FormLabel>{content.form.projectType.otherLabel}</FormLabel>
                          <FormControl>
                            <Input placeholder={content.form.projectType.otherPlaceholder} {...field} className="bg-background/50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {currentStep === 3 && (
                    <FormField
                      control={form.control}
                      name="features"
                      render={() => (
                        <FormItem className="animate-fade-in-up">
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
                  )}

                  {currentStep === 4 && (
                    <FormField
                      control={form.control}
                      name="design"
                      render={({ field }) => (
                        <FormItem className="space-y-3 animate-fade-in-up">
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
                  )}

                  {currentStep === 5 && (
                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem className="space-y-3 animate-fade-in-up">
                          <FormLabel>{content.form.timeline.label}</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                               {content.form.timeline.items.map(item => (
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
                  )}

                  {currentStep === 6 && (
                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem className="space-y-3 animate-fade-in-up">
                          <FormLabel>{content.form.currency.label}</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                               {content.form.currency.items.map(item => (
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
                  )}

                  {currentStep === 6 && watchedCurrency === 'other' && (
                    <FormField
                      control={form.control}
                      name="currencyOther"
                      render={({ field }) => (
                        <FormItem className="animate-fade-in-up">
                          <FormLabel>{content.form.currency.otherLabel}</FormLabel>
                          <FormControl>
                            <Input placeholder={content.form.currency.otherPlaceholder} {...field} className="bg-background/50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {currentStep === 7 && (
                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem className="animate-fade-in-up">
                          <FormLabel>{content.form.additionalInfo.label}</FormLabel>
                          <FormControl>
                            <Textarea placeholder={content.form.additionalInfo.placeholder} className="bg-background/50" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {currentStep === 8 && (
                     <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem className="animate-fade-in-up">
                          <FormLabel>{content.form.contactEmail.label}</FormLabel>
                          <FormControl>
                            <Input placeholder={content.form.contactEmail.placeholder} {...field} className="bg-background/50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className={cn('flex gap-3 pt-2', currentStep === 0 ? 'items-center justify-center' : isLastStep ? 'flex-col-reverse sm:flex-row sm:items-center sm:justify-between' : 'items-center justify-between')}>
                    {currentStep > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={goBack}
                        className={cn('h-[52px] px-6 rounded-2xl font-semibold text-sm', isLastStep && 'w-full sm:w-auto')}
                      >
                        {content.form.backButton} <ArrowLeft className="ml-2 h-4 w-4" />
                      </Button>
                    )}

                    {isLastStep ? (
                      <Button type="submit" disabled={isPendingTransition} className={cn('h-[52px] px-8 rounded-2xl font-semibold text-sm border-2 border-transparent bg-brand-blue hover:bg-brand-navy-dark text-white shadow-xl shadow-brand-blue/30 hover:shadow-brand-blue/40 hover:-translate-y-1 transition-all duration-300', currentStep === 0 ? 'w-full sm:w-auto sm:px-16' : 'w-full sm:flex-1')}>
                        {isPendingTransition ? (
                          <>
                            {content.form.submitButtonPending}
                            <Bot className="ml-2 h-4 w-4 animate-spin" />
                          </>
                        ) : (
                          content.form.submitButton
                        )}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={goNext}
                        className={cn('h-[52px] px-8 rounded-2xl font-semibold text-sm border-2 border-transparent bg-brand-blue hover:bg-brand-navy-dark text-white shadow-xl shadow-brand-blue/30 hover:shadow-brand-blue/40 hover:-translate-y-1 transition-all duration-300', currentStep === 0 ? 'w-full sm:w-auto sm:px-16' : 'flex-1')}
                      >
                        {content.form.nextButton} <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-primary/5 backdrop-blur-sm border-primary/10 animate-fade-in-up">
            <CardContent className="flex items-center justify-between gap-4 py-5">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{content.results.projectLabel}</p>
                <p className="font-semibold truncate">{state.projectName}</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => setShowForm(true)} className="shrink-0 rounded-xl">
                {content.form.editButton}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {state.data && (
        <div className="max-w-5xl mx-auto mt-6">
          <Card className="bg-primary/5 backdrop-blur-sm border-primary/10 animate-fade-in-up" ref={resultsRef}>
            <CardHeader>
              <CardTitle>
                {state.projectName ? `${content.results.title} ${state.projectName}` : content.results.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div key={state.projectName}>
                <div className="space-y-6 bg-background p-6 rounded-lg">
                    {proposalMeta && (
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground animate-fade-in-up">
                        <span><strong className="text-foreground">{content.results.generatedLabel}:</strong> {new Intl.DateTimeFormat(content.lang === 'es' ? 'es-PE' : 'en-US', { day: '2-digit', month: 'long', year: 'numeric' }).format(proposalMeta.generatedAt)}</span>
                        <span><strong className="text-foreground">{content.results.validUntilLabel}:</strong> {new Intl.DateTimeFormat(content.lang === 'es' ? 'es-PE' : 'en-US', { day: '2-digit', month: 'long', year: 'numeric' }).format(proposalMeta.validUntil)}</span>
                      </div>
                    )}
                    <div className="animate-fade-in-up">
                        <h3 className="font-semibold mb-2 text-primary">{content.results.summaryLabel}</h3>
                        <p className="text-muted-foreground">{state.data.summary}</p>
                    </div>
                    <div className="animate-fade-in-up stagger-1">
                        <h3 className="font-semibold mb-2 text-primary">{content.results.scopeLabel}</h3>
                        <div className="space-y-3">
                          {(state.data.items ?? []).map((item, i) => (
                            <div key={i} className="flex items-start justify-between gap-4 pb-3 border-b border-border/50 last:border-0">
                              <div>
                                <p className="text-sm font-semibold">{item.title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                              </div>
                              <p className="text-sm font-bold text-primary whitespace-nowrap">{item.price}</p>
                            </div>
                          ))}
                        </div>
                    </div>
                    <div className="animate-fade-in-up stagger-2">
                        <h3 className="font-semibold mb-2 text-primary">{content.results.priceLabel}</h3>
                        <p className="text-2xl font-bold text-gradient">{state.data.price}</p>
                        <p className="text-xs text-muted-foreground mt-2">{content.results.disclaimer}</p>
                    </div>
                    <div className="animate-fade-in-up stagger-3">
                        <h3 className="font-semibold mb-2 text-primary">{content.results.recommendationsLabel}</h3>
                        <div className="p-4 rounded-md bg-background/50 prose prose-invert prose-sm max-w-none">
                            <p>{state.data.recommendations}</p>
                        </div>
                    </div>
                    <div className="animate-fade-in-up stagger-4">
                        <h3 className="font-semibold mb-2 text-primary">{content.results.paymentMethodsLabel}</h3>
                        <div className="flex items-start gap-5">
                          <p className="text-muted-foreground flex-1">{state.data.paymentMethods}</p>
                          {!qrError && (
                            <div className="shrink-0 w-24 text-center">
                              <div className="w-24 h-24 rounded-xl border-2 border-border bg-white flex items-center justify-center overflow-hidden p-1.5">
                                <Image
                                  src="/payment-qr.png"
                                  alt="QR Yape / Plin"
                                  width={96}
                                  height={96}
                                  className="w-full h-full object-contain"
                                  onError={() => setQrError(true)}
                                />
                              </div>
                              <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{content.results.qrCaption}</p>
                            </div>
                          )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-6 animate-fade-in-up stagger-4">
                    <Button onClick={handleDownloadPdf} variant="outline" className={cn('h-[52px] px-6 rounded-2xl font-semibold text-sm', 'border-primary/50 text-primary hover:bg-primary/10 hover:text-primary')}>
                        {content.results.downloadButton} <Download className="ml-2 h-4 w-4" />
                    </Button>
                    <Button asChild className={cn('h-[52px] px-6 rounded-2xl font-semibold text-sm', 'border-2 border-transparent bg-brand-blue hover:bg-brand-navy-dark text-white shadow-xl shadow-brand-blue/30 hover:shadow-brand-blue/40 hover:-translate-y-1 transition-all duration-300')}>
                        <a href={content.lang === 'en' ? '/en/contact' : '/contacto'}>
                            {content.results.contactButton} <MessageSquare className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                    <Button onClick={handleWhatsappClick} className={cn('h-[52px] px-6 rounded-2xl font-semibold text-sm', 'border-2 border-transparent bg-[#25D366] hover:bg-[#1ea952] text-white shadow-xl shadow-[#25D366]/30 hover:shadow-[#25D366]/40 hover:-translate-y-1 transition-all duration-300')}>
                        {content.results.whatsappButton} <MessageSquare className="ml-2 h-4 w-4" />
                    </Button>
                </div>

                {proposalMeta && (
                  <div style={{ position: 'fixed', left: '-9999px', top: 0, pointerEvents: 'none' }} aria-hidden="true">
                    <ProposalDocument
                      ref={documentRef}
                      content={{
                        lang: content.lang,
                        documentTitle: content.results.documentTitle,
                        generatedLabel: content.results.generatedLabel,
                        validUntilLabel: content.results.validUntilLabel,
                        projectLabel: content.results.projectLabel,
                        contactLabel: content.results.contactLabel,
                        preparedForLabel: content.results.preparedForLabel,
                        summaryLabel: content.results.summaryLabel,
                        itemsLabel: content.results.scopeLabel,
                        totalLabel: content.results.totalLabel,
                        recommendationsLabel: content.results.recommendationsLabel,
                        paymentMethodsLabel: content.results.paymentMethodsLabel,
                        qrCaption: content.results.qrCaption,
                        disclaimer: content.results.disclaimer,
                        signatureRepName: content.results.signatureRepName,
                        signatureRepRole: content.results.signatureRepRole,
                        signatureAiRole: content.results.signatureAiRole,
                        signatureNote: content.results.signatureNote,
                      }}
                      responsibleName={form.getValues('responsibleName')}
                      companyName={form.getValues('companyName')}
                      projectName={state.projectName ?? ''}
                      contactEmail={form.getValues('contactEmail')}
                      data={state.data}
                      generatedAt={proposalMeta.generatedAt}
                      validUntil={proposalMeta.validUntil}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}
