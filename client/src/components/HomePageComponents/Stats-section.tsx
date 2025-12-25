"use client";

import { motion } from "motion/react";
import { Card } from "@/components/ui/card";

const stats = [
  { value: "50K+", label: "Active Students", color: "text-primary" },
  { value: "200+", label: "Expert Instructors", color: "text-ring" },
  { value: "300+", label: "Hours of Content", color: "text-ring" },
  { value: "95%", label: "Success Rate", color: "text-chart-4" },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="p-8 text-center hover:shadow-lg transition-shadow">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1 + 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}
                >
                  {stat.value}
                </motion.div>
                <p className="text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
