import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from "lucide-react";
import { motion } from "motion/react";

const courses = [
  {
    title: "HTML & CSS Fundamentals",
    description:
      "Start your web development journey by mastering the building blocks of the web.",
    level: "Beginner",
    duration: "6 weeks",
    students: "12,450",
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    title: "JavaScript Mastery",
    description:
      "Learn modern JavaScript and build interactive web applications from scratch.",
    level: "Intermediate",
    duration: "10 weeks",
    students: "8,320",
    color: "bg-secondary/10 text-secondary border-secondary/20",
  },
  {
    title: "React Development",
    description:
      "Master React and create dynamic, scalable single-page applications.",
    level: "Advanced",
    duration: "12 weeks",
    students: "6,890",
    color: "bg-accent/10 text-accent border-accent/20",
  },
];

export function CoursesSection() {
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
            Popular <span className="text-secondary">Courses</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Structured learning paths designed to take you from zero to hero
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
            >
              <Card className="p-6 h-full flex flex-col hover:shadow-xl transition-all">
                <Badge className={`w-fit mb-4 ${course.color}`}>
                  {course.level}
                </Badge>
                <h3 className="text-2xl font-semibold mb-3 text-card-foreground">
                  {course.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed grow">
                  {course.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students}</span>
                  </div>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  Learn More
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
