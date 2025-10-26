'use server';

/**
 * @fileOverview This flow generates a FAQ section for a financial webpage based on primary and secondary keywords.
 *
 * - generateFaqSection - A function that generates the FAQ section.
 * - GenerateFaqSectionInput - The input type for the generateFaqSection function.
 * - GenerateFaqSectionOutput - The return type for the generateFaqSection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFaqSectionInputSchema = z.object({
  primaryKeyword: z.string().describe('The primary keyword for the financial webpage.'),
  secondaryKeywords: z.string().describe('Secondary keywords related to the primary keyword.'),
});

export type GenerateFaqSectionInput = z.infer<typeof GenerateFaqSectionInputSchema>;

const GenerateFaqSectionOutputSchema = z.object({
  faqSection: z.string().describe('The generated FAQ section, formatted for Google FAQ schema.'),
});

export type GenerateFaqSectionOutput = z.infer<typeof GenerateFaqSectionOutputSchema>;

export async function generateFaqSection(input: GenerateFaqSectionInput): Promise<GenerateFaqSectionOutput> {
  return generateFaqSectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFaqSectionPrompt',
  input: {schema: GenerateFaqSectionInputSchema},
  output: {schema: GenerateFaqSectionOutputSchema},
  prompt: `You are an expert in generating FAQ sections for financial webpages, optimized for Google FAQ schema.

  Based on the primary keyword "{{{primaryKeyword}}}" and secondary keywords "{{{secondaryKeywords}}}", generate a FAQ section with 3-5 relevant questions and answers.
  Format the output as a ready-to-publish HTML content.
  Make sure to wrap each question within <dt> tag and answer within <dd> tag to follow FAQ schema. Exclude the <dl> tag.
  Example:
  <dt>Question 1</dt>
  <dd>Answer 1</dd>
  <dt>Question 2</dt>
  <dd>Answer 2</dd>`,
});

const generateFaqSectionFlow = ai.defineFlow(
  {
    name: 'generateFaqSectionFlow',
    inputSchema: GenerateFaqSectionInputSchema,
    outputSchema: GenerateFaqSectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
