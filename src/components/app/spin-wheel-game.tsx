'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { Gift } from 'lucide-react';

const segments = [
  { text: 'Financial Tip', color: '#60A5FA', prize: 'A penny saved is a penny earned!' },
  { text: 'Try Again', color: '#FBBF24', prize: 'Better luck next time!' },
  { text: 'Free E-Book', color: '#34D399', prize: 'You won a free e-book on budgeting!' },
  { text: '$10 Gift Card', color: '#34D399', prize: 'You won a $10 Gift Card!' },
  { text: '10% Off', color: '#A78BFA', prize: 'You won 10% off our premium services!' },
  { text: 'Try Again', color: '#FBBF24', prize: 'Better luck next time!' },
  { text: 'Free Consultation', color: '#60A5FA', prize: 'You won a free financial consultation!' },
  { text: 'Try Again', color: '#F87171', prize: 'Better luck next time!' },
];

const SpinWheelGame = () => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const spin = () => {
    if (spinning) return;

    setSpinning(true);
    const randomStop = Math.floor(Math.random() * 360) + 360 * 5; // Spin at least 5 times
    const newRotation = rotation + randomStop;
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      const finalRotation = newRotation % 360;
      const segmentAngle = 360 / segments.length;
      const winningSegmentIndex = Math.floor((360 - (finalRotation % 360) + (segmentAngle/2)) % 360 / segmentAngle);
      setResult(segments[winningSegmentIndex].prize);
      setDialogOpen(true);
    }, 4000); // Corresponds to the animation duration
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-lg">
      <div className="relative w-80 h-80 md:w-96 md:h-96">
        <div 
          className="absolute w-full h-full rounded-full border-8 border-primary transition-transform duration-[4000ms] ease-out"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            background: `conic-gradient(${segments.map((seg, i) => `${seg.color} ${i * (360 / segments.length)}deg, ${seg.color} ${(i + 1) * (360 / segments.length)}deg`).join(', ')})`
          }}
        >
          {segments.map((segment, i) => (
            <div
              key={i}
              className="absolute w-1/2 h-1/2 text-white font-bold text-sm flex items-center justify-center origin-bottom-right"
              style={{
                transform: `rotate(${i * (360 / segments.length) + (360 / segments.length / 2)}deg)`,
                clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
                left: '50%',
                top: '0',
                transformOrigin: '0 100%',
              }}
            >
               <span style={{ transform: 'rotate(-90deg) translate(-50%, -10px)', display: 'inline-block', width: '100px', textAlign: 'center' }}>
                {segment.text}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-background flex items-center justify-center border-4 border-primary">
          <Gift className="w-8 h-8 text-primary" />
        </div>
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-16 border-l-transparent border-r-transparent border-t-primary" style={{borderTopWidth: '16px'}}></div>
      </div>
      <Button onClick={spin} disabled={spinning} className="mt-8">
        {spinning ? 'Spinning...' : 'Spin the Wheel'}
      </Button>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Congratulations!</AlertDialogTitle>
            <AlertDialogDescription>
              {result}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setDialogOpen(false)}>Claim Prize</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SpinWheelGame;
