"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  "nav.dashboard": { en: "Dashboard", es: "Panel de Control" },
  "nav.learning": { en: "Learning Hub", es: "Centro de Aprendizaje" },
  "nav.progress": { en: "Progress", es: "Progreso" },
  "nav.calendar": { en: "Calendar", es: "Calendario" },
  "nav.profile": { en: "Profile", es: "Perfil" },
  "nav.logout": { en: "Log Out", es: "Cerrar Sesión" },
  
  // Landing Page
  "landing.platDesc": {en: "Bilingual Learning Platform", es: "Plataforma de aprendizaje bilingüe"},
  "landing.title": { en: "Empowering Students & Families", es: "Empoderando Estudiantes y Familias" },
  "landing.subtitle": { en: "Bilingual learning platform for academic success", es: "Plataforma de aprendizaje bilingüe para el éxito académico" },
  "landing.getStarted": { en: "Get Started", es: "Comenzar" },
  "landing.learnMoreSubtitle": {en: "Everything you need to succeed", es: "Todo lo que necesitas para triunfar"},
  "landing.learnMoreSubtitleDesc" : {en: "Our platform provides comprehensive tools for students and parents alike.", es:"Nuestra plataforma ofrece herramientas completas tanto para los alumnos como para los padres."},
  "landing.feature1.title": { en: "Personalized Learning", es: "Aprendizaje Personalizado" },
  "landing.feature1.desc": { en: "Adaptive content based on grade level and progress", es: "Contenido adaptativo basado en nivel y progreso" },
  "landing.feature2.title": { en: "Bilingual Support", es: "Soporte Bilingüe" },
  "landing.feature2.desc": { en: "Full English and Spanish language support", es: "Soporte completo en inglés y español" },
  "landing.feature3.title": { en: "Parent Involvement", es: "Participación de Padres" },
  "landing.feature3.desc": { en: "Track progress and support learning at home", es: "Seguimiento del progreso y apoyo desde casa" },
  "landing.copyright": {en: "\u00A9 2026 EduPath. All rights reserved.", es:"\u00A9 2026 EduPath. Todos los derechos reservados."},
  

  
  // Role Selection
  "role.title": { en: "Who are you?", es: "¿Quién eres?" },
  "role.subtitle": { en: "Select your role to personalize your experience", es: "Selecciona tu rol para personalizar tu experiencia" },
  "role.student": { en: "Student", es: "Estudiante" },
  "role.studentDesc": { en: "Access lessons, track progress, and manage your schedule", es: "Accede a lecciones, sigue tu progreso y gestiona tu horario" },
  "role.parent": { en: "Parent", es: "Padre/Madre" },
  "role.parentDesc": { en: "Monitor your child's progress and receive guidance", es: "Supervisa el progreso de tu hijo y recibe orientación" },
  
  // Grade Selection
  "grade.title": { en: "Select Your Grade Level", es: "Selecciona Tu Nivel Escolar" },
  "grade.subtitle": { en: "We'll personalize your learning experience", es: "Personalizaremos tu experiencia de aprendizaje" },
  "grade.elementary": { en: "Elementary", es: "Primaria" },
  "grade.3rd": { en: "Grade 3", es: "Grado 3" },
  "grade.5th": { en: "Grade 5", es: "Grado 5" },
  "grade.8th": { en: "Grade 8", es: "Grado 8" },
  "grade.middle": { en: "Middle School", es: "Escuela Secundaria" },
  "grade.high": { en: "High School", es: "Preparatoria" },
  "grade.college": { en: "College", es: "Universidad" },
  "grade.continue": { en: "Continue", es: "Continuar" },

  //Name Input
  "name.title": { en:"What\'s your name?", es: "¿Cual es tu nombre?"},
  "name.subtitle": {en:"We\'ll use this to personalize your experience", es:"Usaremos esto para personalizar tu experiencia"},
  
  // Dashboard
  "dashboard.welcome": { en: "Welcome back", es: "Bienvenido de nuevo" },
  "dashboard.todayPlan": { en: "Today's Plan", es: "Plan de Hoy" },
  "dashboard.continueLearning": { en: "Continue Learning", es: "Continuar Aprendiendo" },
  "dashboard.recentActivity": { en: "Recent Activity", es: "Actividad Reciente" },
  "dashboard.weeklyGoal": { en: "Weekly Goal", es: "Meta Semanal" },
  
  // Learning Hub
  "learning.ela": { en: "ELA / Reading", es: "Lectura / ELA" },
  "learning.math": { en: "Mathematics", es: "Matemáticas" },
  "learning.stories": { en: "Stories", es: "Historias" },
  "learning.read": { en: "Read", es: "Leer" },
  "learning.startLesson": { en: "Start Lesson", es: "Iniciar Lección" },
  "learning.continue": { en: "Continue", es: "Continuar" },
  "learning.completed": { en: "Completed", es: "Completado" },
  "learning.difficulty": { en: "Difficulty", es: "Dificultad" },
  "learning.beginner": { en: "Beginner", es: "Principiante" },
  "learning.intermediate": { en: "Intermediate", es: "Intermedio" },
  "learning.advanced": { en: "Advanced", es: "Avanzado" },
  
  // Story Reader
  "reader.english": { en: "English", es: "Inglés" },
  "reader.spanish": { en: "Spanish", es: "Español" },
  "reader.sideBySide": { en: "Side by Side", es: "Lado a Lado" },
  "reader.listen": { en: "Listen", es: "Escuchar" },
  "reader.vocabulary": { en: "Vocabulary", es: "Vocabulario" },
  "reader.questions": { en: "Comprehension Questions", es: "Preguntas de Comprensión" },
  "reader.back": { en: "Back to Stories", es: "Volver a Historias" },
  "reader.clickWord": { en: "Click any word for translation", es: "Haz clic en cualquier palabra para traducir" },
  
  // Math
  "math.explanation": { en: "Explanation", es: "Explicación" },
  "math.examples": { en: "Examples", es: "Ejemplos" },
  "math.practice": { en: "Practice Problems", es: "Problemas de Práctica" },
  "math.showSolution": { en: "Show Solution", es: "Mostrar Solución" },
  "math.nextProblem": { en: "Next Problem", es: "Siguiente Problema" },
  "math.checkAnswer": { en: "Check Answer", es: "Verificar Respuesta" },
  "math.correct": { en: "Correct!", es: "¡Correcto!" },
  "math.tryAgain": { en: "Try Again", es: "Intenta de Nuevo" },
  
  // Progress
  "progress.title": { en: "Your Progress", es: "Tu Progreso" },
  "progress.elaProgress": { en: "ELA Progress", es: "Progreso en Lectura" },
  "progress.mathProgress": { en: "Math Progress", es: "Progreso en Matemáticas" },
  "progress.lessonsCompleted": { en: "Lessons Completed", es: "Lecciones Completadas" },
  "progress.weeklyActivity": { en: "Weekly Activity", es: "Actividad Semanal" },
  "progress.streak": { en: "Day Streak", es: "Días Consecutivos" },
  
  // Calendar
  "calendar.title": { en: "Time Management", es: "Gestión del Tiempo" },
  "calendar.addEvent": { en: "Add Event", es: "Agregar Evento" },
  "calendar.class": { en: "Class", es: "Clase" },
  "calendar.work": { en: "Work", es: "Trabajo" },
  "calendar.homework": { en: "Homework", es: "Tarea" },
  "calendar.extracurricular": { en: "Extracurricular", es: "Extracurricular" },
  "calendar.today": { en: "Today", es: "Hoy" },
  "calendar.noEvents": { en: "No events scheduled", es: "Sin eventos programados" },
  
  // Parent Dashboard
  "parent.overview": { en: "Student Overview", es: "Resumen del Estudiante" },
  "parent.guidance": { en: "Guidance & Tips", es: "Orientación y Consejos" },
  "parent.notifications": { en: "Notifications", es: "Notificaciones" },
  "parent.strengths": { en: "Strengths", es: "Fortalezas" },
  "parent.areasToImprove": { en: "Areas to Improve", es: "Áreas a Mejorar" },
  "parent.tip1": { en: "Read with your child for 20 minutes daily", es: "Lea con su hijo por 20 minutos diariamente" },
  "parent.tip2": { en: "Celebrate small achievements", es: "Celebre los pequeños logros" },
  "parent.tip3": { en: "Create a quiet study space", es: "Cree un espacio de estudio tranquilo" },
  "parent.lowProgress": { en: "Low progress alert", es: "Alerta de bajo progreso" },
  "parent.missedAssignment": { en: "Missed assignment", es: "Tarea pendiente" },
  "parent.upcomingTask": { en: "Upcoming task", es: "Tarea próxima" },
  
  // Common
  "common.loading": { en: "Loading...", es: "Cargando..." },
  "common.save": { en: "Save", es: "Guardar" },
  "common.cancel": { en: "Cancel", es: "Cancelar" },
  "common.next": { en: "Next", es: "Siguiente" },
  "common.previous": { en: "Previous", es: "Anterior" },
  "common.close": { en: "Close", es: "Cerrar" },
  "common.submit": { en: "Submit", es: "Enviar" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "en" || saved === "es")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
