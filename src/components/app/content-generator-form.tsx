'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateWebpage } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  primaryKeyword: z.string().min(3, { message: 'Primary keyword must be at least 3 characters.' }),
  secondaryKeywords: z.string().min(3, { message: 'Secondary keywords must be at least 3 characters.' }),
});

interface ContentGeneratorFormProps {
  onGenerationStart: () => void;
  onGenerationEnd: (content: string | undefined) => void;
  isLoading: boolean;
  onSubmit?: (values: z.infer<typeof formSchema>) => Promise<void>;
}

export default function ContentGeneratorForm({ onGenerationStart, onGenerationEnd, isLoading, onSubmit }: ContentGeneratorFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primaryKeyword: '',
      secondaryKeywords: '',
    },
  });

  async function defaultOnSubmit(values: z.infer<typeof formSchema>) {
    onGenerationStart();
    const result = await generateWebpage(values);
    if (result.content) {
      onGenerationEnd(result.content);
      toast({
        title: 'Success!',
        description: result.message,
      });
    } else {
      onGenerationEnd(undefined);
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: result.message,
      });
    }
  }

  const handleSubmit = onSubmit || defaultOnSubmit;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-primary">Create Financial Content</CardTitle>
        <CardDescription>Enter your keywords to generate an SEO-optimized webpage.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="primaryKeyword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Keyword</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., best credit cards for travel" {...field} />
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
                    <Textarea placeholder="e.g., travel rewards, airline miles, no foreign transaction fees" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide comma-separated keywords.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
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
  );
}
