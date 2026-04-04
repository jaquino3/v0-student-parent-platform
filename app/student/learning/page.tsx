"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Calculator,
  Play,
  Clock,
  Star,
  CheckCircle2,
  BookOpenCheck,
  Sparkles,
} from "lucide-react";

const stories = [
  {
    id: "1",
    title: "The Little Prince",
    titleEs: "El Principito",
    preview: "A pilot stranded in the desert meets a young prince from a tiny asteroid...",
    previewEs: "Un piloto varado en el desierto conoce a un joven príncipe de un pequeño asteroide...",
    progress: 45,
    difficulty: "intermediate",
    completed: false,
  },
  {
    id: "2",
    title: "The Giving Tree",
    titleEs: "El Árbol Generoso",
    preview: "A story about the relationship between a boy and a tree who loves him unconditionally...",
    previewEs: "Una historia sobre la relación entre un niño y un árbol que lo ama incondicionalmente...",
    progress: 100,
    difficulty: "beginner",
    completed: true,
  },
  {
    id: "3",
    title: "Charlotte's Web",
    titleEs: "La Telaraña de Carlota",
    preview: "The tale of a pig named Wilbur and his friendship with a spider named Charlotte...",
    previewEs: "La historia de un cerdo llamado Wilbur y su amistad con una araña llamada Carlota...",
    progress: 0,
    difficulty: "intermediate",
    completed: false,
  },
  {
    id: "4",
    title: "Don Quixote (Adapted)",
    titleEs: "Don Quijote (Adaptado)",
    preview: "Follow the adventures of a man who believes himself to be a knight...",
    previewEs: "Sigue las aventuras de un hombre que cree ser un caballero...",
    progress: 0,
    difficulty: "advanced",
    completed: false,
  },
];

const mathTopics = [
  {
    id: "1",
    title: "Adding & Subtracting Fractions",
    titleEs: "Suma y Resta de Fracciones",
    progress: 60,
    difficulty: "beginner",
    lessons: 5,
    completedLessons: 3,
  },
  {
    id: "2",
    title: "Multiplying Fractions",
    titleEs: "Multiplicación de Fracciones",
    progress: 100,
    difficulty: "beginner",
    lessons: 4,
    completedLessons: 4,
  },
  {
    id: "3",
    title: "Introduction to Algebra",
    titleEs: "Introducción al Álgebra",
    progress: 25,
    difficulty: "intermediate",
    lessons: 8,
    completedLessons: 2,
  },
  {
    id: "4",
    title: "Geometry Basics",
    titleEs: "Geometría Básica",
    progress: 0,
    difficulty: "beginner",
    lessons: 6,
    completedLessons: 0,
  },
  {
    id: "5",
    title: "Word Problems",
    titleEs: "Problemas de Palabras",
    progress: 0,
    difficulty: "intermediate",
    lessons: 5,
    completedLessons: 0,
  },
];

export default function LearningHub() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("ela");

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
            ? "Choose a subject and start learning"
            : "Elige una materia y comienza a aprender"}
        </p>
      </div>

      {/* AI Lesson Generator Banner */}
      <Card className="border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Sparkles className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">
              {language === "en" ? "AI-Powered Learning" : "Aprendizaje con IA"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {language === "en"
                ? "Get personalized lessons created just for you based on your level and interests"
                : "Obtén lecciones personalizadas creadas especialmente para ti según tu nivel e intereses"}
            </p>
          </div>
          <Button asChild size="lg" className="gap-2">
            <Link href="/student/learning/ai-lesson">
              <Sparkles className="h-4 w-4" />
              {language === "en" ? "Generate Lesson" : "Generar Lección"}
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:grid-cols-none">
          <TabsTrigger value="ela" className="gap-2">
            <BookOpen className="h-4 w-4" />
            {t("learning.ela")}
          </TabsTrigger>
          <TabsTrigger value="math" className="gap-2">
            <Calculator className="h-4 w-4" />
            {t("learning.math")}
          </TabsTrigger>
        </TabsList>

        {/* ELA Tab */}
        <TabsContent value="ela" className="mt-6">
          <Card className="mb-6 border-[var(--ela)]/20 bg-[var(--ela)]/5">
            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--ela)] text-[var(--ela-foreground)]">
                <BookOpenCheck className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{t("learning.stories")}</h2>
                <p className="text-sm text-muted-foreground">
                  {language === "en"
                    ? "Bilingual stories with translation support, audio, and comprehension questions"
                    : "Historias bilingües con soporte de traducción, audio y preguntas de comprensión"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[var(--ela)]">2/4</p>
                  <p className="text-xs text-muted-foreground">{t("learning.completed")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            {stories.map((story) => (
              <Card key={story.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {language === "en" ? story.title : story.titleEs}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {language === "en" ? story.preview : story.previewEs}
                        </p>
                      </div>
                      {story.completed && (
                        <CheckCircle2 className="ml-2 h-5 w-5 shrink-0 text-accent" />
                      )}
                    </div>

                    <div className="mb-4 flex items-center gap-2">
                      <Badge variant="secondary" className={getDifficultyColor(story.difficulty)}>
                        {t(`learning.${story.difficulty}`)}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>15 min</span>
                      </div>
                    </div>

                    {story.progress > 0 && story.progress < 100 && (
                      <div className="mb-4 flex items-center gap-2">
                        <Progress value={story.progress} className="h-2 flex-1" />
                        <span className="text-xs text-muted-foreground">{story.progress}%</span>
                      </div>
                    )}

                    <Button
                      className="w-full gap-2"
                      variant={story.completed ? "outline" : "default"}
                      asChild
                    >
                      <Link href={`/student/learning/ela/story/${story.id}`}>
                        {story.completed ? (
                          <>
                            <BookOpen className="h-4 w-4" />
                            {language === "en" ? "Read Again" : "Leer de Nuevo"}
                          </>
                        ) : story.progress > 0 ? (
                          <>
                            <Play className="h-4 w-4" />
                            {t("learning.continue")}
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4" />
                            {t("learning.read")}
                          </>
                        )}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Math Tab */}
        <TabsContent value="math" className="mt-6">
          <Card className="mb-6 border-[var(--math)]/20 bg-[var(--math)]/5">
            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--math)] text-[var(--math-foreground)]">
                <Calculator className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{t("learning.math")}</h2>
                <p className="text-sm text-muted-foreground">
                  {language === "en"
                    ? "Interactive lessons with explanations, examples, and practice problems"
                    : "Lecciones interactivas con explicaciones, ejemplos y problemas de práctica"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[var(--math)]">9/28</p>
                  <p className="text-xs text-muted-foreground">{t("progress.lessonsCompleted")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

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

                  <div className="flex items-center gap-2">
                    <Progress value={topic.progress} className="h-2 flex-1" />
                    <span className="text-xs font-medium">{topic.progress}%</span>
                  </div>

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
        </TabsContent>
      </Tabs>
    </div>
  );
}
