"use client";

import { CoursesSection } from "@/components/HomePageComponents/courses-section";
import { CTASection } from "@/components/HomePageComponents/cta-section";
import { Features } from "@/components/HomePageComponents/features";
import { Footer } from "@/components/HomePageComponents/footer";
import { Header } from "@/components/HomePageComponents/header";
import { Hero } from "@/components/HomePageComponents/hero";
import { LanguagesSection } from "@/components/HomePageComponents/languages-section";
import { StatsSection } from "@/components/HomePageComponents/stats-section";
import { TestimonialsSection } from "@/components/HomePageComponents/testimonials-section";


export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <CoursesSection />
        <StatsSection />
        <LanguagesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
