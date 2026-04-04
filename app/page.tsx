"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { useUser } from "@/lib/user-context";
import { LanguageSelector } from "@/components/language-selector";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  BookOpen,
  Globe,
  Users,
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

export default function LandingPage() {
  const { t } = useLanguage();
  const { isOnboarded, role } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isOnboarded && role) {
      router.push(role === "student" ? "/student" : "/parent");
    }
  }, [isOnboarded, role, router]);

  const features = [
    {
      icon: Sparkles,
      titleKey: "landing.feature1.title",
      descKey: "landing.feature1.desc",
    },
    {
      icon: Globe,
      titleKey: "landing.feature2.title",
      descKey: "landing.feature2.desc",
    },
    {
      icon: Users,
      titleKey: "landing.feature3.title",
      descKey: "landing.feature3.desc",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">EduPath</span>
          </div>
          <LanguageSelector />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <BookOpen className="h-4 w-4" />
              <span>Bilingual Learning Platform</span>
            </div>

            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t("landing.title")}
            </h1>

            <p className="mt-6 text-pretty text-lg text-muted-foreground sm:text-xl">
              {t("landing.subtitle")}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="w-full gap-2 sm:w-auto"
                onClick={() => router.push("/onboarding")}
              >
                {t("landing.getStarted")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border bg-muted/30 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to succeed
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our platform provides comprehensive tools for students and parents alike.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.titleKey}
                className="group relative overflow-hidden border-border/50 bg-card transition-shadow hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{t(feature.titleKey)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t(feature.descKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Two paths, one goal: Academic excellence
              </h2>
              <p className="mt-4 text-muted-foreground">
                Whether you&apos;re a student ready to learn or a parent wanting to support,
                we have the tools you need.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--math)] text-[var(--math-foreground)]">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">For Students</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Interactive lessons in ELA and Math, progress tracking, and time management tools.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">For Parents</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Monitor progress, receive guidance tips, and stay informed with notifications.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 p-8">
                <div className="flex h-full flex-col items-center justify-center gap-6 rounded-2xl bg-card p-8 shadow-xl">
                  <GraduationCap className="h-20 w-20 text-primary" />
                  <div className="text-center">
                    <p className="text-2xl font-bold">Ready to start?</p>
                    <p className="mt-2 text-muted-foreground">Join thousands of learners today</p>
                  </div>
                  <Button
                    size="lg"
                    className="gap-2"
                    onClick={() => router.push("/onboarding")}
                  >
                    {t("landing.getStarted")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-semibold">EduPath</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; 2026 EduPath. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
