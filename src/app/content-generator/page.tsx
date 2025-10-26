'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateWebpage } from '../actions';
import AppHeader from '@/components/app/header';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  primaryKeyword: z.string().min(3, 'Primary keyword must be at least 3 characters.'),
  secondaryKeywords: z.string().min(3, 'Secondary keywords must be at least 3 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContentGeneratorPage() {
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primaryKeyword: '',
      secondaryKeywords: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setGeneratedContent(null);
    try {
      const result = await generateWebpage(data);
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.message,
        });
      } else if (result.content){
        setGeneratedContent(result.content);
        toast({
          title: 'Success',
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
        <AppHeader />
        <main className="flex-1 p-4 md:p-8">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <Card>
                <CardHeader>
                    <CardTitle>Generate Financial Content</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                        control={form.control}
                        name="primaryKeyword"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Primary Keyword</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Best credit cards" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="secondaryKeywords"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Secondary Keywords</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder="e.g., travel rewards, cashback, 0% APR"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                            </>
                        ) : (
                            'Generate Content'
                        )}
                        </Button>
                    </form>
                    </Form>
                </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card className="h-full">
                <CardHeader>
                    <CardTitle>Generated Webpage</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading && (
                    <div className="flex items-center justify-center h-96">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                    )}
                    {generatedContent ? (
                    <div
                        className="prose dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: generatedContent }}
                    />
                    ) : (
                        !isLoading && <p className='text-muted-foreground'>Your generated content will appear here.</p>
                    )}
                </CardContent>
                </Card>
            </div>
            </div>
        </main>
    </div>
  );
}
