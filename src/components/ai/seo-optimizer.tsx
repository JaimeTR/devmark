'use client';

import { useFormStatus } from 'react-dom';
import { useActionState, useEffect, useRef } from 'react';
import { optimizeContentAction, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

interface SeoOptimizerProps {
  badge: string;
  title: string;
  subtitle: string;
  contentLabel: string;
  contentPlaceholder: string;
  keywordsLabel: string;
  keywordsPlaceholder: string;
  submitButton: string;
  submitButtonPending: string;
  resultsTitle: string;
  resultsDescription: string;
  optimizedContentLabel: string;
  suggestionsLabel: string;
  placeholder: string;
}

function SubmitButton({ pendingLabel, label }: { pendingLabel: string, label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className={cn("w-full sm:w-auto btn-gradient text-white")}>
      {pending ? (
        <>
          <Bot className="mr-2 h-4 w-4 animate-spin" /> {pendingLabel}
        </>
      ) : (
        label
      )}
    </Button>
  );
}

export function SeoOptimizer(props: SeoOptimizerProps) {
  const initialState: FormState = { message: null, errors: null, data: null };
  const [state, dispatch] = useActionState(optimizeContentAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.errors) {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      } else if (state.data) {
        toast({
          title: "Success",
          description: state.message,
        });
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <section id="seo-optimizer" className="py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge variant="outline" className="mb-4 text-primary border-primary/50">{props.badge}</Badge>
        <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">{props.title}</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          {props.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-primary/5 backdrop-blur-sm border-primary/10">
          <CardHeader>
            <CardTitle>{props.contentLabel}</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={dispatch} ref={formRef} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="content">{props.contentLabel}</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder={props.contentPlaceholder}
                  rows={8}
                  className="bg-background/50"
                  required
                />
                {state.errors?.content && (
                  <p className="text-sm text-destructive">{state.errors.content[0]}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">{props.keywordsLabel}</Label>
                <Input
                  id="keywords"
                  name="keywords"
                  placeholder={props.keywordsPlaceholder}
                  className="bg-background/50"
                  required
                />
                {state.errors?.keywords && (
                  <p className="text-sm text-destructive">{state.errors.keywords[0]}</p>
                )}
              </div>
              <SubmitButton label={props.submitButton} pendingLabel={props.submitButtonPending} />
            </form>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 backdrop-blur-sm border-primary/10">
          <CardHeader>
            <CardTitle>{props.resultsTitle}</CardTitle>
            <CardDescription>{props.resultsDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {state.data ? (
              <>
                <div>
                  <h3 className="font-semibold mb-2 text-primary">{props.optimizedContentLabel}</h3>
                  <div className="p-4 rounded-md bg-background/50 prose prose-invert prose-sm max-w-none">
                    <p>{state.data.optimizedContent}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-primary">
                    <Lightbulb className="inline-block mr-2 h-4 w-4"/>
                    {props.suggestionsLabel}
                  </h3>
                   <div className="p-4 rounded-md bg-background/50 prose prose-invert prose-sm max-w-none">
                    <p>{state.data.suggestions}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center p-8 border-2 border-dashed rounded-lg">
                <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{props.placeholder}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
