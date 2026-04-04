"use client";

import { useState, use } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Volume2,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "english" | "spanish" | "sideBySide";

interface StoryData {
  id: string;
  title: string;
  titleEs: string;
  chapters: {
    title: string;
    titleEs: string;
    paragraphs: { en: string; es: string }[];
  }[];
  vocabulary: { word: string; translation: string; definition: string }[];
  questions: {
    question: string;
    questionEs: string;
    options: { en: string; es: string }[];
    correctIndex: number;
  }[];
}

const storyData: Record<string, StoryData> = {
  "1": {
    id: "1",
    title: "The Little Prince",
    titleEs: "El Principito",
    chapters: [
      {
        title: "Chapter 1: The Drawing",
        titleEs: "Capítulo 1: El Dibujo",
        paragraphs: [
          {
            en: "Once when I was six years old I saw a magnificent picture in a book, called True Stories from Nature, about the primeval forest. It was a picture of a boa constrictor in the act of swallowing an animal.",
            es: "Cuando tenía seis años vi en un libro sobre la selva virgen, llamado Historias Verdaderas de la Naturaleza, una magnífica imagen. Era una imagen de una boa constrictora tragándose a un animal.",
          },
          {
            en: "In the book it said: \"Boa constrictors swallow their prey whole, without chewing it. After that they are not able to move, and they sleep through the six months that they need for digestion.\"",
            es: "En el libro decía: \"Las boas constrictoras tragan a sus presas enteras, sin masticarlas. Después de eso no pueden moverse, y duermen durante los seis meses que necesitan para la digestión.\"",
          },
          {
            en: "I pondered deeply, then, over the adventures of the jungle. And after some work with a colored pencil I succeeded in making my first drawing. My Drawing Number One.",
            es: "Reflexioné mucho entonces sobre las aventuras de la selva. Y después de trabajar con un lápiz de colores logré hacer mi primer dibujo. Mi Dibujo Número Uno.",
          },
          {
            en: "I showed my masterpiece to the grown-ups, and asked them whether the drawing frightened them. But they answered: \"Why should anyone be frightened by a hat?\"",
            es: "Mostré mi obra maestra a los adultos y les pregunté si el dibujo les daba miedo. Pero ellos respondieron: \"¿Por qué debería alguien tener miedo de un sombrero?\"",
          },
        ],
      },
      {
        title: "Chapter 2: The Desert",
        titleEs: "Capítulo 2: El Desierto",
        paragraphs: [
          {
            en: "So I lived my life alone, without anyone that I could really talk to, until I had an accident with my plane in the Desert of Sahara, six years ago.",
            es: "Así que viví mi vida solo, sin nadie con quien pudiera hablar realmente, hasta que tuve un accidente con mi avión en el Desierto del Sahara, hace seis años.",
          },
          {
            en: "Something was broken in my engine. And as I had with me neither a mechanic nor any passengers, I set myself to attempt the difficult repairs all alone.",
            es: "Algo se había roto en mi motor. Y como no tenía conmigo ni un mecánico ni pasajeros, me dispuse a intentar las difíciles reparaciones completamente solo.",
          },
          {
            en: "It was a question of life or death for me: I had scarcely enough drinking water to last a week.",
            es: "Era una cuestión de vida o muerte para mí: apenas tenía agua potable para una semana.",
          },
        ],
      },
    ],
    vocabulary: [
      { word: "magnificent", translation: "magnífico/a", definition: "Extremely beautiful or impressive" },
      { word: "primeval", translation: "primitivo/a", definition: "Relating to the earliest ages in history" },
      { word: "boa constrictor", translation: "boa constrictora", definition: "A large snake that squeezes its prey" },
      { word: "prey", translation: "presa", definition: "An animal hunted for food" },
      { word: "digestion", translation: "digestión", definition: "The process of breaking down food" },
      { word: "pondered", translation: "reflexioné", definition: "Thought about carefully" },
      { word: "masterpiece", translation: "obra maestra", definition: "A work of outstanding skill" },
      { word: "mechanic", translation: "mecánico", definition: "A person who repairs machines" },
    ],
    questions: [
      {
        question: "What did the narrator see in the book when he was six?",
        questionEs: "¿Qué vio el narrador en el libro cuando tenía seis años?",
        options: [
          { en: "A picture of a hat", es: "Una imagen de un sombrero" },
          { en: "A picture of a boa constrictor swallowing an animal", es: "Una imagen de una boa constrictora tragando un animal" },
          { en: "A picture of a jungle", es: "Una imagen de una selva" },
          { en: "A picture of a prince", es: "Una imagen de un príncipe" },
        ],
        correctIndex: 1,
      },
      {
        question: "What did the grown-ups think the drawing was?",
        questionEs: "¿Qué pensaron los adultos que era el dibujo?",
        options: [
          { en: "A snake", es: "Una serpiente" },
          { en: "An elephant", es: "Un elefante" },
          { en: "A hat", es: "Un sombrero" },
          { en: "A forest", es: "Un bosque" },
        ],
        correctIndex: 2,
      },
      {
        question: "Where did the narrator have an accident?",
        questionEs: "¿Dónde tuvo el narrador un accidente?",
        options: [
          { en: "In a jungle", es: "En una selva" },
          { en: "In the Desert of Sahara", es: "En el Desierto del Sahara" },
          { en: "In a city", es: "En una ciudad" },
          { en: "On a mountain", es: "En una montaña" },
        ],
        correctIndex: 1,
      },
    ],
  },
};

