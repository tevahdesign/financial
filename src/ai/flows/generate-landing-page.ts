'use server';

/**
 * @fileOverview A flow that generates a complete, SEO-optimized financial webpage based on user-provided primary and secondary keywords.
 *
 * - generateLandingPage - A function that handles the webpage generation process.
 * - GenerateLandingPageInput - The input type for the generateLandingPage function.
 * - GenerateLandingPageOutput - The return type for the generateLandingPage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLandingPageInputSchema = z.object({
  primaryKeyword: z.string().describe('The primary keyword for the webpage.'),
  secondaryKeywords: z.string().describe('Comma separated secondary keywords for the webpage.'),
});
export type GenerateLandingPageInput = z.infer<
  typeof GenerateLandingPageInputSchema
>;

const GenerateLandingPageOutputSchema = z.object({
  webpageContent: z.string().describe('The complete HTML content of the webpage.'),
});
export type GenerateLandingPageOutput = z.infer<
  typeof GenerateLandingPageOutputSchema
>;

export async function generateLandingPage(
  input: GenerateLandingPageInput
): Promise<GenerateLandingPageOutput> {
  return generateLandingPageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLandingPagePrompt',
  input: {schema: GenerateLandingPageInputSchema},
  output: {schema: GenerateLandingPageOutputSchema},
  prompt: `You are a professional financial content writer and SEO expert.
Generate a high-quality, 100% unique financial webpage targeting the keyword: "{{{primaryKeyword}}}"
and including secondary keywords: {{{secondaryKeywords}}}.

Requirements:

1. SEO & Structure
   - Title tag with primary keyword.
   - Meta description with primary and secondary keywords.
   - Use proper headings (H1, H2, H3) for structure.
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

{OPTIONAL: Include example data for rates, banks, or calculators.}

Output the full webpage content, ready for posting.`,
});

const generateLandingPageFlow = ai.defineFlow(
  {
    name: 'generateLandingPageFlow',
    inputSchema: GenerateLandingPageInputSchema,
    outputSchema: GenerateLandingPageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
