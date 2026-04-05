"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { useUser } from "@/lib/user-context";
import { useEvents } from "@/lib/events-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Calculator,
  Calendar,
  Clock,
  ArrowRight,
  Flame,
  Play,
} from "lucide-react";

export default function StudentDashboard() {
  const { t, language } = useLanguage();
  const { studentName, gradeLevel } = useUser();
  const { getTodayEvents } = useEvents();

  const todayEvents = getTodayEvents();

  // Format time from 24h to 12h
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const h = parseInt(hours);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  const getEventColor = (category: string) => {
    switch (category) {
      case "class":
        return "bg-[var(--calendar-class)]";
      case "work":
        return "bg-[var(--calendar-work)]";
      case "homework":
        return "bg-[var(--calendar-homework)]";
      case "extracurricular":
        return "bg-[var(--calendar-extra)]";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            {t("dashboard.welcome")}, {studentName}!
          </h1>
          <p className="mt-1 text-muted-foreground">
            {gradeLevel && t(`grade.${gradeLevel}`)} - {t("dashboard.continueLearning")}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
          <Flame className="h-5 w-5" />
          <span className="font-semibold">7 {t("progress.streak")}</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Continue Learning */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t("dashboard.continueLearning")}</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/student/learning">
                  {language === "en" ? "View All" : "Ver Todo"} <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Adding Numbers Card */}
              <div className="flex flex-col gap-4 rounded-xl border border-border p-4 sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[var(--math)] text-[var(--math-foreground)]">
                  <Calculator className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">
                    {language === "en" ? "Adding Numbers" : "Suma de Números"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" 
                      ? "Master addition with whole numbers and fractions"
                      : "Domina la suma con números enteros y fracciones"}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Progress value={60} className="h-2 flex-1" />
                    <span className="text-xs text-muted-foreground">60%</span>
                  </div>
                </div>
                <Button asChild className="gap-2">
                  <Link href="/student/learning/math/lesson/adding">
                    <Play className="h-4 w-4" />
                    {t("learning.continue")}
                  </Link>
                </Button>
              </div>

              {/* Word Problems Card */}
              <div className="flex flex-col gap-4 rounded-xl border border-border p-4 sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[var(--math)] text-[var(--math-foreground)]">
                  <Calculator className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">
                    {language === "en" ? "Word Problems" : "Problemas de Palabras"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === "en" 
                      ? "Learn to solve real-world math problems"
                      : "Aprende a resolver problemas matemáticos del mundo real"}
                  </p>
                </div>
                <Button asChild variant="outline" className="gap-2">
                  <Link href="/student/learning/math/lesson/word-problems">
                    <Play className="h-4 w-4" />
                    {t("learning.startLesson")}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Plan */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {t("dashboard.todayPlan")}
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/student/calendar">
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {todayEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Clock className="h-12 w-12 text-muted-foreground/30" />
                <p className="mt-4 text-sm text-muted-foreground">
                  {language === "en" ? "No events today" : "Sin eventos hoy"}
                </p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/student/calendar">
                    {language === "en" ? "Add Event" : "Agregar Evento"}
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {todayEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{formatTime(event.time)}</p>
                    </div>
                    <div className={`h-2 w-2 rounded-full ${getEventColor(event.category)}`} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
