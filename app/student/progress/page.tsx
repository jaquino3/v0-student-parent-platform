"use client";

import { useLanguage } from "@/lib/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Calculator,
  Flame,
  Trophy,
  Target,
  TrendingUp,
  Calendar,
} from "lucide-react";

const weeklyActivity = [
  { day: "Mon", ela: 45, math: 30 },
  { day: "Tue", ela: 30, math: 60 },
  { day: "Wed", ela: 60, math: 45 },
  { day: "Thu", ela: 15, math: 30 },
  { day: "Fri", ela: 45, math: 60 },
  { day: "Sat", ela: 30, math: 15 },
  { day: "Sun", ela: 0, math: 0 },
];

const achievements = [
  { title: "First Story", titleEs: "Primera Historia", icon: BookOpen, earned: true },
  { title: "Math Whiz", titleEs: "Genio Matemático", icon: Calculator, earned: true },
  { title: "Week Streak", titleEs: "Racha Semanal", icon: Flame, earned: true },
  { title: "Perfect Score", titleEs: "Puntuación Perfecta", icon: Trophy, earned: false },
  { title: "10 Lessons", titleEs: "10 Lecciones", icon: Target, earned: true },
  { title: "Speed Reader", titleEs: "Lector Rápido", icon: TrendingUp, earned: false },
];

export default function ProgressPage() {
  const { t, language } = useLanguage();

  const maxMinutes = Math.max(...weeklyActivity.flatMap((d) => [d.ela, d.math]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">{t("progress.title")}</h1>
        <p className="mt-1 text-muted-foreground">
          {language === "en"
            ? "Track your learning journey and achievements"
            : "Sigue tu progreso de aprendizaje y logros"}
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--ela)] text-[var(--ela-foreground)]">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold">68%</p>
              <p className="text-sm text-muted-foreground">{t("progress.elaProgress")}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--math)] text-[var(--math-foreground)]">
              <Calculator className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold">75%</p>
              <p className="text-sm text-muted-foreground">{t("progress.mathProgress")}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Flame className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold">7</p>
              <p className="text-sm text-muted-foreground">{t("progress.streak")}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Trophy className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold">4/6</p>
              <p className="text-sm text-muted-foreground">
                {language === "en" ? "Achievements" : "Logros"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Progress */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[var(--ela)]" />
              {t("progress.elaProgress")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{language === "en" ? "Stories Read" : "Historias Leídas"}</span>
                <span className="font-medium">2/4</span>
              </div>
              <Progress value={50} className="h-3" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{language === "en" ? "Vocabulary Words" : "Palabras de Vocabulario"}</span>
                <span className="font-medium">45/100</span>
              </div>
              <Progress value={45} className="h-3" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>
                  {language === "en" ? "Comprehension Quizzes" : "Quizzes de Comprensión"}
                </span>
                <span className="font-medium">8/10</span>
              </div>
              <Progress value={80} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[var(--math)]" />
              {t("progress.mathProgress")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{language === "en" ? "Topics Completed" : "Temas Completados"}</span>
                <span className="font-medium">1/5</span>
              </div>
              <Progress value={20} className="h-3" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{language === "en" ? "Lessons Finished" : "Lecciones Terminadas"}</span>
                <span className="font-medium">9/28</span>
              </div>
              <Progress value={32} className="h-3" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{language === "en" ? "Practice Problems" : "Problemas de Práctica"}</span>
                <span className="font-medium">75/100</span>
              </div>
              <Progress value={75} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {t("progress.weeklyActivity")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between gap-2">
            {weeklyActivity.map((day) => (
              <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-col gap-1">
                  <div
                    className="w-full rounded-t bg-[var(--ela)] transition-all"
                    style={{ height: `${(day.ela / maxMinutes) * 80}px` }}
                  />
                  <div
                    className="w-full rounded-b bg-[var(--math)] transition-all"
                    style={{ height: `${(day.math / maxMinutes) * 80}px` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{day.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-[var(--ela)]" />
              <span className="text-sm text-muted-foreground">{t("learning.ela")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-[var(--math)]" />
              <span className="text-sm text-muted-foreground">{t("learning.math")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            {language === "en" ? "Achievements" : "Logros"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.title}
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-colors ${
                  achievement.earned
                    ? "border-primary/20 bg-primary/5"
                    : "border-border bg-muted/50 opacity-50"
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    achievement.earned
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <achievement.icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-medium">
                  {language === "en" ? achievement.title : achievement.titleEs}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
