'use client';

import { useState } from 'react';
import AppHeader from '@/components/app/header';
import ContentGeneratorForm from '@/components/app/content-generator-form';
import ContentDisplay from '@/components/app/content-display';
import { generate } from './actions';
import { useToast } from '@/hooks/use-toast';

export default function LandingPage() {
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async (values: { primaryKeyword: string; secondaryKeywords: string }) => {
    setIsLoading(true);
    setGeneratedContent('');
    const result = await generate(values);
    if (result.content) {
      setGeneratedContent(result.content);
      toast({
        title: 'Success!',
        description: result.message,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: result.message,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 lg:sticky top-8">
            <ContentGeneratorForm
              onGenerationStart={() => {
                // This is handled in handleGenerate
              }}
              onGenerationEnd={(content) => {
                 // This is handled in handleGenerate
              }}
              isLoading={isLoading}
              onSubmit={handleGenerate}
            />
          </div>
          <div className="lg:col-span-2">
            <ContentDisplay
              content={generatedContent}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
