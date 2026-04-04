"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Calculator,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonData {
  id: string;
  title: string;
  titleEs: string;
  sections: {
    type: "explanation" | "example" | "practice";
    title: string;
    titleEs: string;
    content?: string;
    contentEs?: string;
    example?: {
      problem: string;
      steps: { step: string; stepEs: string }[];
      answer: string;
    };
    practice?: {
      problem: string;
      problemEs: string;
      answer: string;
      hint: string;
      hintEs: string;
    };
  }[];
}

const lessonData: Record<string, LessonData> = {
  "1": {
    id: "1",
    title: "Adding & Subtracting Fractions",
    titleEs: "Suma y Resta de Fracciones",
    sections: [
      {
        type: "explanation",
        title: "Understanding Fractions",
        titleEs: "Entendiendo las Fracciones",
        content: `A fraction represents a part of a whole. It has two parts:
        
• **Numerator** (top number): How many parts we have
• **Denominator** (bottom number): Total number of equal parts

For example, in the fraction 3/4:
- The numerator is 3 (we have 3 parts)
- The denominator is 4 (the whole is divided into 4 equal parts)

To add or subtract fractions, we need them to have the **same denominator** (called a common denominator).`,
        contentEs: `Una fracción representa una parte de un todo. Tiene dos partes:
        
• **Numerador** (número de arriba): Cuántas partes tenemos
• **Denominador** (número de abajo): Número total de partes iguales

Por ejemplo, en la fracción 3/4:
- El numerador es 3 (tenemos 3 partes)
- El denominador es 4 (el todo está dividido en 4 partes iguales)

Para sumar o restar fracciones, necesitamos que tengan el **mismo denominador** (llamado denominador común).`,
      },
      {
        type: "example",
        title: "Example: Adding Fractions",
        titleEs: "Ejemplo: Sumar Fracciones",
        example: {
          problem: "1/4 + 2/4 = ?",
          steps: [
            { step: "Check if denominators are the same: 4 = 4 ✓", stepEs: "Verificar si los denominadores son iguales: 4 = 4 ✓" },
            { step: "Add the numerators: 1 + 2 = 3", stepEs: "Sumar los numeradores: 1 + 2 = 3" },
            { step: "Keep the same denominator: 4", stepEs: "Mantener el mismo denominador: 4" },
            { step: "Write the answer: 3/4", stepEs: "Escribir la respuesta: 3/4" },
          ],
          answer: "3/4",
        },
      },
      {
        type: "practice",
        title: "Practice Problem 1",
        titleEs: "Problema de Práctica 1",
        practice: {
          problem: "2/5 + 1/5 = ?",
          problemEs: "2/5 + 1/5 = ?",
          answer: "3/5",
          hint: "The denominators are already the same! Just add the numerators.",
          hintEs: "¡Los denominadores ya son iguales! Solo suma los numeradores.",
        },
      },
      {
        type: "explanation",
        title: "Finding Common Denominators",
        titleEs: "Encontrar Denominadores Comunes",
        content: `When fractions have different denominators, we need to find a **common denominator** before adding or subtracting.

Steps to find a common denominator:
1. Find the **Least Common Multiple (LCM)** of both denominators
2. Convert each fraction to have this common denominator
3. Now you can add or subtract!

For example, to add 1/3 + 1/4:
- LCM of 3 and 4 is 12
- 1/3 = 4/12 (multiply both by 4)
- 1/4 = 3/12 (multiply both by 3)
- 4/12 + 3/12 = 7/12`,
        contentEs: `Cuando las fracciones tienen denominadores diferentes, necesitamos encontrar un **denominador común** antes de sumar o restar.

Pasos para encontrar un denominador común:
1. Encontrar el **Mínimo Común Múltiplo (MCM)** de ambos denominadores
2. Convertir cada fracción para que tenga este denominador común
3. ¡Ahora puedes sumar o restar!

Por ejemplo, para sumar 1/3 + 1/4:
- MCM de 3 y 4 es 12
- 1/3 = 4/12 (multiplicar ambos por 4)
- 1/4 = 3/12 (multiplicar ambos por 3)
- 4/12 + 3/12 = 7/12`,
      },
      {
        type: "example",
        title: "Example: Different Denominators",
        titleEs: "Ejemplo: Denominadores Diferentes",
        example: {
          problem: "1/2 + 1/3 = ?",
          steps: [
            { step: "Denominators are different: 2 ≠ 3", stepEs: "Los denominadores son diferentes: 2 ≠ 3" },
            { step: "Find LCM of 2 and 3: LCM = 6", stepEs: "Encontrar MCM de 2 y 3: MCM = 6" },
            { step: "Convert 1/2: 1/2 × 3/3 = 3/6", stepEs: "Convertir 1/2: 1/2 × 3/3 = 3/6" },
            { step: "Convert 1/3: 1/3 × 2/2 = 2/6", stepEs: "Convertir 1/3: 1/3 × 2/2 = 2/6" },
            { step: "Add: 3/6 + 2/6 = 5/6", stepEs: "Sumar: 3/6 + 2/6 = 5/6" },
          ],
          answer: "5/6",
        },
      },
      {
        type: "practice",
        title: "Practice Problem 2",
        titleEs: "Problema de Práctica 2",
        practice: {
          problem: "1/4 + 1/2 = ?",
          problemEs: "1/4 + 1/2 = ?",
          answer: "3/4",
          hint: "Convert 1/2 to fourths first. What is 1/2 as fourths?",
          hintEs: "Primero convierte 1/2 a cuartos. ¿Cuánto es 1/2 en cuartos?",
        },
      },
      {
        type: "practice",
        title: "Practice Problem 3",
        titleEs: "Problema de Práctica 3",
        practice: {
          problem: "3/4 - 1/4 = ?",
          problemEs: "3/4 - 1/4 = ?",
          answer: "2/4",
          hint: "Same denominators - just subtract the numerators!",
          hintEs: "¡Mismos denominadores - solo resta los numeradores!",
        },
      },
    ],
  },
};

