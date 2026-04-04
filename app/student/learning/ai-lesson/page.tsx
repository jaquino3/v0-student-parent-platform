"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { useUser } from "@/lib/user-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { 
  BookOpen, 
  Calculator, 
  Sparkles, 
  ChevronRight,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowLeft,
  GraduationCap
} from "lucide-react";
import Link from "next/link";
import type { GeneratedLesson } from "@/app/api/generate-lesson/route";

export default function AILessonPage() {
  const { t, language } = useLanguage();
  const { user } = useUser();
  
  const [subject, setSubject] = useState<"ELA" | "Math">("ELA");
  const [topic, setTopic] = useState("");
  const [studentLevel, setStudentLevel] = useState<"beginner" | "intermediate" | "advanced">("intermediate");
  const [recentPerformance, setRecentPerformance] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [lesson, setLesson] = useState<GeneratedLesson | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  const gradeLevel = user?.grade || "5th Grade";

  const translations = {
    en: {
      title: "AI-Powered Lesson Generator",
      subtitle: "Get personalized lessons tailored to your learning needs",
      back: "Back to Learning Hub",
      subject: "Subject",
      ela: "English Language Arts",
      math: "Mathematics",
      topic: "What do you want to learn?",
      topicPlaceholder: "e.g., Reading comprehension, Fractions, Poetry...",
      level: "Your Level",
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      performance: "How have you been doing lately?",
      performancePlaceholder: "e.g., I'm good at vocabulary but struggle with long passages...",
      generate: "Generate My Lesson",
      generating: "Creating your personalized lesson...",
      lessonContent: "Lesson Content",
      english: "English",
      spanish: "Spanish",
      examples: "Worked Examples",
      practice: "Practice Questions",
      vocabulary: "Vocabulary",
      progressAdvice: "Tips for You",
      nextSteps: "What's Next",
      checkAnswer: "Check Answer",
      correct: "Correct!",
      incorrect: "Try again!",
      newLesson: "Generate New Lesson",
    },
    es: {
      title: "Generador de Lecciones con IA",
      subtitle: "Obtén lecciones personalizadas adaptadas a tus necesidades",
      back: "Volver al Centro de Aprendizaje",
      subject: "Materia",
      ela: "Artes del Lenguaje",
      math: "Matemáticas",
      topic: "¿Qué quieres aprender?",
      topicPlaceholder: "ej., Comprensión lectora, Fracciones, Poesía...",
      level: "Tu Nivel",
      beginner: "Principiante",
      intermediate: "Intermedio",
      advanced: "Avanzado",
      performance: "¿Cómo te ha ido últimamente?",
      performancePlaceholder: "ej., Soy bueno en vocabulario pero me cuesta con textos largos...",
      generate: "Generar Mi Lección",
      generating: "Creando tu lección personalizada...",
      lessonContent: "Contenido de la Lección",
      english: "Inglés",
      spanish: "Español",
      examples: "Ejemplos Resueltos",
      practice: "Preguntas de Práctica",
      vocabulary: "Vocabulario",
      progressAdvice: "Consejos Para Ti",
      nextSteps: "Próximos Pasos",
      checkAnswer: "Verificar Respuesta",
      correct: "¡Correcto!",
      incorrect: "¡Inténtalo de nuevo!",
      newLesson: "Generar Nueva Lección",
    },
  };

  const text = translations[language];

  const generateLesson = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    setLesson(null);
    setSelectedAnswers({});
    setShowResults({});

    try {
      const response = await fetch("/api/generate-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grade_level: gradeLevel,
          subject,
          language_preference: language === "en" ? "bilingual" : "bilingual",
          student_level: studentLevel,
          recent_performance: recentPerformance || "No specific information provided",
          topic,
        }),
      });

      const data = await response.json();
      if (data.lesson) {
        setLesson(data.lesson);
      }
    } catch (error) {
      console.error("Error generating lesson:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const checkAnswer = (questionIndex: number) => {
    setShowResults((prev) => ({ ...prev, [questionIndex]: true }));
  };

  const isCorrect = (questionIndex: number) => {
    if (!lesson) return false;
    const question = lesson.practice_questions[questionIndex];
    return selectedAnswers[questionIndex] === question.answer;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/student/learning">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {text.back}
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{text.title}</h1>
          <p className="text-muted-foreground">{text.subtitle}</p>
        </div>
      </div>

      {!lesson ? (
        /* Generator Form */
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              {gradeLevel}
            </CardTitle>
            <CardDescription>
              {language === "en" 
                ? "Tell us what you want to learn and we'll create a custom lesson just for you!"
                : "¡Dinos qué quieres aprender y crearemos una lección personalizada solo para ti!"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Subject Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{text.subject}</label>
              <div className="flex gap-3">
                <Button
                  variant={subject === "ELA" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setSubject("ELA")}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  {text.ela}
                </Button>
                <Button
                  variant={subject === "Math" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setSubject("Math")}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  {text.math}
                </Button>
              </div>
            </div>

            {/* Topic */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{text.topic}</label>
              <Textarea
                placeholder={text.topicPlaceholder}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={2}
              />
            </div>

            {/* Level */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{text.level}</label>
              <Select value={studentLevel} onValueChange={(v) => setStudentLevel(v as typeof studentLevel)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">{text.beginner}</SelectItem>
                  <SelectItem value="intermediate">{text.intermediate}</SelectItem>
                  <SelectItem value="advanced">{text.advanced}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Recent Performance */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{text.performance}</label>
              <Textarea
                placeholder={text.performancePlaceholder}
                value={recentPerformance}
                onChange={(e) => setRecentPerformance(e.target.value)}
                rows={2}
              />
            </div>

            <Button 
              className="w-full" 
              size="lg"
              onClick={generateLesson}
              disabled={isGenerating || !topic.trim()}
            >
              {isGenerating ? (
                <>
                  <Spinner className="mr-2" />
                  {text.generating}
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  {text.generate}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* Generated Lesson Display */
        <div className="space-y-6">
          {/* Lesson Header */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{lesson.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {lesson.grade_level} • {lesson.subject}
                  </CardDescription>
                </div>
                <Badge variant={
                  lesson.difficulty === "easy" ? "secondary" :
                  lesson.difficulty === "medium" ? "default" : "destructive"
                }>
                  {lesson.difficulty}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Lesson Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {text.lessonContent}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="rounded-lg border bg-card p-4">
                  <Badge variant="outline" className="mb-2">{text.english}</Badge>
                  <p className="text-foreground whitespace-pre-wrap">{lesson.lesson_content.english}</p>
                </div>
                <div className="rounded-lg border bg-card p-4">
                  <Badge variant="outline" className="mb-2">{text.spanish}</Badge>
                  <p className="text-foreground whitespace-pre-wrap">{lesson.lesson_content.spanish}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Examples */}
          {lesson.examples.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  {text.examples}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lesson.examples.map((example, index) => (
                  <div key={index} className="rounded-lg border p-4 space-y-2">
                    <p className="font-medium">{example.question}</p>
                    <div className="rounded-md bg-muted p-3">
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {example.solution}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Vocabulary */}
          {lesson.vocabulary.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{text.vocabulary}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {lesson.vocabulary.map((vocab, index) => (
                    <div key={index} className="rounded-lg border p-3">
                      <p className="font-semibold text-primary">{vocab.word}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        <span className="font-medium">EN:</span> {vocab.definition_en}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">ES:</span> {vocab.definition_es}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Practice Questions */}
          {lesson.practice_questions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{text.practice}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {lesson.practice_questions.map((question, qIndex) => (
                  <div key={qIndex} className="rounded-lg border p-4 space-y-3">
                    <p className="font-medium">{qIndex + 1}. {question.question}</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {question.options.map((option, oIndex) => {
                        const optionLetter = String.fromCharCode(65 + oIndex);
                        const isSelected = selectedAnswers[qIndex] === optionLetter;
                        const showResult = showResults[qIndex];
                        const correct = isCorrect(qIndex);
                        
                        return (
                          <Button
                            key={oIndex}
                            variant={isSelected ? "default" : "outline"}
                            className={`justify-start h-auto py-3 px-4 ${
                              showResult && isSelected
                                ? correct
                                  ? "bg-green-500 hover:bg-green-500 text-white"
                                  : "bg-red-500 hover:bg-red-500 text-white"
                                : ""
                            }`}
                            onClick={() => !showResult && handleAnswerSelect(qIndex, optionLetter)}
                            disabled={showResult}
                          >
                            <span className="font-semibold mr-2">{optionLetter}.</span>
                            {option}
                          </Button>
                        );
                      })}
                    </div>
                    
                    {selectedAnswers[qIndex] && !showResults[qIndex] && (
                      <Button onClick={() => checkAnswer(qIndex)} size="sm">
                        {text.checkAnswer}
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    )}
                    
                    {showResults[qIndex] && (
                      <div className={`flex items-center gap-2 p-3 rounded-md ${
                        isCorrect(qIndex) ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                      }`}>
                        {isCorrect(qIndex) ? (
                          <>
                            <CheckCircle2 className="h-5 w-5" />
                            <span className="font-medium">{text.correct}</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-5 w-5" />
                            <span className="font-medium">{text.incorrect}</span>
                            <span className="text-sm ml-2">
                              {language === "en" ? "Correct answer:" : "Respuesta correcta:"} {question.answer}
                            </span>
                          </>
                        )}
                      </div>
                    )}

                    {showResults[qIndex] && question.explanation && (
                      <div className="bg-muted p-3 rounded-md">
                        <p className="text-sm text-muted-foreground">{question.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Progress Advice & Next Steps */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-base">{text.progressAdvice}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{lesson.progress_advice}</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-base">{text.nextSteps}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{lesson.next_recommendation}</p>
              </CardContent>
            </Card>
          </div>

          {/* Generate New Lesson */}
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setLesson(null)}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {text.newLesson}
          </Button>
        </div>
      )}
    </div>
  );
}
