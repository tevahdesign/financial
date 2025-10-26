'use client';

import { useState } from 'react';
import AppHeader from '@/components/app/header';
import ContentGeneratorForm from '@/components/app/content-generator-form';
import ContentDisplay from '@/components/app/content-display';

export default function Home() {
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 lg:sticky top-8">
            <ContentGeneratorForm
              onGenerationStart={() => {
                setIsLoading(true);
                setGeneratedContent('');
              }}
              onGenerationEnd={(content) => {
                setGeneratedContent(content || '');
                setIsLoading(false);
              }}
              isLoading={isLoading}
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
