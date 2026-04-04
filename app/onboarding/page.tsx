"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { useUser } from "@/lib/user-context";
import { LanguageSelector } from "@/components/language-selector";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GraduationCap,
  User,
  Users,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "role" | "grade" | "name";

const gradeOptions = [
  { value: "3rd", category: "elementary" },
  { value: "5th", category: "elementary" },
  { value: "8th", category: "elementary" },
  { value: "middle", category: "middle" },
  { value: "high", category: "high" },
  { value: "college", category: "college" },
] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { setRole, setGradeLevel, setStudentName, completeOnboarding, studentName } = useUser();
  
  const [step, setStep] = useState<Step>("role");
  const [selectedRole, setSelectedRole] = useState<"student" | "parent" | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<typeof gradeOptions[number]["value"] | null>(null);
  const [name, setName] = useState(studentName || "");

  const handleRoleSelect = (role: "student" | "parent") => {
    setSelectedRole(role);
  };

  const handleGradeSelect = (grade: typeof gradeOptions[number]["value"]) => {
    setSelectedGrade(grade);
  };

  const handleNext = () => {
    if (step === "role" && selectedRole) {
      if (selectedRole === "parent") {
        setRole("parent");
        completeOnboarding();
        router.push("/parent");
      } else {
        setStep("grade");
      }
    } else if (step === "grade" && selectedGrade) {
      setStep("name");
    } else if (step === "name" && name.trim()) {
      setRole("student");
      setGradeLevel(selectedGrade);
      setStudentName(name.trim());
      completeOnboarding();
      router.push("/student");
    }
  };

  const handleBack = () => {
    if (step === "grade") {
      setStep("role");
    } else if (step === "name") {
      setStep("grade");
    }
  };

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

      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 pt-16">
        {/* Progress indicators */}
        <div className="mb-8 flex items-center gap-2">
          {["role", "grade", "name"].map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  step === s
                    ? "bg-primary text-primary-foreground"
                    : (step === "grade" && i === 0) || (step === "name" && i <= 1)
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {(step === "grade" && i === 0) || (step === "name" && i <= 1) ? (
                  <Check className="h-4 w-4" />
                ) : (
                  i + 1
                )}
              </div>
              {i < 2 && (
                <div
                  className={cn(
                    "mx-2 h-0.5 w-8 transition-colors",
                    (step === "grade" && i === 0) || (step === "name" && i <= 1)
                      ? "bg-primary"
                      : "bg-muted"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Role Selection */}
        {step === "role" && (
          <div className="w-full space-y-6 text-center">
            <div>
              <h1 className="text-3xl font-bold">{t("role.title")}</h1>
              <p className="mt-2 text-muted-foreground">{t("role.subtitle")}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  selectedRole === "student"
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border"
                )}
                onClick={() => handleRoleSelect("student")}
              >
                <CardContent className="flex flex-col items-center p-6">
                  <div
                    className={cn(
                      "mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors",
                      selectedRole === "student"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <User className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold">{t("role.student")}</h3>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    {t("role.studentDesc")}
                  </p>
                </CardContent>
              </Card>

              <Card
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  selectedRole === "parent"
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border"
                )}
                onClick={() => handleRoleSelect("parent")}
              >
                <CardContent className="flex flex-col items-center p-6">
                  <div
                    className={cn(
                      "mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors",
                      selectedRole === "parent"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold">{t("role.parent")}</h3>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    {t("role.parentDesc")}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Button
              size="lg"
              className="w-full gap-2 sm:w-auto"
              disabled={!selectedRole}
              onClick={handleNext}
            >
              {t("grade.continue")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Grade Selection */}
        {step === "grade" && (
          <div className="w-full space-y-6 text-center">
            <div>
              <h1 className="text-3xl font-bold">{t("grade.title")}</h1>
              <p className="mt-2 text-muted-foreground">{t("grade.subtitle")}</p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  {t("grade.elementary")}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {gradeOptions
                    .filter((g) => g.category === "elementary")
                    .map((grade) => (
                      <Button
                        key={grade.value}
                        variant={selectedGrade === grade.value ? "default" : "outline"}
                        className="h-12"
                        onClick={() => handleGradeSelect(grade.value)}
                      >
                        {t(`grade.${grade.value}`)}
                      </Button>
                    ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {gradeOptions
                  .filter((g) => g.category !== "elementary")
                  .map((grade) => (
                    <Button
                      key={grade.value}
                      variant={selectedGrade === grade.value ? "default" : "outline"}
                      className="h-12"
                      onClick={() => handleGradeSelect(grade.value)}
                    >
                      {t(`grade.${grade.value}`)}
                    </Button>
                  ))}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="outline" size="lg" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("common.previous")}
              </Button>
              <Button size="lg" disabled={!selectedGrade} onClick={handleNext}>
                {t("common.next")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Name Input */}
        {step === "name" && (
          <div className="w-full space-y-6 text-center">
            <div>
              <h1 className="text-3xl font-bold">
                {t("name.title")}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {t("name.subtitle")}
              </p>
            </div>

            <div className="mx-auto max-w-sm">
              <Label htmlFor="name" className="sr-only">
                Your name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 text-center text-lg"
                autoFocus
              />
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="outline" size="lg" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("common.previous")}
              </Button>
              <Button size="lg" disabled={!name.trim()} onClick={handleNext}>
                {t("landing.getStarted")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
