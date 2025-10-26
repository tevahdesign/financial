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
  prompt: `You are a professional financial content writer and SEO expert. Generate a high-quality, 100% unique financial webpage targeting the keyword: "{{{primaryKeyword}}}" and including secondary keywords: {{{secondaryKeywords}}}.

Requirements:

1. SEO & Structure
   - Title tag with primary keyword.
   - Meta description with primary and secondary keywords.
   - Use proper headings (H1, H2, H3) for structure.  LLM should tool be capable of inferring context from the keywords to use correct h-tags for each generated heading.
   - Include internal linking suggestions.

2. Introduction (100-150 words)
   - Hook the reader.
   - Mention primary keyword.
   - Provide value and relevance.

3. Main Content (800–1500+ words)
   - Include eligibility criteria, key details, and rates or examples.
   - Use tables or bullet points for comparison (e.g., banks, interest rates, plans).
   - Add actionable tips, calculators, or interactive ideas.
   - Incorporate secondary keywords naturally.
   - Write in professional, trustworthy tone suitable for finance.
   - Include numerical examples where possible.

4. FAQ Section (with answers)
   - Cover 3–5 most common questions about the topic.
   - Format as Q&A for Google FAQ schema.

5. Trust Signals
   - Mention official sources (RBI, SEBI, banks, government websites).
   - Include disclaimer about financial information.
   - Suggest author bio snippet (financial expert credentials).

6. Call-to-Action (CTA)
   - Suggest one or more CTAs: "Check rates", "Use EMI calculator", "Apply now".

7. Content Output
   - Provide ready-to-publish HTML content or markdown with headings, paragraphs, tables, and CTA placeholders.
   - Include placeholders for ads if relevant.

Tone: Professional, informative, engaging, trustworthy.
Audience: Finance-savvy users, people looking to compare loans, credit cards, insurance, or investment options.
Goal: High CPC, high AdSense revenue, SEO-friendly, fully unique, structured content.
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
