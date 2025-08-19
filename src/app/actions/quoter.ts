// This file is machine-generated - edit with care!

'use server';

import { z } from 'zod';
import { quoteProject, type QuoteProjectOutput } from '@/ai/flows/quote-project-flow';

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
