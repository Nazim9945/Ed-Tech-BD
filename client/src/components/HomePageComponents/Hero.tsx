"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-4"
            >
              <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                 Learn at Your Own Pace
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
              Master <span className="text-primary">Coding</span> Skills for
              Tomorrow
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground text-pretty mb-8 leading-relaxed">
              Transform your career with interactive courses designed by
              industry experts. Build real projects and join thousands learning
              to code.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground group"
              >
                Start Learning Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group bg-transparent"
              >
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex items-center gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-foreground">50K+</span>
                <span>Active Learners</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-foreground">4.8</span>
                <span>Average Rating</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/person-coding-on-laptop-in-bright-modern-workspace.jpg"
                alt="Person learning to code"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent" />
            </div>

            {/* Floating code card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-lg"
            >
              <pre className="text-xs font-mono">
                <code className="text-secondary">const</code>{" "}
                <code className="text-foreground">learn</code> = () {"=>"} {"{"}
                <br />
                {"  "}
                <code className="text-accent">console</code>.
                <code className="text-primary">log</code>(
                <code className="text-chart-4">'Hello World!'</code>)
                <br />
                {"}"}
              </pre>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
