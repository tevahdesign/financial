'use server';

/**
 * @fileOverview Generates and structures financial content for a webpage based on provided keywords.
 *
 * - structureFinancialContent - A function that generates the financial content.
 * - StructureFinancialContentInput - The input type for the structureFinancialContent function.
 * - StructureFinancialContentOutput - The return type for the structureFinancialContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StructureFinancialContentInputSchema = z.object({
  primaryKeyword: z.string().describe('The primary keyword for the financial webpage.'),
  secondaryKeywords: z.string().describe('Comma-separated secondary keywords to include in the content.'),
});
export type StructureFinancialContentInput = z.infer<typeof StructureFinancialContentInputSchema>;

const StructureFinancialContentOutputSchema = z.object({
  webpageContent: z.string().describe('The generated HTML content for the financial webpage.'),
});
export type StructureFinancialContentOutput = z.infer<typeof StructureFinancialContentOutputSchema>;

export async function structureFinancialContent(input: StructureFinancialContentInput): Promise<StructureFinancialContentOutput> {
  return structureFinancialContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'structureFinancialContentPrompt',
  input: {schema: StructureFinancialContentInputSchema},
  output: {schema: StructureFinancialContentOutputSchema},
  prompt: `You are a professional financial content writer and SEO expert. Generate a high-quality, 100% unique financial article targeting the keyword: "{{{primaryKeyword}}}" and including secondary keywords: {{{secondaryKeywords}}}.

Requirements:

1.  **SEO & Structure**
    *   Title tag with primary keyword.
    *   Meta description with primary and secondary keywords.
    *   Use proper headings (H1, H2, H3) for structure.
    *   Include internal linking suggestions.

2.  **Introduction (100-150 words)**
    *   Hook the reader.
    *   Mention primary keyword.
    *   Provide value and relevance.

3.  **Main Content (800–1500+ words)**
    *   Include eligibility criteria, key details, and rates or examples.
    *   Use tables or bullet points for comparison (e.g., banks, interest rates, plans).
    *   Add actionable tips, calculators, or interactive ideas.
    *   Incorporate secondary keywords naturally.
    *   Write in professional, trustworthy tone suitable for finance.
    *   Include numerical examples where possible.

4.  **Content Output**
    *   Provide ready-to-publish HTML content with headings, paragraphs, and tables.
    *   Do NOT include FAQ sections, CTAs, or disclaimers as they will be added later.

Tone: Professional, informative, engaging, trustworthy.
Audience: Finance-savvy users, people looking to compare loans, credit cards, insurance, or investment options.
Goal: High CPC, high AdSense revenue, SEO-friendly, fully unique, structured content.

Output the main article content only.
`,
});

const structureFinancialContentFlow = ai.defineFlow(
  {
    name: 'structureFinancialContentFlow',
    inputSchema: StructureFinancialContentInputSchema,
    outputSchema: StructureFinancialContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
