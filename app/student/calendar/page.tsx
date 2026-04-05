"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { LanguageSelector } from "@/components/language-selector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  BookOpen,
  Briefcase,
  GraduationCap,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

type EventCategory = "class" | "work" | "homework" | "extracurricular";

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  category: EventCategory;
  day: number;
}

const categoryConfig: Record<EventCategory, { icon: typeof Clock; label: string; labelEs: string; colorClass: string }> = {
  class: {
    icon: GraduationCap,
    label: "Class",
    labelEs: "Clase",
    colorClass: "bg-[var(--calendar-class)] text-white",
  },
  work: {
    icon: Briefcase,
    label: "Work",
    labelEs: "Trabajo",
    colorClass: "bg-[var(--calendar-work)] text-white",
  },
  homework: {
    icon: BookOpen,
    label: "Homework",
    labelEs: "Tarea",
    colorClass: "bg-[var(--calendar-homework)] text-foreground",
  },
  extracurricular: {
    icon: Activity,
    label: "Extracurricular",
    labelEs: "Extracurricular",
    colorClass: "bg-[var(--calendar-extra)] text-white",
  },
};

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const daysOfWeekEs = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const monthsEs = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const initialEvents: CalendarEvent[] = [
  { id: "1", title: "Math Class", time: "9:00 AM", category: "class", day: 1 },
  { id: "2", title: "ELA Reading", time: "11:00 AM", category: "class", day: 1 },
  { id: "3", title: "Homework: Fractions", time: "3:00 PM", category: "homework", day: 1 },
  { id: "4", title: "Soccer Practice", time: "5:00 PM", category: "extracurricular", day: 1 },
  { id: "5", title: "Math Class", time: "9:00 AM", category: "class", day: 2 },
  { id: "6", title: "Piano Lesson", time: "4:00 PM", category: "extracurricular", day: 2 },
  { id: "7", title: "Part-time Job", time: "5:00 PM", category: "work", day: 3 },
  { id: "8", title: "Science Project", time: "7:00 PM", category: "homework", day: 3 },
  { id: "9", title: "ELA Class", time: "10:00 AM", category: "class", day: 4 },
  { id: "10", title: "Math Quiz Review", time: "2:00 PM", category: "homework", day: 4 },
  { id: "11", title: "Soccer Game", time: "3:00 PM", category: "extracurricular", day: 5 },
  { id: "12", title: "Part-time Job", time: "10:00 AM", category: "work", day: 6 },
];

