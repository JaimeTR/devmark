
'use client';

import Image from 'next/image';
import { useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, ArrowRight, CalendarClock, Check, Coins, Download, FileText, FolderKanban, LayoutGrid, Lightbulb, ListChecks, Loader2, Mail, MessageSquare, MessageSquareText, Palette, Pencil, Sparkles, User, Wallet } from 'lucide-react';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';
import { DeviImg } from '@/components/site/devi-img';
import { type FormState, quoteProjectAction, notifyProposalDownloaded } from '@/app/actions/quoter';
import { ProposalDocument } from '@/components/ai/proposal-document';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
const STEP_ICONS = [User, FolderKanban, LayoutGrid, ListChecks, Palette, CalendarClock, Coins, MessageSquareText, Mail];
const STEP_LABELS = {
  es: ['Tus datos', 'Proyecto', 'Tipo de proyecto', 'Funcionalidades', 'Diseño', 'Plazo', 'Moneda', 'Detalles', 'Correo'],
  en: ['Your details', 'Project', 'Project type', 'Features', 'Design', 'Timeline', 'Currency', 'Details', 'Email'],
} as const;
const campo = 'field-light h-12';

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
  const watchedProjectType = useWatch({ control: form.control, name: 'projectType' });
  const watchedCurrency = useWatch({ control: form.control, name: 'currency' });

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

  // Cuando llega una cotizacion nueva se ajusta el estado en el mismo render
  // (patron de React para derivar estado de un cambio, sin efecto en cascada).
  const [handledState, setHandledState] = useState(state);
  if (state !== handledState) {
    setHandledState(state);
    if (state.data) {
      setShowForm(false);
      const now = new Date();
      setProposalMeta({ generatedAt: now, validUntil: new Date(now.getTime() + VALID_DAYS * 24 * 60 * 60 * 1000) });
    }
  }

  useEffect(() => {
    if (state.message && state.errors) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
    if (state.data) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state, toast]);


  const step = STEP_FIELDS[currentStep];
  const labels = STEP_LABELS[content.lang];
  const fecha = (d: Date) => new Intl.DateTimeFormat(content.lang === 'es' ? 'es-PE' : 'en-US', { day: '2-digit', month: 'long', year: 'numeric' }).format(d);
  const stepOf = content.lang === 'es' ? `Paso ${currentStep + 1} de ${STEP_FIELDS.length}` : `Step ${currentStep + 1} of ${STEP_FIELDS.length}`;
  const avance = showForm ? currentStep : STEP_FIELDS.length;
  // Devi acompana el cotizador: piensa mientras se arma la propuesta y celebra cuando esta lista.
  const estadoDevi = isPendingTransition ? 'pensando' : state.data ? 'exito' : 'saludo';
  const textoDevi =
    content.lang === 'es'
      ? { pensando: 'Estoy armando tu propuesta…', exito: 'Tu propuesta está lista.', saludo: 'Respóndeme y armo tu propuesta.' }[estadoDevi]
      : { pensando: "I'm putting your proposal together…", exito: 'Your proposal is ready.', saludo: 'Answer me and I will build your proposal.' }[estadoDevi];

  // Opciones de radio como tarjetas seleccionables.
  const radios = (items: { value: string; label: string }[], value: string | undefined, onChange: (v: string) => void) => (
    <RadioGroup onValueChange={onChange} value={value} className="grid gap-2.5 sm:grid-cols-2">
      {items.map((item) => (
        <FormItem key={item.value} className="space-y-0">
          <FormLabel className={cn('opt', value === item.value && 'opt-on')}>
            <FormControl>
              <RadioGroupItem value={item.value} />
            </FormControl>
            {item.label}
          </FormLabel>
        </FormItem>
      ))}
    </RadioGroup>
  );

  return (
    <section id="project-quoter" className="grid gap-4 lg:grid-cols-[300px_1fr] lg:items-start lg:gap-6">
      {/* Avance: cada respuesta queda a la vista y se puede editar. */}
      <aside className="relative hidden overflow-hidden rounded-3xl bg-ink p-6 text-white lg:sticky lg:top-28 lg:block">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/50 blur-[70px]" />
        <p className="relative flex items-center gap-2 text-sm text-ink-muted">
          <Sparkles className="h-4 w-4 text-periwinkle" />
          {content.badgeLabel}
        </p>
        <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
          <span className="block h-full rounded-full bg-periwinkle transition-[width] duration-500" style={{ width: `${(avance / STEP_FIELDS.length) * 100}%` }} />
        </div>
        <ol className="relative mt-6 space-y-1">
          {STEP_FIELDS.map((field, i) => {
            const Icon = STEP_ICONS[i];
            const hecho = i < avance;
            const actual = showForm && i === currentStep;
            const contenido = (
              <>
                <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-[9px] transition-colors', hecho ? 'bg-periwinkle text-ink' : actual ? 'bg-primary text-white' : 'bg-white/[0.07] text-white/45')}>
                  {hecho ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={cn('block text-sm', actual || hecho ? 'text-white' : 'text-white/50')}>{labels[i]}</span>
                  {hecho && <span className="block truncate text-xs text-ink-muted">{summarizeStep(field, form.getValues(), content, content.lang)}</span>}
                </span>
              </>
            );
            return (
              <li key={field}>
                {hecho ? (
                  <button type="button" onClick={() => { setShowForm(true); setCurrentStep(i); }} className="flex w-full items-center gap-3 rounded-xl p-1.5 text-left transition-colors hover:bg-white/[0.06]" title={content.form.editStepButton}>
                    {contenido}
                  </button>
                ) : (
                  <div className={cn('flex items-center gap-3 rounded-xl p-1.5', actual && 'bg-white/[0.06]')}>{contenido}</div>
                )}
              </li>
            );
          })}
        </ol>
        <div className="relative mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
          <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-[11px] bg-white">
            <DeviImg estado={estadoDevi} tamano={44} />
          </span>
          <p className="text-sm text-ink-muted" aria-live="polite">
            {textoDevi}
          </p>
        </div>
      </aside>

      <div className="min-w-0 space-y-4">
        {showForm ? (
          <div className="rounded-3xl bg-white p-6 shadow-[0_24px_60px_-30px_rgba(17,12,41,0.35)] sm:p-10">
            <div className="flex items-center justify-between gap-4 text-sm text-ink/55">
              <span>{stepOf}</span>
              <span className="flex items-center gap-2 lg:hidden">
                <DeviImg estado={estadoDevi} tamano={28} />
                {labels[currentStep]}
              </span>
            </div>
            <div className="mt-3 flex gap-1 lg:hidden">
              {STEP_FIELDS.map((_, i) => (
                <span key={i} className={cn('h-1.5 flex-1 rounded-full transition-colors duration-300', i <= currentStep ? 'bg-primary' : 'bg-ink/10')} />
              ))}
            </div>
            <h2 key={step} className="headline step-in mt-5 text-[clamp(1.6rem,3vw,2.25rem)]">{content.form[step].label}</h2>

            {currentStep > 0 && (
              <details className="mt-5 rounded-xl bg-mist px-4 py-3 text-sm lg:hidden">
                <summary className="cursor-pointer text-ink/70">
                  {content.lang === 'es' ? `Tus respuestas (${currentStep})` : `Your answers (${currentStep})`}
                </summary>
                <ul className="mt-2 divide-y divide-ink/10">
                  {STEP_FIELDS.slice(0, currentStep).map((field, i) => (
                    <li key={field} className="flex items-center gap-3 py-2">
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs text-ink/55">{labels[i]}</span>
                        <span className="block truncate text-ink">{summarizeStep(field, form.getValues(), content, content.lang)}</span>
                      </span>
                      <button type="button" onClick={() => setCurrentStep(i)} className="shrink-0 text-xs font-medium text-primary">
                        {content.form.editStepButton}
                      </button>
                    </li>
                  ))}
                </ul>
              </details>
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
                className="mt-7 space-y-6"
              >
                <input type="hidden" {...form.register('lang')} />

                {currentStep === 0 && (
                  <div className="step-in grid gap-5 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="responsibleName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm text-ink/70">{content.lang === 'es' ? 'Nombre' : 'Name'}</FormLabel>
                          <FormControl>
                            <Input autoFocus placeholder={content.form.responsibleName.placeholder} {...field} className={campo} />
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
                          <FormLabel className="text-sm text-ink/70">{content.form.companyName.label}</FormLabel>
                          <FormControl>
                            <Input placeholder={content.form.companyName.placeholder} {...field} className={campo} />
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
                      <FormItem className="step-in">
                        <FormLabel className="sr-only">{content.form.projectName.label}</FormLabel>
                        <FormControl>
                          <Input autoFocus placeholder={content.form.projectName.placeholder} {...field} className={campo} />
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
                      <FormItem className="step-in">
                        <FormControl>{radios(content.form.projectType.items, field.value, field.onChange)}</FormControl>
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
                      <FormItem className="step-in">
                        <FormLabel className="text-sm text-ink/70">{content.form.projectType.otherLabel}</FormLabel>
                        <FormControl>
                          <Input placeholder={content.form.projectType.otherPlaceholder} {...field} className={campo} />
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
                      <FormItem className="step-in">
                        <FormDescription className="-mt-3 mb-4 text-ink/60">{content.form.features.description}</FormDescription>
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {content.form.features.items.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="features"
                              render={({ field }) => {
                                const marcado = field.value?.includes(item.id);
                                return (
                                  <FormItem className="space-y-0">
                                    <FormLabel className={cn('opt', marcado && 'opt-on')}>
                                      <FormControl>
                                        <Checkbox
                                          checked={marcado}
                                          onCheckedChange={(checked) =>
                                            checked ? field.onChange([...(field.value || []), item.id]) : field.onChange(field.value?.filter((value) => value !== item.id))
                                          }
                                        />
                                      </FormControl>
                                      {item.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
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
                      <FormItem className="step-in">
                        <FormControl>{radios(content.form.design.items, field.value, field.onChange)}</FormControl>
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
                      <FormItem className="step-in">
                        <FormControl>{radios(content.form.timeline.items, field.value, field.onChange)}</FormControl>
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
                      <FormItem className="step-in">
                        <FormControl>{radios(content.form.currency.items, field.value, field.onChange)}</FormControl>
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
                      <FormItem className="step-in">
                        <FormLabel className="text-sm text-ink/70">{content.form.currency.otherLabel}</FormLabel>
                        <FormControl>
                          <Input placeholder={content.form.currency.otherPlaceholder} {...field} className={campo} />
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
                      <FormItem className="step-in">
                        <FormLabel className="sr-only">{content.form.additionalInfo.label}</FormLabel>
                        <FormControl>
                          <Textarea autoFocus rows={5} placeholder={content.form.additionalInfo.placeholder} className={cn(campo, 'h-auto min-h-[140px] py-3')} {...field} />
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
                      <FormItem className="step-in">
                        <FormLabel className="sr-only">{content.form.contactEmail.label}</FormLabel>
                        <FormControl>
                          <Input autoFocus type="email" placeholder={content.form.contactEmail.placeholder} {...field} className={campo} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-6">
                  {currentStep > 0 ? (
                    <button type="button" onClick={goBack} className="btn-outline btn-sm">
                      <span className="btn-tile">
                        <ArrowLeft className="h-4 w-4" />
                      </span>
                      {content.form.backButton}
                    </button>
                  ) : (
                    <span />
                  )}
                  {isLastStep ? (
                    <button type="submit" disabled={isPendingTransition} className="btn-ink disabled:opacity-70">
                      <span className="btn-tile">{isPendingTransition ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}</span>
                      {isPendingTransition ? content.form.submitButtonPending : content.form.submitButton}
                    </button>
                  ) : (
                    <button type="button" onClick={goNext} className="btn-ink">
                      <span className="btn-tile">
                        <ArrowRight className="h-5 w-5" />
                      </span>
                      {content.form.nextButton}
                    </button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 pl-6">
            <div className="min-w-0">
              <p className="text-xs text-ink/55">{content.results.projectLabel}</p>
              <p className="truncate font-medium text-ink">{state.projectName}</p>
            </div>
            <button type="button" onClick={() => setShowForm(true)} className="btn-outline btn-sm shrink-0">
              <span className="btn-tile">
                <Pencil className="h-4 w-4" />
              </span>
              {content.form.editButton}
            </button>
          </div>
        )}

        {state.data && (
          <article ref={resultsRef} key={state.projectName} className="step-in scroll-mt-28 overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_-30px_rgba(17,12,41,0.35)]">
            <header className="relative overflow-hidden bg-ink p-6 text-white sm:p-8">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/60 blur-[80px]" />
              <div className="relative flex flex-wrap items-end justify-between gap-6">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-sm text-ink-muted">
                    <FileText className="h-4 w-4 text-periwinkle" />
                    {content.results.title}
                  </p>
                  <h2 className="headline mt-2 text-[clamp(1.75rem,3.5vw,2.5rem)] text-white">{state.projectName}</h2>
                  {proposalMeta && (
                    <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-muted">
                      <span>{content.results.generatedLabel}: {fecha(proposalMeta.generatedAt)}</span>
                      <span>{content.results.validUntilLabel}: {fecha(proposalMeta.validUntil)}</span>
                    </p>
                  )}
                </div>
                <div className="rounded-2xl bg-white/[0.08] px-5 py-4 ring-1 ring-white/10">
                  <p className="text-xs text-ink-muted">{content.results.totalLabel}</p>
                  <p className="headline mt-1 text-[clamp(1.75rem,3.5vw,2.5rem)] tabular-nums text-white">{state.data.price}</p>
                </div>
              </div>
            </header>

            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.35fr_1fr]">
              <div className="space-y-8">
                <section>
                  <h3 className="text-sm font-medium text-ink/55">{content.results.summaryLabel}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-ink/80">{state.data.summary}</p>
                </section>
                <section>
                  <h3 className="text-sm font-medium text-ink/55">{content.results.scopeLabel}</h3>
                  <ul className="mt-3 divide-y divide-ink/10 rounded-2xl border border-ink/10">
                    {(state.data.items ?? []).map((item, i) => (
                      <li key={i} className="flex items-start gap-4 p-4">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-mist text-xs font-semibold tabular-nums text-ink">{i + 1}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[15px] font-medium text-ink">{item.title}</p>
                          <p className="mt-0.5 text-sm text-ink/60">{item.description}</p>
                        </div>
                        <p className="whitespace-nowrap text-[15px] font-semibold tabular-nums text-primary">{item.price}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs leading-relaxed text-ink/50">{content.results.disclaimer}</p>
                </section>
              </div>
              <div className="space-y-4">
                <section className="rounded-2xl bg-mist p-5">
                  <h3 className="flex items-center gap-2 text-sm font-medium text-ink">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    {content.results.recommendationsLabel}
                  </h3>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink/75">{state.data.recommendations}</p>
                </section>
                <section className="rounded-2xl border border-ink/10 p-5">
                  <h3 className="flex items-center gap-2 text-sm font-medium text-ink">
                    <Wallet className="h-4 w-4 text-primary" />
                    {content.results.paymentMethodsLabel}
                  </h3>
                  <div className="mt-2 flex items-start gap-4">
                    <p className="flex-1 text-sm leading-relaxed text-ink/75">{state.data.paymentMethods}</p>
                    {!qrError && (
                      <div className="w-24 shrink-0 text-center">
                        <div className="grid h-24 w-24 place-items-center overflow-hidden rounded-xl border border-ink/10 bg-white p-1.5">
                          <Image src="/payment-qr.png" alt="QR Yape / Plin" width={96} height={96} className="h-full w-full object-contain" onError={() => setQrError(true)} />
                        </div>
                        <p className="mt-1 text-[10px] leading-tight text-ink/50">{content.results.qrCaption}</p>
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </div>

            <footer className="flex flex-wrap gap-3 border-t border-ink/10 p-6 sm:px-8">
              <button type="button" onClick={handleWhatsappClick} className="btn-ink">
                <span className="btn-tile">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                {content.results.whatsappButton}
              </button>
              <button type="button" onClick={handleDownloadPdf} className="btn-outline">
                <span className="btn-tile">
                  <Download className="h-5 w-5" />
                </span>
                {content.results.downloadButton}
              </button>
              <a href={content.lang === 'en' ? '/en/contact' : '/contacto'} className="btn-outline">
                <span className="btn-tile">
                  <MessageSquare className="h-5 w-5" />
                </span>
                {content.results.contactButton}
              </a>
            </footer>

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
          </article>
        )}
      </div>
    </section>
  );
}
