'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, FileText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface ContentDisplayProps {
  content: string;
  isLoading: boolean;
}

export default function ContentDisplay({ content, isLoading }: ContentDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Reset copied state if content changes
  useEffect(() => {
    setCopied(false);
  }, [content]);

  const LoadingSkeleton = () => (
    <div className="space-y-6 p-1">
      <Skeleton className="h-8 w-3/4" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <Skeleton className="h-6 w-1/2" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-20 border-2 border-dashed border-border rounded-lg">
      <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-medium text-muted-foreground">Generated content will appear here</h3>
      <p className="mt-1 text-sm text-muted-foreground">Fill out the form to get started.</p>
    </div>
  );

  return (
    <Card className="shadow-lg min-h-[60vh]">
      <CardHeader className="flex flex-row items-center justify-between sticky top-[85px] bg-card/80 backdrop-blur-sm z-10 border-b">
        <CardTitle className="font-headline">Generated Webpage</CardTitle>
        {content && !isLoading && (
          <Button variant="outline" size="sm" onClick={handleCopy} className="transition-all">
            {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy HTML'}
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? <LoadingSkeleton /> :
          !content ? <EmptyState /> :
          <div
            className="generated-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        }
      </CardContent>
    </Card>
  );
}
