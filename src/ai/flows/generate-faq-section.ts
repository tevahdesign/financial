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

const FAQItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const GenerateFaqSectionOutputSchema = z.object({
  faqJsonLd: z.string().describe('The generated FAQ section as a JSON-LD script tag.'),
  faqHtml: z.string().describe('The generated FAQ section as HTML using <dt> and <dd> tags.'),
});

export type GenerateFaqSectionOutput = z.infer<typeof GenerateFaqSectionOutputSchema>;

export async function generateFaqSection(input: GenerateFaqSectionInput): Promise<GenerateFaqSectionOutput> {
  return generateFaqSectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFaqSectionPrompt',
  input: {schema: GenerateFaqSectionInputSchema},
  output: {
    schema: z.object({
      faqs: z.array(FAQItemSchema),
    }),
  },
  prompt: `You are an expert in generating FAQ sections for financial webpages, optimized for Google FAQ schema.

  Based on the primary keyword "{{{primaryKeyword}}}" and secondary keywords "{{{secondaryKeywords}}}", generate 3-5 relevant questions and their corresponding answers.
  `,
});

const generateFaqSectionFlow = ai.defineFlow(
  {
    name: 'generateFaqSectionFlow',
    inputSchema: GenerateFaqSectionInputSchema,
    outputSchema: GenerateFaqSectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate FAQ content.');
    }

    const {faqs} = output;

    const faqHtml = faqs.map(faq => `<dt>${faq.question}</dt><dd>${faq.answer}</dd>`).join('');

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    const faqJsonLd = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;

    return {
      faqJsonLd,
      faqHtml,
    };
  }
);
