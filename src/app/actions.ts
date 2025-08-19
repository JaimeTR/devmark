'use server';

import { z } from 'zod';
import { optimizeContentForSeo, type OptimizeContentOutput } from '@/ai/flows/optimize-content-for-seo';

const schema = z.object({
  content: z.string({
    required_error: "Content cannot be empty.",
  }).min(20, { message: 'Content must be at least 20 characters long.' }),
  keywords: z.string({
    required_error: "Keywords cannot be empty.",
  }).min(3, { message: 'Please enter at least one keyword.' }),
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
