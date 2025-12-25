"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-12 md:p-16 text-center border border-primary/20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty mb-8">
            Join over 50,000 students learning to code and building their dream
            careers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground group"
            >
              Start Learning Today
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              Explore Courses
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
