'use server';

import { z } from 'zod';
import { visitanteDentroDelLimite } from '@/lib/rate-limit';
import { optimizeContentForSeo, type OptimizeContentOutput } from '@/ai/flows/optimize-content-for-seo';

const schema = z.object({
  content: z.string({
    error: "Content cannot be empty.",
  }).min(20, { message: 'Content must be at least 20 characters long.' })
    .max(8000, { message: 'Content must be at most 8000 characters long.' }),
  keywords: z.string({
    error: "Keywords cannot be empty.",
  }).min(3, { message: 'Please enter at least one keyword.' }).max(300),
});

export type FormState = {
  message: string | null;
  data?: OptimizeContentOutput | null;
  errors?: {
    content?: string[];
    keywords?: string[];
  } | null;
};

export async function optimizeContentAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Cada optimizacion llama a la IA: 10 por hora por visitante.
  if (!(await visitanteDentroDelLimite('optimizador-seo', 10, 60 * 60_000))) {
    return { message: 'Too many requests. Please try again later.', data: null, errors: null };
  }

  const validatedFields = schema.safeParse({
    content: formData.get('content'),
    keywords: formData.get('keywords'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation error. Please check the fields.',
      data: null,
    };
  }
  
  try {
    const result = await optimizeContentForSeo({
      content: validatedFields.data.content,
      keywords: validatedFields.data.keywords,
    });

    return {
      message: 'Content optimized successfully!',
      data: result,
      errors: null,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred during optimization. Please try again.',
      data: null,
      errors: null,
    };
  }
}
