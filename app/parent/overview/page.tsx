"use client";

import { useLanguage } from "@/lib/language-context";
import { useUser } from "@/lib/user-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Calculator,
  Calendar,
  Clock,
  TrendingUp,
  Trophy,
  Target,
} from "lucide-react";

const weeklyActivity = [
  { day: "Mon", minutes: 75 },
  { day: "Tue", minutes: 90 },
  { day: "Wed", minutes: 105 },
  { day: "Thu", minutes: 45 },
  { day: "Fri", minutes: 105 },
  { day: "Sat", minutes: 45 },
  { day: "Sun", minutes: 0 },
];

const recentActivity = [
  {
    title: "Completed: Basic Fractions Quiz",
    titleEs: "Completado: Quiz de Fracciones Básicas",
    subject: "Math",
    score: "90%",
    date: "Today",
    dateEs: "Hoy",
  },
  {
    title: "Read: The Giving Tree",
    titleEs: "Leyó: El Árbol Generoso",
    subject: "ELA",
    score: null,
    date: "Yesterday",
    dateEs: "Ayer",
  },
  {
    title: "Practice: Adding Fractions",
    titleEs: "Práctica: Suma de Fracciones",
    subject: "Math",
    score: "8/10",
    date: "2 days ago",
    dateEs: "Hace 2 días",
  },
  {
    title: "Vocabulary Quiz",
    titleEs: "Quiz de Vocabulario",
    subject: "ELA",
    score: "95%",
    date: "3 days ago",
    dateEs: "Hace 3 días",
  },
];

export default function ParentOverviewPage() {
  const { t, language } = useLanguage();
  const { studentName } = useUser();

  const maxMinutes = Math.max(...weeklyActivity.map((d) => d.minutes));
  const totalMinutes = weeklyActivity.reduce((sum, d) => sum + d.minutes, 0);
  const avgMinutes = Math.round(totalMinutes / 7);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">{t("parent.overview")}</h1>
        <p className="mt-1 text-muted-foreground">
          {language === "en"
            ? `Detailed progress report for ${studentName}`
            : `Informe detallado de progreso para ${studentName}`}
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalMinutes}</p>
              <p className="text-sm text-muted-foreground">
                {language === "en" ? "Minutes this week" : "Minutos esta semana"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{avgMinutes}</p>
              <p className="text-sm text-muted-foreground">
                {language === "en" ? "Avg. daily minutes" : "Promedio diario"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--calendar-homework)] text-foreground">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">4</p>
              <p className="text-sm text-muted-foreground">
                {language === "en" ? "Achievements earned" : "Logros obtenidos"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">+15%</p>
              <p className="text-sm text-muted-foreground">
                {language === "en" ? "vs. last week" : "vs. semana pasada"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {t("progress.weeklyActivity")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-48">
              {weeklyActivity.map((day) => (
                <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t bg-primary transition-all"
                      style={{
                        height: day.minutes > 0 ? `${(day.minutes / maxMinutes) * 100}%` : "4px",
                        opacity: day.minutes > 0 ? 1 : 0.3,
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                  <span className="text-xs font-medium">{day.minutes}m</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subject Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === "en" ? "Subject Progress" : "Progreso por Materia"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--ela)] text-[var(--ela-foreground)]">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{t("learning.ela")}</span>
                    <span className="text-sm text-muted-foreground">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {language === "en" ? "2 stories read, 45 vocabulary words" : "2 historias leídas, 45 palabras de vocabulario"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--math)] text-[var(--math-foreground)]">
                  <Calculator className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{t("learning.math")}</span>
                    <span className="text-sm text-muted-foreground">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {language === "en" ? "9 lessons completed, 75 problems solved" : "9 lecciones completadas, 75 problemas resueltos"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <h4 className="font-medium mb-2">
                {language === "en" ? "Recommendations" : "Recomendaciones"}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  {language === "en"
                    ? "• Encourage more practice with fractions"
                    : "• Anime a practicar más con fracciones"}
                </li>
                <li>
                  {language === "en"
                    ? "• Great reading progress! Keep it up"
                    : "• ¡Excelente progreso en lectura! Continúa así"}
                </li>
                <li>
                  {language === "en"
                    ? "• Consider 15 more minutes of daily practice"
                    : "• Considere 15 minutos más de práctica diaria"}
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.recentActivity")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-lg border border-border p-4"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    activity.subject === "Math"
                      ? "bg-[var(--math)] text-[var(--math-foreground)]"
                      : "bg-[var(--ela)] text-[var(--ela-foreground)]"
                  }`}
                >
                  {activity.subject === "Math" ? (
                    <Calculator className="h-5 w-5" />
                  ) : (
                    <BookOpen className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {language === "en" ? activity.title : activity.titleEs}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.subject} • {language === "en" ? activity.date : activity.dateEs}
                  </p>
                </div>
                {activity.score && (
                  <div className="shrink-0 rounded-lg bg-accent/20 px-3 py-1 text-sm font-medium text-accent-foreground">
                    {activity.score}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
