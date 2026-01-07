// This file is machine-generated - edit with care!

'use server';

import { z } from 'zod';
import { quoteProject, type QuoteProjectOutput } from '@/ai/flows/quote-project-flow';
import { supabase, type QuoteRecord, isSupabaseConfigured } from '@/lib/supabase';

const formSchema = z.object({
    projectName: z.string().min(3, 'Project name must be at least 3 characters.'),
    projectType: z.enum(['landing-page', 'corporate-website', 'ecommerce', 'custom-software', 'pwa', 'other']),
    features: z.array(z.string()),
    design: z.enum(['no-design', 'have-idea', 'have-design']),
    additionalInfo: z.string().optional(),
    contactEmail: z.string().email('Please enter a valid email address.'),
    lang: z.enum(['es', 'en']),
});

export type FormState = {
  message: string | null;
  data?: QuoteProjectOutput | null;
  errors?: z.ZodIssue[] | null;
  projectName?: string | null;
};

export async function quoteProjectAction(
  prevState: FormState,
  formData: z.infer<typeof formSchema>
): Promise<FormState> {
  const validatedFields = formSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.issues,
      message: 'Validation error. Please check the fields.',
      data: null,
      projectName: null,
    };
  }
  
  try {
    const result = await quoteProject(validatedFields.data);

    // Guardar en Supabase si está configurado
    if (isSupabaseConfigured() && supabase) {
      try {
        const quoteRecord: QuoteRecord = {
          project_name: validatedFields.data.projectName,
          project_type: validatedFields.data.projectType,
          features: validatedFields.data.features,
          design: validatedFields.data.design,
          additional_info: validatedFields.data.additionalInfo,
          contact_email: validatedFields.data.contactEmail,
          lang: validatedFields.data.lang,
          summary: result.summary,
          scope: result.scope,
          price: result.price,
          recommendations: result.recommendations,
          payment_methods: result.paymentMethods,
        };

        const { error } = await supabase
          .from('quotes')
          .insert([quoteRecord]);

        if (error) {
          console.error('Error saving to Supabase:', error);
          // No bloqueamos el flujo si falla el guardado en BD
        } else {
          console.log('✅ Quote saved to Supabase successfully');
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Continuamos aunque falle el guardado
      }
    } else {
      console.warn('⚠️ Supabase not configured. Quote not saved to database.');
    }

    return {
      message: 'Project quoted successfully!',
      data: result,
      errors: null,
      projectName: validatedFields.data.projectName,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred during quoting. Please try again.',
      data: null,
      errors: null,
      projectName: null,
    };
  }
}
