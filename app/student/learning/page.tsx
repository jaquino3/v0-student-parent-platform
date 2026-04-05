"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Calculator,
  Play,
  Star,
  BookOpen,
} from "lucide-react";

const mathTopics = [
  {
    id: "word-problems",
    title: "Word Problems",
    titleEs: "Problemas de Palabras",
    description: "Learn to solve real-world math problems",
    descriptionEs: "Aprende a resolver problemas matemáticos del mundo real",
    progress: 0,
    difficulty: "intermediate",
    lessons: 5,
    completedLessons: 0,
  },
  {
    id: "adding",
    title: "Adding Numbers",
    titleEs: "Suma de Números",
    description: "Master addition with whole numbers and fractions",
    descriptionEs: "Domina la suma con números enteros y fracciones",
    progress: 60,
    difficulty: "beginner",
    lessons: 4,
    completedLessons: 2,
  },
  {
    id: "subtracting",
    title: "Subtracting Numbers",
    titleEs: "Resta de Números",
    description: "Learn subtraction with borrowing and fractions",
    descriptionEs: "Aprende la resta con préstamos y fracciones",
    progress: 0,
    difficulty: "beginner",
    lessons: 4,
    completedLessons: 0,
  },
];

export default function LearningHub() {
  const { t, language } = useLanguage();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-accent text-accent-foreground";
      case "intermediate":
        return "bg-primary/20 text-primary";
      case "advanced":
        return "bg-[var(--ela)]/20 text-[var(--ela)]";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">{t("nav.learning")}</h1>
        <p className="mt-1 text-muted-foreground">
          {language === "en"
            ? "Choose a topic and start learning"
            : "Elige un tema y comienza a aprender"}
        </p>
      </div>

      {/* Math Topics Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--math)] text-[var(--math-foreground)]">
          <Calculator className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-semibold">{t("learning.math")}</h2>
      </div>

      {/* Math Topics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mathTopics.map((topic) => (
          <Card key={topic.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">
                  {language === "en" ? topic.title : topic.titleEs}
                </CardTitle>
                {topic.progress === 100 && (
                  <Star className="h-5 w-5 shrink-0 fill-[var(--calendar-homework)] text-[var(--calendar-homework)]" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {language === "en" ? topic.description : topic.descriptionEs}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={getDifficultyColor(topic.difficulty)}>
                  {t(`learning.${topic.difficulty}`)}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {topic.completedLessons}/{topic.lessons}{" "}
                  {language === "en" ? "lessons" : "lecciones"}
                </span>
              </div>

              {topic.progress > 0 && (
                <div className="flex items-center gap-2">
                  <Progress value={topic.progress} className="h-2 flex-1" />
                  <span className="text-xs font-medium">{topic.progress}%</span>
                </div>
              )}

              <Button
                className="w-full gap-2"
                variant={topic.progress === 100 ? "outline" : "default"}
                asChild
              >
                <Link href={`/student/learning/math/lesson/${topic.id}`}>
                  {topic.progress === 100 ? (
                    <>
                      <BookOpen className="h-4 w-4" />
                      {language === "en" ? "Review" : "Repasar"}
                    </>
                  ) : topic.progress > 0 ? (
                    <>
                      <Play className="h-4 w-4" />
                      {t("learning.continue")}
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      {t("learning.startLesson")}
                    </>
                  )}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
