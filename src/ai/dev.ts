import { config } from 'dotenv';
config();

import '@/ai/flows/generate-financial-webpage.ts';
import '@/ai/flows/structure-financial-content.ts';
import '@/ai/flows/integrate-official-sources.ts';
import '@/ai/flows/insert-relevant-ctas.ts';
import '@/ai/flows/generate-faq-section.ts';