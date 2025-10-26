'use server';
import { z } from 'zod';
import { generateFinancialWebpage } from '@/ai/flows/generate-financial-webpage';

const ActionSchema = z.object({
  primaryKeyword: z.string().min(3, 'Primary keyword must be at least 3 characters.'),
  secondaryKeywords: z.string().min(3, 'Secondary keywords must be at least 3 characters.'),
});

export async function generateWebpage(data: { primaryKeyword: string; secondaryKeywords: string }) {
  const validatedFields = ActionSchema.safeParse(data);

  if (!validatedFields.success) {
    const errorMessages = Object.values(validatedFields.error.flatten().fieldErrors).flat().join(' ');
    return {
      error: validatedFields.error.flatten().fieldErrors,
      message: errorMessages || 'Validation failed. Please check your inputs.',
    };
  }

  try {
    const result = await generateFinancialWebpage(validatedFields.data);
    return {
      content: result.webpageContent,
      message: 'Content generated successfully.',
    };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      error: {},
      message: `An error occurred during content generation: ${errorMessage}`,
    };
  }
}
