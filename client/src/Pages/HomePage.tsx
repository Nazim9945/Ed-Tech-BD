"use client";

import { CoursesSection } from "@/components/HomePageComponents/Courses-section";
import { CTASection } from "@/components/HomePageComponents/Cta-section";
import { Features } from "@/components/HomePageComponents/Features";
import { Footer } from "@/components/HomePageComponents/Footer";
import { Header } from "@/components/HomePageComponents/Header";
import { Hero } from "@/components/HomePageComponents/Hero";
import { LanguagesSection } from "@/components/HomePageComponents/Languages-section";
import { StatsSection } from "@/components/HomePageComponents/Stats-section";
import { TestimonialsSection } from "@/components/HomePageComponents/Testimonials-section";


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
