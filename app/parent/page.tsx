"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { useUser } from "@/lib/user-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Calculator,
  Bell,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  User,
  Calendar,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function ParentDashboard() {
  const { t, language } = useLanguage();
  const { studentName } = useUser();

  const notifications = [
    {
      type: "warning",
      title: language === "en" ? "Low progress in Math" : "Bajo progreso en Matemáticas",
      description: language === "en" ? "Alex hasn't completed any math lessons this week" : "Alex no ha completado ninguna lección de matemáticas esta semana",
      time: "2h",
    },
    {
      type: "info",
      title: language === "en" ? "Story completed" : "Historia completada",
      description: language === "en" ? "Alex finished reading \"The Giving Tree\"" : "Alex terminó de leer \"El Árbol Generoso\"",
      time: "1d",
    },
    {
      type: "success",
      title: language === "en" ? "Quiz passed!" : "¡Quiz aprobado!",
      description: language === "en" ? "Scored 90% on fractions quiz" : "Obtuvo 90% en el quiz de fracciones",
      time: "2d",
    },
  ];

  const tips = [
    { icon: BookOpen, text: t("parent.tip1") },
    { icon: CheckCircle2, text: t("parent.tip2") },
    { icon: Calendar, text: t("parent.tip3") },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            {t("dashboard.welcome")}!
          </h1>
          <p className="mt-1 text-muted-foreground">
            {language === "en"
              ? `Monitoring ${studentName}'s learning progress`
              : `Monitoreando el progreso de aprendizaje de ${studentName}`}
          </p>
        </div>
        <Button asChild>
          <Link href="/parent/overview">
            {t("parent.overview")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Student Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <User className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-bold">{studentName}</p>
              <p className="text-sm text-muted-foreground">5th Grade</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--ela)] text-[var(--ela-foreground)]">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">68%</p>
                <TrendingUp className="h-4 w-4 text-accent" />
              </div>
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
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">45%</p>
                <TrendingDown className="h-4 w-4 text-destructive" />
              </div>
              <p className="text-sm text-muted-foreground">{t("progress.mathProgress")}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">7</p>
              <p className="text-sm text-muted-foreground">{t("progress.streak")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Progress Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("parent.overview")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* ELA Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-[var(--ela)]" />
                    <span className="font-medium">{t("learning.ela")}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">68%</span>
                </div>
                <Progress value={68} className="h-3" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-accent">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{language === "en" ? "Stories: 2/4 completed" : "Historias: 2/4 completadas"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>{language === "en" ? "Vocabulary: 45 words learned" : "Vocabulario: 45 palabras aprendidas"}</span>
                  </div>
                </div>
              </div>

              {/* Math Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-[var(--math)]" />
                    <span className="font-medium">{t("learning.math")}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <Progress value={45} className="h-3" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <span>{language === "en" ? "Needs attention" : "Necesita atención"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>{language === "en" ? "Lessons: 9/28 completed" : "Lecciones: 9/28 completadas"}</span>
                  </div>
                </div>
              </div>

              {/* Strengths and Areas to Improve */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-accent/30 bg-accent/10 p-4">
                  <h4 className="mb-2 font-medium text-accent-foreground">{t("parent.strengths")}</h4>
                  <ul className="space-y-1 text-sm">
                    <li>{language === "en" ? "Reading comprehension" : "Comprensión lectora"}</li>
                    <li>{language === "en" ? "Vocabulary retention" : "Retención de vocabulario"}</li>
                    <li>{language === "en" ? "Consistent study habits" : "Hábitos de estudio consistentes"}</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
                  <h4 className="mb-2 font-medium">{t("parent.areasToImprove")}</h4>
                  <ul className="space-y-1 text-sm">
                    <li>{language === "en" ? "Fraction operations" : "Operaciones con fracciones"}</li>
                    <li>{language === "en" ? "Word problems" : "Problemas de palabras"}</li>
                    <li>{language === "en" ? "Time management" : "Gestión del tiempo"}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guidance Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                {t("parent.guidance")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                {tips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg border border-border p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <tip.icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm">{tip.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              {t("parent.notifications")}
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/parent/notifications">
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className={`flex gap-3 rounded-lg border p-3 ${
                    notification.type === "warning"
                      ? "border-destructive/30 bg-destructive/5"
                      : notification.type === "success"
                      ? "border-accent/30 bg-accent/5"
                      : "border-border"
                  }`}
                >
                  <div
                    className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                      notification.type === "warning"
                        ? "bg-destructive"
                        : notification.type === "success"
                        ? "bg-accent"
                        : "bg-primary"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium">{notification.title}</p>
                      <span className="shrink-0 text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{notification.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
