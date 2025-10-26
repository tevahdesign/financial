'use server';

/**
 * @fileOverview A flow that generates a complete, SEO-optimized financial webpage by orchestrating several specialized flows.
 *
 * - generateLandingPage - A function that handles the webpage generation process.
 * - GenerateLandingPageInput - The input type for the generateLandingPage function.
 * - GenerateLandingPageOutput - The return type for the generateLandingPage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {structureFinancialContent} from './structure-financial-content';
import {integrateOfficialSources} from './integrate-official-sources';
import {insertRelevantCTAs} from './insert-relevant-ctas';
import {generateFaqSection} from './generate-faq-section';

const GenerateLandingPageInputSchema = z.object({
  primaryKeyword: z.string().describe('The primary keyword for the webpage.'),
  secondaryKeywords: z.string().describe('Comma separated secondary keywords for the webpage.'),
});
export type GenerateLandingPageInput = z.infer<typeof GenerateLandingPageInputSchema>;

const GenerateLandingPageOutputSchema = z.object({
  webpageContent: z.string().describe('The complete HTML content of the webpage.'),
});
export type GenerateLandingPageOutput = z.infer<typeof GenerateLandingPageOutputSchema>;

export async function generateLandingPage(input: GenerateLandingPageInput): Promise<GenerateLandingPageOutput> {
  return generateLandingPageFlow(input);
}

const generateLandingPageFlow = ai.defineFlow(
  {
    name: 'generateLandingPageFlow',
    inputSchema: GenerateLandingPageInputSchema,
    outputSchema: GenerateLandingPageOutputSchema,
  },
  async input => {
    // Step 1: Generate the basic structure and content
    const structuredContent = await structureFinancialContent(input);

    // Step 2: Integrate official sources for trust
    const contentWithSources = await integrateOfficialSources({
      webpageContent: structuredContent.webpageContent,
      ...input,
    });

    // Step 3: Insert relevant CTAs
    const contentWithCTAs = await insertRelevantCTAs({
      webpageContent: contentWithSources.webpageContent,
      ...input,
    });

    // Step 4: Generate FAQ section (HTML and JSON-LD)
    const { faqHtml, faqJsonLd } = await generateFaqSection(input);

    // Step 5: Combine everything
    const finalContent = `${faqJsonLd}
      ${contentWithCTAs.webpageContentWithCTAs}
      <h2>Frequently Asked Questions</h2>
      <dl>${faqHtml}</dl>`;

    return {
      webpageContent: finalContent,
    };
  }
);
