'use server';
/**
 * @fileOverview A flow to insert relevant CTAs into a financial webpage.
 *
 * - insertRelevantCTAs - A function that inserts relevant CTAs into a financial webpage.
 * - InsertRelevantCTAsInput - The input type for the insertRelevantCTAs function.
 * - InsertRelevantCTAsOutput - The return type for the insertRelevantCTAs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InsertRelevantCTAsInputSchema = z.object({
  webpageContent: z
    .string()
    .describe('The HTML content of the financial webpage to insert CTAs into.'),
  primaryKeyword: z.string().describe('The primary keyword for the webpage.'),
  secondaryKeywords: z
    .string()
    .describe('The secondary keywords for the webpage, comma separated.'),
});
export type InsertRelevantCTAsInput = z.infer<typeof InsertRelevantCTAsInputSchema>;

const InsertRelevantCTAsOutputSchema = z.object({
  webpageContentWithCTAs: z
    .string()
    .describe('The HTML content of the financial webpage with relevant CTAs inserted.'),
});
export type InsertRelevantCTAsOutput = z.infer<typeof InsertRelevantCTAsOutputSchema>;

export async function insertRelevantCTAs(
  input: InsertRelevantCTAsInput
): Promise<InsertRelevantCTAsOutput> {
  return insertRelevantCTAsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'insertRelevantCTAsPrompt',
  input: {schema: InsertRelevantCTAsInputSchema},
  output: {schema: InsertRelevantCTAsOutputSchema},
  prompt: `You are an expert at inserting relevant call-to-action (CTA) prompts into financial webpages.

  Given the HTML content of a financial webpage, insert relevant CTAs to encourage user engagement and drive conversions.

  The primary keyword for the webpage is: {{{primaryKeyword}}}
  The secondary keywords for the webpage are: {{{secondaryKeywords}}}

  Consider the context of the webpage content and the keywords to determine the most appropriate CTAs to insert.

  Examples of CTAs include: "Check rates", "Use EMI calculator", and "Apply now".  Make sure the CTAs are contextually relevant.

  Do not remove any existing content in the webpage, only insert CTAs.

  Here is the HTML content of the financial webpage:
  {{{webpageContent}}}

  Return the modified HTML content with the CTAs inserted.
  Ensure the output is valid HTML.
`,
});

const insertRelevantCTAsFlow = ai.defineFlow(
  {
    name: 'insertRelevantCTAsFlow',
    inputSchema: InsertRelevantCTAsInputSchema,
    outputSchema: InsertRelevantCTAsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