export default function CalendarPage() {
  const { t, language } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 4)); // April 4, 2026
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [selectedDay, setSelectedDay] = useState<number | null>(4);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    time: "",
    category: "class" as EventCategory,
  });

  const today = new Date(2026, 3, 4);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDay(null);
  };

  const goToToday = () => {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDay(today.getDate());
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const getEventsForDay = (day: number) => {
    return events.filter((e) => e.day === day);
  };

  const addEvent = () => {
    if (newEvent.title && newEvent.time && selectedDay) {
      const event: CalendarEvent = {
        id: Date.now().toString(),
        title: newEvent.title,
        time: newEvent.time,
        category: newEvent.category,
        day: selectedDay,
      };
      setEvents([...events, event]);
      setNewEvent({ title: "", time: "", category: "class" });
      setDialogOpen(false);
    }
  };

  const selectedDayEvents = selectedDay ? getEventsForDay(selectedDay) : [];

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="space-y-6">
      <LanguageSelector/>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{t("calendar.title")}</h1>
          <p className="mt-1 text-muted-foreground">
            {language === "en"
              ? "Organize your classes, work, and activities"
              : "Organiza tus clases, trabajo y actividades"}
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" disabled={!selectedDay}>
              <Plus className="h-4 w-4" />
              {t("calendar.addEvent")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("calendar.addEvent")}</DialogTitle>
              <DialogDescription>
                {language === "en" 
                  ? "Add a new event to your calendar" 
                  : "Agrega un nuevo evento a tu calendario"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  {language === "en" ? "Event Title" : "Título del Evento"}
                </Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder={language === "en" ? "Enter event title" : "Ingresa el título"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">
                  {language === "en" ? "Time" : "Hora"}
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">
                  {language === "en" ? "Category" : "Categoría"}
                </Label>
                <Select
                  value={newEvent.category}
                  onValueChange={(v) => setNewEvent({ ...newEvent, category: v as EventCategory })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoryConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        {language === "en" ? config.label : config.labelEs}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">{t("common.cancel")}</Button>
              </DialogClose>
              <Button onClick={addEvent} disabled={!newEvent.title || !newEvent.time}>
                {t("common.save")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Legend */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(categoryConfig).map(([key, config]) => (
          <Badge key={key} variant="outline" className="gap-1.5">
            <div className={cn("h-2.5 w-2.5 rounded-full", config.colorClass)} />
            {language === "en" ? config.label : config.labelEs}
          </Badge>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar Grid */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">
              {language === "en" ? months[currentMonth] : monthsEs[currentMonth]} {currentYear}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goToToday}>
                {t("calendar.today")}
              </Button>
              <Button variant="ghost" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Days of week header */}
            <div className="mb-2 grid grid-cols-7 gap-1 text-center text-sm font-medium text-muted-foreground">
              {(language === "en" ? daysOfWeek : daysOfWeekEs).map((day) => (
                <div key={day} className="py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                const dayEvents = day ? getEventsForDay(day) : [];
                const isSelected = day === selectedDay;
                const isTodayDay = day ? isToday(day) : false;

                return (
                  <button
                    key={index}
                    onClick={() => day && setSelectedDay(day)}
                    disabled={!day}
                    className={cn(
                      "relative flex min-h-[80px] flex-col items-start rounded-lg border p-2 text-left transition-colors",
                      day ? "hover:bg-accent/50" : "cursor-default border-transparent",
                      isSelected && "border-primary bg-primary/10",
                      isTodayDay && !isSelected && "border-primary/50 bg-primary/5"
                    )}
                  >
                    {day && (
                      <>
                        <span
                          className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-full text-sm",
                            isTodayDay && "bg-primary text-primary-foreground font-medium"
                          )}
                        >
                          {day}
                        </span>
                        <div className="mt-1 flex flex-wrap gap-0.5">
                          {dayEvents.slice(0, 3).map((event) => (
                            <div
                              key={event.id}
                              className={cn(
                                "h-1.5 w-1.5 rounded-full",
                                categoryConfig[event.category].colorClass
                              )}
                            />
                          ))}
                          {dayEvents.length > 3 && (
                            <span className="text-[10px] text-muted-foreground">
                              +{dayEvents.length - 3}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Day Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {selectedDay ? (
                <>
                  {language === "en" ? months[currentMonth] : monthsEs[currentMonth]} {selectedDay}
                  {isToday(selectedDay) && (
                    <Badge variant="secondary" className="ml-2">
                      {t("calendar.today")}
                    </Badge>
                  )}
                </>
              ) : (
                language === "en" ? "Select a day" : "Selecciona un día"
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDayEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Clock className="h-12 w-12 text-muted-foreground/30" />
                <p className="mt-4 text-sm text-muted-foreground">
                  {t("calendar.noEvents")}
                </p>
                <Button variant="outline" className="mt-4 gap-2" onClick={() => setDialogOpen(true)}>
                  <Plus className="h-4 w-4" />
                  {t("calendar.addEvent")}
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDayEvents
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((event) => {
                    const config = categoryConfig[event.category];
                    const Icon = config.icon;
                    return (
                      <div
                        key={event.id}
                        className={cn(
                          "flex items-center gap-3 rounded-lg border p-3 transition-colors",
                          "border-border hover:bg-accent/30"
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                            config.colorClass
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {event.time} • {language === "en" ? config.label : config.labelEs}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
