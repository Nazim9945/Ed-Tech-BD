"use client";

import { Card } from "@/components/ui/card";
import { Code2, Zap, Users, Award } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Code2,
    title: "Interactive Learning",
    description:
      "Write code directly in your browser with instant feedback and guided challenges.",
    color: "text-primary",
  },
  {
    icon: Zap,
    title: "Learn by Doing",
    description:
      "Build real-world projects that you can add to your portfolio immediately.",
    color: "text-secondary",
  },
  {
    icon: Users,
    title: "Community Support",
    description:
      "Connect with fellow learners and get help from mentors whenever you need it.",
    color: "text-accent",
  },
  {
    icon: Award,
    title: "Certifications",
    description:
      "Earn recognized certificates to showcase your skills to potential employers.",
    color: "text-chart-4",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
            Why Choose <span className="text-primary">CodeCraft</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Everything you need to go from beginner to professional developer
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <feature.icon className={`h-10 w-10 mb-4 ${feature.color}`} />
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
