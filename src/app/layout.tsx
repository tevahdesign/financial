import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: 'Temp Message | Make all the right money moves',
  description: 'We\'ve gathered our best articles, tools and recommendations to help you reach your financial goals in the US and other Tier 1 countries.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className="dark">
      <body className={inter.className + " antialiased"}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
