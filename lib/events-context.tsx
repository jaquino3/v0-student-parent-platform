"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type EventCategory = "class" | "work" | "homework" | "extracurricular";

export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  category: EventCategory;
  day: number;
  month: number;
  year: number;
}

interface EventsContextType {
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, "id">) => void;
  removeEvent: (id: string) => void;
  getEventsForDate: (day: number, month: number, year: number) => CalendarEvent[];
  getTodayEvents: () => CalendarEvent[];
}

const initialEvents: CalendarEvent[] = [
  { id: "1", title: "Math Class", time: "09:00", category: "class", day: 4, month: 3, year: 2026 },
  { id: "2", title: "ELA Reading", time: "11:00", category: "class", day: 4, month: 3, year: 2026 },
  { id: "3", title: "Homework: Fractions", time: "15:00", category: "homework", day: 4, month: 3, year: 2026 },
  { id: "4", title: "Soccer Practice", time: "17:00", category: "extracurricular", day: 4, month: 3, year: 2026 },
  { id: "5", title: "Math Class", time: "09:00", category: "class", day: 5, month: 3, year: 2026 },
  { id: "6", title: "Piano Lesson", time: "16:00", category: "extracurricular", day: 5, month: 3, year: 2026 },
  { id: "7", title: "Part-time Job", time: "17:00", category: "work", day: 6, month: 3, year: 2026 },
  { id: "8", title: "Science Project", time: "19:00", category: "homework", day: 6, month: 3, year: 2026 },
];

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  useEffect(() => {
    const saved = localStorage.getItem("calendar_events");
    if (saved) {
      try {
        setEvents(JSON.parse(saved));
      } catch {
        setEvents(initialEvents);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("calendar_events", JSON.stringify(events));
  }, [events]);

  const addEvent = (event: Omit<CalendarEvent, "id">) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: Date.now().toString(),
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  const removeEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const getEventsForDate = (day: number, month: number, year: number) => {
    return events
      .filter((e) => e.day === day && e.month === month && e.year === year)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  const getTodayEvents = () => {
    const today = new Date(2026, 3, 4); // April 4, 2026
    return getEventsForDate(today.getDate(), today.getMonth(), today.getFullYear());
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, removeEvent, getEventsForDate, getTodayEvents }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
}
