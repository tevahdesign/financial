'use server';

/**
 * @fileOverview A flow to integrate official sources into a financial webpage.
 *
 * - integrateOfficialSources - A function that integrates official sources into a financial webpage.
 * - IntegrateOfficialSourcesInput - The input type for the integrateOfficialSources function.
 * - IntegrateOfficialSourcesOutput - The return type for the integrateOfficialSources function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntegrateOfficialSourcesInputSchema = z.object({
  webpageContent: z
    .string()
    .describe('The HTML content of the financial webpage to integrate official sources into.'),
  primaryKeyword: z.string().describe('The primary keyword for the webpage.'),
  secondaryKeywords: z
    .string()
    .describe('The secondary keywords for the webpage, comma separated.'),
});
export type IntegrateOfficialSourcesInput = z.infer<
  typeof IntegrateOfficialSourcesInputSchema
>;

const IntegrateOfficialSourcesOutputSchema = z.object({
  webpageContent: z
    .string()
    .describe('The HTML content of the financial webpage with official sources integrated.'),
});
export type IntegrateOfficialSourcesOutput = z.infer<
  typeof IntegrateOfficialSourcesOutputSchema
>;

export async function integrateOfficialSources(
  input: IntegrateOfficialSourcesInput
): Promise<IntegrateOfficialSourcesOutput> {
  return integrateOfficialSourcesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'integrateOfficialSourcesPrompt',
  input: {
    schema: IntegrateOfficialSourcesInputSchema,
  },
  output: {
    schema: IntegrateOfficialSourcesOutputSchema,
  },
  prompt: `You are an expert financial content writer with a strong focus on building trust and authority.
  Given the HTML content of a financial webpage, your task is to enhance it by integrating references to official sources like RBI, SEBI, government websites, and major bank portals.

  The primary keyword for the webpage is: {{{primaryKeyword}}}
  The secondary keywords for the webpage are: {{{secondaryKeywords}}}

  Based on the content and keywords, identify opportunities to add value and credibility by citing these official sources. Provide actual, plausible example URLs where appropriate (e.g., a link to an RBI circular or a specific page on a bank's website).

  Do not remove any existing content. Your goal is to enrich the current content.

  Here is the HTML content of the financial webpage:
  {{{webpageContent}}}

  Return the modified HTML content with the integrated sources.
  Ensure the output is valid HTML.
  `,
});

const integrateOfficialSourcesFlow = ai.defineFlow(
  {
    name: 'integrateOfficialSourcesFlow',
    inputSchema: IntegrateOfficialSourcesInputSchema,
    outputSchema: IntegrateOfficialSourcesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
