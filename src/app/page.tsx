'use client';

import { useState } from 'react';
import AppHeader from '@/components/app/header';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ArrowRight, CreditCard, Home as HomeIcon, Landmark, TrendingUp, PiggyBank, Shield, Car, Briefcase, ShoppingBag, Heart, FileText, Gift } from "lucide-react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import Image from 'next/image';
import SpinWheelGame from '@/components/app/spin-wheel-game';

const financialProducts = [
  { icon: CreditCard, title: "Credit Cards", description: "Compare travel, cash back & more" },
  { icon: HomeIcon, title: "Mortgages", description: "Get a pre-approval letter" },
  { icon: Landmark, title: "Banking", description: "High-yield savings & checking" },
  { icon: TrendingUp, title: "Investing", description: "Find the right brokerage" },
  { icon: PiggyBank, title: "Personal Loans", description: "Borrow for a large expense" },
  { icon: Shield, title: "Insurance", description: "Protect your family & assets" },
  { icon: Car, title: "Auto Loans", description: "Finance a new or used car" },
  { icon: Briefcase, title: "Small Business", description: "Business credit cards, loans" },
]

const topPicks = [
  { 
    title: "Best Credit Cards of June 2024",
    image: "/placeholder-cc.jpg",
    dataAiHint: "credit card",
  },
  { 
    title: "Best Mortgage Lenders of June 2024",
    image: "/placeholder-house.jpg",
    dataAiHint: "modern house",
  },
  { 
    title: "Best Online Personal Loans of June 2024",
    image: "/placeholder-loan.jpg",
    dataAiHint: "personal finance",
  },
  { 
    title: "Best Robo-Advisors of June 2024",
    image: "/placeholder-invest.jpg",
    dataAiHint: "investment chart",
  },
]

const TempMessageLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
      <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="currentColor"/>
      <path d="M12 12L22 7" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 12V22" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 12L2 7" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 4.5L7 9.5" stroke="#222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">
              Feel good about your money.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We compare, review and rate financial products to help you make smart decisions. It's your money, and we want you to feel good about it.
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="I'm looking for..."
                  className="w-full h-14 pl-12 pr-28 rounded-full text-base bg-secondary"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                <Button className="absolute right-2 top-1/2 -translate-y-1/2 h-10 rounded-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Spin Wheel Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-headline text-center mb-4">Spin to Win!</h2>
            <p className="text-lg text-muted-foreground text-center mb-10">Take a spin for a chance to win a special prize.</p>
            <SpinWheelGame />
          </div>
        </section>

        {/* Financial Products Section */}
        <section className="py-16 bg-secondary/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-headline text-center mb-10">
              Find the right financial products for you
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {financialProducts.map((product, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-xl transition-shadow cursor-pointer border-0 bg-card">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                        <product.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{product.title}</h3>
                  <p className="text-muted-foreground text-sm">{product.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Top Picks Section */}
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold font-headline text-center mb-10">Our top picks for you</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {topPicks.map((pick, index) => (
                        <Card key={index} className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-shadow duration-300 border-0 bg-card">
                            <div className="relative h-40 w-full">
                                <Image 
                                    src={`https://picsum.photos/seed/${index+10}/400/200`} 
                                    alt={pick.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="group-hover:scale-105 transition-transform duration-300"
                                    data-ai-hint={pick.dataAiHint}
                                />
                            </div>
                            <CardContent className="p-4">
                                <CardTitle className="text-base font-bold group-hover:text-primary transition-colors">{pick.title}</CardTitle>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
        
      </main>
      <footer className="bg-secondary/30 border-t">
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-sm">
                <div className="col-span-2 lg:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <TempMessageLogo/>
                        <h3 className="font-bold text-xl tracking-tighter">Temp Message</h3>
                    </div>
                    <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Temp Message, Inc. All Rights Reserved.</p>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Company</h4>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><a href="#" className="hover:text-primary">About Us</a></li>
                        <li><a href="#" className="hover:text-primary">Careers</a></li>
                        <li><a href="#" className="hover:text-primary">Press</a></li>
                        <li><a href="#" className="hover:text-primary">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Legal</h4>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-primary">Terms of Use</a></li>
                        <li><a href="#" className="hover:text-primary">Do Not Sell My Info</a></li>
                    </ul>
                </div>
                <div className="col-span-2 md:col-span-3 lg:col-span-3">
                    <h4 className="font-bold mb-4">Disclaimer</h4>
                    <p className="text-muted-foreground">
                        We are an independent, advertising-supported comparison service. Our goal is to help you make smarter financial decisions by providing you with interactive tools and financial calculators, publishing original and objective content, by enabling you to conduct research and compare information for free - so that you can make financial decisions with confidence.
                    </p>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
