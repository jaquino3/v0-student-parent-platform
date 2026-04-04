"use client";

import { useLanguage } from "@/lib/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Clock,
  MessageSquare,
  Heart,
  Star,
  Lightbulb,
  Home,
  Users,
} from "lucide-react";

const tips = [
  {
    icon: BookOpen,
    title: "Daily Reading Time",
    titleEs: "Tiempo de Lectura Diario",
    description: "Set aside 20-30 minutes each day for reading together. This builds vocabulary and comprehension skills while creating bonding time.",
    descriptionEs: "Reserve 20-30 minutos cada día para leer juntos. Esto desarrolla vocabulario y comprensión mientras crea tiempo de conexión.",
  },
  {
    icon: Clock,
    title: "Consistent Schedule",
    titleEs: "Horario Consistente",
    description: "Help your child establish a regular study routine. Consistency is key for building good learning habits.",
    descriptionEs: "Ayude a su hijo a establecer una rutina de estudio regular. La consistencia es clave para desarrollar buenos hábitos de aprendizaje.",
  },
  {
    icon: MessageSquare,
    title: "Ask Open Questions",
    titleEs: "Haga Preguntas Abiertas",
    description: "Instead of asking \"Did you understand?\", try \"What did you learn today?\" or \"Can you explain this to me?\"",
    descriptionEs: "En lugar de preguntar \"¿Entendiste?\", intente \"¿Qué aprendiste hoy?\" o \"¿Puedes explicarme esto?\"",
  },
  {
    icon: Heart,
    title: "Celebrate Progress",
    titleEs: "Celebre el Progreso",
    description: "Acknowledge small victories and improvements. Positive reinforcement motivates continued effort.",
    descriptionEs: "Reconozca las pequeñas victorias y mejoras. El refuerzo positivo motiva el esfuerzo continuo.",
  },
  {
    icon: Star,
    title: "Focus on Effort",
    titleEs: "Enfóquese en el Esfuerzo",
    description: "Praise hard work and persistence rather than just results. This builds a growth mindset.",
    descriptionEs: "Elogie el trabajo duro y la persistencia, no solo los resultados. Esto desarrolla una mentalidad de crecimiento.",
  },
  {
    icon: Lightbulb,
    title: "Connect to Real Life",
    titleEs: "Conecte con la Vida Real",
    description: "Show how math and reading apply to everyday situations like cooking, shopping, or following directions.",
    descriptionEs: "Muestre cómo las matemáticas y la lectura se aplican a situaciones cotidianas como cocinar, comprar o seguir instrucciones.",
  },
  {
    icon: Home,
    title: "Create a Study Space",
    titleEs: "Cree un Espacio de Estudio",
    description: "Designate a quiet, well-lit area for homework and learning. Keep supplies organized and accessible.",
    descriptionEs: "Designe un área tranquila y bien iluminada para tareas y aprendizaje. Mantenga los materiales organizados y accesibles.",
  },
  {
    icon: Users,
    title: "Stay Involved",
    titleEs: "Manténgase Involucrado",
    description: "Check the app regularly to monitor progress and celebrate achievements together as a family.",
    descriptionEs: "Revise la aplicación regularmente para monitorear el progreso y celebrar los logros juntos en familia.",
  },
];

const mathTips = [
  {
    title: "Practice with Real Objects",
    titleEs: "Practique con Objetos Reales",
    description: "Use pizza slices, fruit, or building blocks to demonstrate fractions and math concepts visually.",
    descriptionEs: "Use rebanadas de pizza, frutas o bloques de construcción para demostrar fracciones y conceptos matemáticos visualmente.",
  },
  {
    title: "Make Math a Game",
    titleEs: "Haga de las Matemáticas un Juego",
    description: "Turn practice into fun challenges. Time races, point systems, or friendly competitions motivate learning.",
    descriptionEs: "Convierta la práctica en desafíos divertidos. Carreras contra el tiempo, sistemas de puntos o competencias amistosas motivan el aprendizaje.",
  },
  {
    title: "Don't Fear Mistakes",
    titleEs: "No Tema los Errores",
    description: "Errors are learning opportunities. Guide your child to understand why an answer was wrong, not just the correct solution.",
    descriptionEs: "Los errores son oportunidades de aprendizaje. Guíe a su hijo a entender por qué una respuesta fue incorrecta, no solo la solución correcta.",
  },
];

const readingTips = [
  {
    title: "Discuss Stories Together",
    titleEs: "Discuta Historias Juntos",
    description: "After reading, talk about characters, plot, and what might happen next. This builds comprehension.",
    descriptionEs: "Después de leer, hable sobre los personajes, la trama y lo que podría pasar después. Esto desarrolla la comprensión.",
  },
  {
    title: "Build Vocabulary Naturally",
    titleEs: "Desarrolle Vocabulario Naturalmente",
    description: "When encountering new words, discuss meanings and use them in sentences throughout the day.",
    descriptionEs: "Cuando encuentre palabras nuevas, discuta sus significados y úselas en oraciones durante el día.",
  },
  {
    title: "Explore Both Languages",
    titleEs: "Explore Ambos Idiomas",
    description: "Use the bilingual features to strengthen skills in both English and Spanish. This benefits cognitive development.",
    descriptionEs: "Use las funciones bilingües para fortalecer habilidades en inglés y español. Esto beneficia el desarrollo cognitivo.",
  },
];

export default function ParentGuidancePage() {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">{t("parent.guidance")}</h1>
        <p className="mt-1 text-muted-foreground">
          {language === "en"
            ? "Tips and strategies to support your child's learning journey"
            : "Consejos y estrategias para apoyar el aprendizaje de su hijo"}
        </p>
      </div>

      {/* General Tips */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === "en" ? "General Learning Tips" : "Consejos Generales de Aprendizaje"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 rounded-xl border border-border p-4 transition-colors hover:border-primary/50 hover:bg-primary/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <tip.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">
                    {language === "en" ? tip.title : tip.titleEs}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {language === "en" ? tip.description : tip.descriptionEs}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Math Tips */}
        <Card className="border-[var(--math)]/20">
          <CardHeader className="bg-[var(--math)]/5">
            <CardTitle className="flex items-center gap-2 text-[var(--math)]">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--math)] text-[var(--math-foreground)]">
                +
              </span>
              {language === "en" ? "Math Support Tips" : "Consejos de Apoyo en Matemáticas"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {mathTips.map((tip, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--math)]/20 text-xs font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">
                      {language === "en" ? tip.title : tip.titleEs}
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {language === "en" ? tip.description : tip.descriptionEs}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reading Tips */}
        <Card className="border-[var(--ela)]/20">
          <CardHeader className="bg-[var(--ela)]/5">
            <CardTitle className="flex items-center gap-2 text-[var(--ela)]">
              <BookOpen className="h-6 w-6" />
              {language === "en" ? "Reading Support Tips" : "Consejos de Apoyo en Lectura"}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {readingTips.map((tip, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--ela)]/20 text-xs font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">
                      {language === "en" ? tip.title : tip.titleEs}
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {language === "en" ? tip.description : tip.descriptionEs}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Support Note */}
      <Card className="bg-accent/10 border-accent/30">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Heart className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold">
              {language === "en" ? "Remember: You're Doing Great!" : "Recuerde: ¡Lo está haciendo muy bien!"}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {language === "en"
                ? "The fact that you're here looking for ways to support your child shows how much you care. Every small effort makes a big difference in their educational journey."
                : "El hecho de que esté aquí buscando formas de apoyar a su hijo demuestra cuánto le importa. Cada pequeño esfuerzo hace una gran diferencia en su camino educativo."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
