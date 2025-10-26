import { Landmark } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="bg-card border-b shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <Landmark className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-headline font-bold text-foreground">
            FinanceFlow Writer
          </h1>
        </div>
      </div>
    </header>
  );
}
