"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const languages = [
  {
    name: "JavaScript",
    level: "Popular",
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    name: "Python",
    level: "Trending",
    color: "bg-secondary/10 text-secondary border-secondary/20",
  },
  {
    name: "TypeScript",
    level: "Advanced",
    color: "bg-accent/10 text-accent border-accent/20",
  },
  {
    name: "Java",
    level: "Classic",
    color: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  },
  {
    name: "Go",
    level: "Modern",
    color: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  },
  {
    name: "Rust",
    level: "Emerging",
    color: "bg-primary/10 text-primary border-primary/20",
  },
];

export function LanguagesSection() {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
            Learn Any <span className="text-accent">Language</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            From web development to data science, we've got you covered
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="p-6 text-center hover:shadow-lg transition-all">
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">
                  {lang.name}
                </h3>
                <Badge className={`text-xs ${lang.color}`}>{lang.level}</Badge>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
