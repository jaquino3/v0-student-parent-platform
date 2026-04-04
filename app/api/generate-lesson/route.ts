import { generateText, Output } from "ai";
import { z } from "zod";

// Schema for the generated lesson
const lessonSchema = z.object({
  title: z.string().describe("Lesson title"),
  grade_level: z.string().describe("Grade level"),
  subject: z.enum(["ELA", "Math"]).describe("Subject area"),
  difficulty: z.enum(["easy", "medium", "hard"]).describe("Difficulty level"),
  lesson_content: z.object({
    english: z.string().describe("Main explanation or story in English"),
    spanish: z.string().describe("Main explanation or story in Spanish"),
  }),
  examples: z.array(
    z.object({
      question: z.string().describe("Example question"),
      solution: z.string().describe("Step-by-step explanation"),
    })
  ).describe("Worked examples"),
  practice_questions: z.array(
    z.object({
      question: z.string().describe("Practice question"),
      options: z.array(z.string()).describe("Multiple choice options A, B, C, D"),
      answer: z.string().describe("Correct answer"),
      explanation: z.string().nullable().describe("Explanation for the answer"),
    })
  ).describe("Practice problems"),
  vocabulary: z.array(
    z.object({
      word: z.string().describe("Vocabulary word"),
      definition_en: z.string().describe("English definition"),
      definition_es: z.string().describe("Spanish definition"),
    })
  ).describe("Key vocabulary terms"),
  progress_advice: z.string().describe("Personalized suggestion based on student performance"),
  next_recommendation: z.string().describe("What the student should learn next"),
});

export type GeneratedLesson = z.infer<typeof lessonSchema>;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      grade_level,
      subject,
      language_preference,
      student_level,
      recent_performance,
      topic,
    } = body;

    const systemPrompt = `You are an educational content generator for a bilingual (English + Spanish) learning platform designed for Hispanic students.

Generate a personalized lesson based on the student's profile and progress.

REQUIREMENTS:
1. Content must match the grade level and student level.
2. If student is weak in an area, simplify explanations and include more guidance.
3. If student is strong, increase difficulty slightly.
4. Provide bilingual support - ALWAYS include both English and Spanish content.
5. Keep language simple and clear.
6. Make content culturally relevant and engaging.

Make sure:
- Content is age-appropriate
- Math problems include step-by-step reasoning
- ELA includes comprehension and vocabulary support
- Include 3-5 practice questions with multiple choice options
- Include 3-5 vocabulary words relevant to the topic
- Provide helpful progress advice and next steps`;

    const userPrompt = `Generate a personalized lesson with these parameters:
- Grade Level: ${grade_level}
- Subject: ${subject}
- Language Preference: ${language_preference}
- Student Level: ${student_level}
- Recent Performance: ${recent_performance}
- Topic: ${topic}

Create an engaging, educational lesson that adapts to this student's level and needs.`;

    const { output } = await generateText({
      model: "openai/gpt-4o-mini",
      output: Output.object({
        schema: lessonSchema,
      }),
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    return Response.json({ lesson: output });
  } catch (error) {
    console.error("Error generating lesson:", error);
    return Response.json(
      { error: "Failed to generate lesson" },
      { status: 500 }
    );
  }
}
