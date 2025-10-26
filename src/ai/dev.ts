'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/structure-financial-content.ts';
import '@/ai/flows/integrate-official-sources.ts';
import '@/ai/flows/insert-relevant-ctas.ts';
import '@/ai/flows/generate-faq-section.ts';
import '@/ai/flows/generate-landing-page.ts';
