"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { useUser } from "@/lib/user-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Calculator,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Target,
  Flame,
} from "lucide-react";

export default function StudentDashboard() {
  const { t } = useLanguage();
  const { studentName, gradeLevel } = useUser();

  const todaySchedule = [
    { time: "9:00 AM", title: "Math Class", type: "class" },
    { time: "11:00 AM", title: "ELA Reading", type: "class" },
    { time: "2:00 PM", title: "Homework: Fractions", type: "homework" },
    { time: "4:00 PM", title: "Soccer Practice", type: "extracurricular" },
  ];

  const recentActivity = [
    { title: "Completed: Basic Fractions", subject: "Math", date: "Today" },
    { title: "Read: The Little Prince", subject: "ELA", date: "Yesterday" },
    { title: "Quiz Score: 90%", subject: "Math", date: "2 days ago" },
  ];

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

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--ela)] text-[var(--ela-foreground)]">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
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
            <div>
              <p className="text-2xl font-bold">75%</p>
              <p className="text-sm text-muted-foreground">{t("progress.mathProgress")}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">{t("progress.lessonsCompleted")}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">4/5</p>
              <p className="text-sm text-muted-foreground">{t("dashboard.weeklyGoal")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Learning Hub Quick Access */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t("dashboard.continueLearning")}</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/student/learning">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* ELA Card */}
              <div className="flex flex-col gap-4 rounded-xl border border-border p-4 sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[var(--ela)] text-[var(--ela-foreground)]">
                  <BookOpen className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{t("learning.ela")}</h3>
                  <p className="text-sm text-muted-foreground">The Little Prince - Chapter 3</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Progress value={45} className="h-2 flex-1" />
                    <span className="text-xs text-muted-foreground">45%</span>
                  </div>
                </div>
                <Button asChild>
                  <Link href="/student/learning/ela/story/1">{t("learning.continue")}</Link>
                </Button>
              </div>

              {/* Math Card */}
              <div className="flex flex-col gap-4 rounded-xl border border-border p-4 sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[var(--math)] text-[var(--math-foreground)]">
                  <Calculator className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{t("learning.math")}</h3>
                  <p className="text-sm text-muted-foreground">Fractions: Adding & Subtracting</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Progress value={60} className="h-2 flex-1" />
                    <span className="text-xs text-muted-foreground">60%</span>
                  </div>
                </div>
                <Button asChild>
                  <Link href="/student/learning/math/lesson/1">{t("learning.continue")}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
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
            <div className="space-y-3">
              {todaySchedule.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                  <div
                    className={`h-2 w-2 rounded-full ${
                      item.type === "class"
                        ? "bg-[var(--calendar-class)]"
                        : item.type === "homework"
                        ? "bg-[var(--calendar-homework)]"
                        : "bg-[var(--calendar-extra)]"
                    }`}
                  />
                </div>
              ))}
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg border border-border p-3"
              >
                <div
                  className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                    activity.subject === "Math" ? "bg-[var(--math)]" : "bg-[var(--ela)]"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.subject} • {activity.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
