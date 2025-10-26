import { Search, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TempMessageLogo = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
      <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="currentColor"/>
      <path d="M12 12L22 7" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 12V22" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 12L2 7" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 4.5L7 9.5" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

export default function AppHeader() {
  return (
    <header className="bg-background border-b shadow-sm sticky top-0 z-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <TempMessageLogo />
            <h1 className="text-3xl font-bold text-foreground tracking-tighter">
              Temp Message
            </h1>
          </div>
          <div className="hidden md:flex flex-1 mx-8 max-w-lg">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full h-10 pl-10 pr-4 rounded-full bg-secondary text-base"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#" className="text-foreground hover:text-primary transition-colors">Credit Cards</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Mortgages</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Investing</a>
          </nav>
          <div className="flex items-center gap-2 ml-6">
            <Button variant="ghost">Log in</Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">Sign up</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