const defaultLesson: LessonData = {
  id: "default",
  title: "Lesson Coming Soon",
  titleEs: "Lección Próximamente",
  sections: [
    {
      type: "explanation",
      title: "Coming Soon",
      titleEs: "Próximamente",
      content: "This lesson is being prepared. Please check back later!",
      contentEs: "Esta lección está siendo preparada. ¡Por favor, vuelve más tarde!",
    },
  ],
};

export default function MathLessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t, language } = useLanguage();
  const [currentSection, setCurrentSection] = useState(0);
  const [showSteps, setShowSteps] = useState(false);
  const [practiceAnswer, setPracticeAnswer] = useState("");
  const [practiceResult, setPracticeResult] = useState<"correct" | "incorrect" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());

  const lesson = lessonData[id] || defaultLesson;
  const section = lesson.sections[currentSection];
  const progress = (completedSections.size / lesson.sections.length) * 100;

  const handleCheckAnswer = () => {
    if (!section.practice) return;
    
    const normalizedAnswer = practiceAnswer.trim().toLowerCase().replace(/\s/g, "");
    const normalizedCorrect = section.practice.answer.toLowerCase().replace(/\s/g, "");
    
    if (normalizedAnswer === normalizedCorrect) {
      setPracticeResult("correct");
      setCompletedSections(new Set([...completedSections, currentSection]));
    } else {
      setPracticeResult("incorrect");
    }
  };

  const handleNextSection = () => {
    if (section.type !== "practice") {
      setCompletedSections(new Set([...completedSections, currentSection]));
    }
    if (currentSection < lesson.sections.length - 1) {
      setCurrentSection(currentSection + 1);
      setPracticeAnswer("");
      setPracticeResult(null);
      setShowHint(false);
      setShowSteps(false);
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setPracticeAnswer("");
      setPracticeResult(null);
      setShowHint(false);
      setShowSteps(false);
    }
  };

  const handleReset = () => {
    setPracticeAnswer("");
    setPracticeResult(null);
    setShowHint(false);
  };

  const renderContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      // Handle bold text
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={index} className={cn("leading-relaxed", line.startsWith("•") && "ml-4")}>
          {parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={i}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/student/learning">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to Learning Hub</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">
              {language === "en" ? lesson.title : lesson.titleEs}
            </h1>
            <p className="text-sm text-muted-foreground">
              {language === "en" ? section.title : section.titleEs}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Progress value={progress} className="h-2 w-24" />
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Badge
            variant="secondary"
            className={cn(
              section.type === "explanation" && "bg-primary/20 text-primary",
              section.type === "example" && "bg-accent/20 text-accent-foreground",
              section.type === "practice" && "bg-[var(--math)]/20 text-[var(--math)]"
            )}
          >
            {section.type === "explanation"
              ? language === "en"
                ? "Explanation"
                : "Explicación"
              : section.type === "example"
              ? language === "en"
                ? "Example"
                : "Ejemplo"
              : language === "en"
              ? "Practice"
              : "Práctica"}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {section.type === "explanation" && <Lightbulb className="h-5 w-5 text-primary" />}
            {section.type === "example" && <Calculator className="h-5 w-5 text-accent" />}
            {section.type === "practice" && <Calculator className="h-5 w-5 text-[var(--math)]" />}
            {language === "en" ? section.title : section.titleEs}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Explanation Section */}
          {section.type === "explanation" && section.content && (
            <div className="prose prose-sm max-w-none space-y-2">
              {renderContent(language === "en" ? section.content : section.contentEs || section.content)}
            </div>
          )}

          {/* Example Section */}
          {section.type === "example" && section.example && (
            <div className="space-y-6">
              <div className="rounded-xl bg-muted/50 p-6 text-center">
                <p className="text-2xl font-bold text-[var(--math)]">{section.example.problem}</p>
              </div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => setShowSteps(!showSteps)}
                >
                  {showSteps ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {showSteps
                    ? language === "en"
                      ? "Hide Solution Steps"
                      : "Ocultar Pasos de Solución"
                    : t("math.showSolution")}
                </Button>

                {showSteps && (
                  <div className="space-y-2 rounded-lg border border-border bg-card p-4">
                    {section.example.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                          {index + 1}
                        </div>
                        <p className="text-sm">{language === "en" ? step.step : step.stepEs}</p>
                      </div>
                    ))}
                    <div className="mt-4 rounded-lg bg-accent/20 p-3 text-center">
                      <p className="font-semibold">
                        {language === "en" ? "Answer:" : "Respuesta:"} {section.example.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Practice Section */}
          {section.type === "practice" && section.practice && (
            <div className="space-y-6">
              <div className="rounded-xl bg-[var(--math)]/10 p-6 text-center">
                <p className="text-2xl font-bold">
                  {language === "en" ? section.practice.problem : section.practice.problemEs}
                </p>
              </div>

              <div className="mx-auto max-w-sm space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder={language === "en" ? "Your answer..." : "Tu respuesta..."}
                    value={practiceAnswer}
                    onChange={(e) => setPracticeAnswer(e.target.value)}
                    disabled={practiceResult === "correct"}
                    className={cn(
                      "text-center text-lg",
                      practiceResult === "correct" && "border-accent bg-accent/10",
                      practiceResult === "incorrect" && "border-destructive bg-destructive/10"
                    )}
                    onKeyDown={(e) => e.key === "Enter" && handleCheckAnswer()}
                  />
                  {practiceResult && (
                    <Button variant="outline" size="icon" onClick={handleReset}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {practiceResult === "correct" && (
                  <div className="flex items-center justify-center gap-2 rounded-lg bg-accent/20 p-3 text-accent-foreground">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">{t("math.correct")}</span>
                  </div>
                )}

                {practiceResult === "incorrect" && (
                  <div className="flex items-center justify-center gap-2 rounded-lg bg-destructive/20 p-3 text-destructive">
                    <XCircle className="h-5 w-5" />
                    <span className="font-medium">{t("math.tryAgain")}</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={() => setShowHint(!showHint)}
                  >
                    <Lightbulb className="h-4 w-4" />
                    {showHint
                      ? language === "en"
                        ? "Hide Hint"
                        : "Ocultar Pista"
                      : language === "en"
                      ? "Show Hint"
                      : "Mostrar Pista"}
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleCheckAnswer}
                    disabled={!practiceAnswer.trim() || practiceResult === "correct"}
                  >
                    {t("math.checkAnswer")}
                  </Button>
                </div>

                {showHint && (
                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                    <p className="text-sm text-muted-foreground">
                      <Lightbulb className="mb-1 mr-2 inline-block h-4 w-4 text-primary" />
                      {language === "en" ? section.practice.hint : section.practice.hintEs}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" disabled={currentSection === 0} onClick={handlePrevSection}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          {t("common.previous")}
        </Button>

        <div className="flex items-center gap-2">
          {lesson.sections.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSection(index);
                setPracticeAnswer("");
                setPracticeResult(null);
                setShowHint(false);
                setShowSteps(false);
              }}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                index === currentSection
                  ? "bg-primary"
                  : completedSections.has(index)
                  ? "bg-accent"
                  : "bg-muted"
              )}
            />
          ))}
        </div>

        {currentSection < lesson.sections.length - 1 ? (
          <Button onClick={handleNextSection}>
            {t("common.next")}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button asChild>
            <Link href="/student/learning">
              {language === "en" ? "Finish Lesson" : "Terminar Lección"}
              <CheckCircle2 className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