// Fallback for other story IDs
const defaultStory: StoryData = {
  id: "default",
  title: "Story Coming Soon",
  titleEs: "Historia Próximamente",
  chapters: [
    {
      title: "Chapter 1",
      titleEs: "Capítulo 1",
      paragraphs: [
        {
          en: "This story is being prepared. Please check back later!",
          es: "Esta historia está siendo preparada. ¡Por favor, vuelve más tarde!",
        },
      ],
    },
  ],
  vocabulary: [],
  questions: [],
};

export default function StoryReaderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t, language } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>("sideBySide");
  const [currentChapter, setCurrentChapter] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const story = storyData[id] || defaultStory;
  const chapter = story.chapters[currentChapter];

  const handleWordClick = (word: string) => {
    const cleanWord = word.replace(/[.,!?;:"']/g, "").toLowerCase();
    const vocabItem = story.vocabulary.find(
      (v) => v.word.toLowerCase() === cleanWord || v.translation.toLowerCase() === cleanWord
    );
    if (vocabItem) {
      setSelectedWord(vocabItem.word);
    }
  };

  const renderText = (text: string, isEnglish: boolean) => {
    const words = text.split(" ");
    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,!?;:"']/g, "").toLowerCase();
      const isVocab = story.vocabulary.some(
        (v) => v.word.toLowerCase() === cleanWord || v.translation.toLowerCase() === cleanWord
      );
      return (
        <span
          key={index}
          onClick={() => isVocab && handleWordClick(word)}
          className={cn(
            "cursor-default",
            isVocab && "cursor-pointer underline decoration-primary/30 hover:bg-primary/10 hover:text-primary"
          )}
        >
          {word}{" "}
        </span>
      );
    });
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);
  };

  const correctCount = story.questions.filter((q, i) => answers[i] === q.correctIndex).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/student/learning">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">{t("reader.back")}</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">
              {language === "en" ? story.title : story.titleEs}
            </h1>
            <p className="text-sm text-muted-foreground">
              {language === "en" ? chapter.title : chapter.titleEs}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Volume2 className="h-4 w-4" />
            {t("reader.listen")}
          </Button>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex flex-wrap items-center gap-4">
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
          <TabsList>
            <TabsTrigger value="english">{t("reader.english")}</TabsTrigger>
            <TabsTrigger value="spanish">{t("reader.spanish")}</TabsTrigger>
            <TabsTrigger value="sideBySide">{t("reader.sideBySide")}</TabsTrigger>
          </TabsList>
        </Tabs>

        <p className="text-xs text-muted-foreground">{t("reader.clickWord")}</p>
      </div>

      {/* Story Content */}
      {!showQuestions ? (
        <Card>
          <CardContent className="p-6">
            {viewMode === "sideBySide" ? (
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <Badge variant="secondary" className="mb-2">
                    {t("reader.english")}
                  </Badge>
                  {chapter.paragraphs.map((para, index) => (
                    <p key={index} className="leading-relaxed text-foreground">
                      {renderText(para.en, true)}
                    </p>
                  ))}
                </div>
                <div className="space-y-4 border-t pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                  <Badge variant="secondary" className="mb-2">
                    {t("reader.spanish")}
                  </Badge>
                  {chapter.paragraphs.map((para, index) => (
                    <p key={index} className="leading-relaxed text-foreground">
                      {renderText(para.es, false)}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {chapter.paragraphs.map((para, index) => (
                  <p key={index} className="leading-relaxed text-foreground">
                    {renderText(viewMode === "english" ? para.en : para.es, viewMode === "english")}
                  </p>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        /* Comprehension Questions */
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              {t("reader.questions")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {story.questions.map((q, qIndex) => (
              <div key={qIndex} className="space-y-3">
                <p className="font-medium">
                  {qIndex + 1}. {language === "en" ? q.question : q.questionEs}
                </p>
                <RadioGroup
                  value={answers[qIndex]?.toString()}
                  onValueChange={(v) => setAnswers({ ...answers, [qIndex]: parseInt(v) })}
                  disabled={submitted}
                >
                  {q.options.map((option, oIndex) => (
                    <div
                      key={oIndex}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-3 transition-colors",
                        submitted && oIndex === q.correctIndex && "border-accent bg-accent/10",
                        submitted && answers[qIndex] === oIndex && oIndex !== q.correctIndex && "border-destructive bg-destructive/10"
                      )}
                    >
                      <RadioGroupItem value={oIndex.toString()} id={`q${qIndex}-o${oIndex}`} />
                      <Label htmlFor={`q${qIndex}-o${oIndex}`} className="flex-1 cursor-pointer">
                        {language === "en" ? option.en : option.es}
                      </Label>
                      {submitted && oIndex === q.correctIndex && (
                        <CheckCircle2 className="h-5 w-5 text-accent" />
                      )}
                      {submitted && answers[qIndex] === oIndex && oIndex !== q.correctIndex && (
                        <XCircle className="h-5 w-5 text-destructive" />
                      )}
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}

            {submitted ? (
              <div className="rounded-lg bg-muted p-4 text-center">
                <p className="text-lg font-semibold">
                  {language === "en"
                    ? `You got ${correctCount} out of ${story.questions.length} correct!`
                    : `¡Obtuviste ${correctCount} de ${story.questions.length} correctas!`}
                </p>
                <Button className="mt-4" onClick={() => { setSubmitted(false); setAnswers({}); }}>
                  {language === "en" ? "Try Again" : "Intentar de Nuevo"}
                </Button>
              </div>
            ) : (
              <Button
                className="w-full"
                onClick={handleSubmitQuiz}
                disabled={Object.keys(answers).length !== story.questions.length}
              >
                {t("common.submit")}
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Selected Word Tooltip */}
      {selectedWord && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex items-start gap-4 p-4">
            <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div className="flex-1">
              {(() => {
                const vocabItem = story.vocabulary.find((v) => v.word === selectedWord);
                return vocabItem ? (
                  <>
                    <p className="font-semibold">
                      {vocabItem.word} → {vocabItem.translation}
                    </p>
                    <p className="text-sm text-muted-foreground">{vocabItem.definition}</p>
                  </>
                ) : null;
              })()}
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSelectedWord(null)}>
              {t("common.close")}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Vocabulary List */}
      {!showQuestions && story.vocabulary.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {t("reader.vocabulary")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {story.vocabulary.map((item) => (
                <div
                  key={item.word}
                  className="rounded-lg border border-border p-3 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                >
                  <p className="font-medium">{item.word}</p>
                  <p className="text-sm text-primary">{item.translation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          disabled={currentChapter === 0}
          onClick={() => setCurrentChapter(currentChapter - 1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          {t("common.previous")}
        </Button>

        <div className="flex items-center gap-2">
          {story.chapters.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentChapter(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                index === currentChapter ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>

        {currentChapter === story.chapters.length - 1 && !showQuestions ? (
          <Button onClick={() => setShowQuestions(true)}>
            {t("reader.questions")}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : showQuestions ? (
          <Button variant="outline" onClick={() => setShowQuestions(false)}>
            {language === "en" ? "Back to Story" : "Volver a la Historia"}
          </Button>
        ) : (
          <Button onClick={() => setCurrentChapter(currentChapter + 1)}>
            {t("common.next")}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
