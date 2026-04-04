"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Info,
  Clock,
  Trash2,
  BookOpen,
  Calculator,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "warning" | "success" | "info";
  category: "progress" | "achievement" | "reminder";
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  time: string;
  timeEs: string;
  read: boolean;
  subject?: "ELA" | "Math";
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "warning",
    category: "progress",
    title: "Low progress in Math",
    titleEs: "Bajo progreso en Matemáticas",
    description: "Alex hasn't completed any math lessons this week. Consider encouraging more practice time.",
    descriptionEs: "Alex no ha completado ninguna lección de matemáticas esta semana. Considere animar a más tiempo de práctica.",
    time: "2 hours ago",
    timeEs: "Hace 2 horas",
    read: false,
    subject: "Math",
  },
  {
    id: "2",
    type: "success",
    category: "achievement",
    title: "Story completed!",
    titleEs: "¡Historia completada!",
    description: "Alex finished reading \"The Giving Tree\" and scored 95% on the comprehension quiz.",
    descriptionEs: "Alex terminó de leer \"El Árbol Generoso\" y obtuvo 95% en el quiz de comprensión.",
    time: "1 day ago",
    timeEs: "Hace 1 día",
    read: false,
    subject: "ELA",
  },
  {
    id: "3",
    type: "success",
    category: "achievement",
    title: "Quiz passed with high score!",
    titleEs: "¡Quiz aprobado con alta puntuación!",
    description: "Alex scored 90% on the fractions quiz. Great job!",
    descriptionEs: "Alex obtuvo 90% en el quiz de fracciones. ¡Excelente trabajo!",
    time: "2 days ago",
    timeEs: "Hace 2 días",
    read: true,
    subject: "Math",
  },
  {
    id: "4",
    type: "info",
    category: "reminder",
    title: "Weekly goal not met",
    titleEs: "Meta semanal no alcanzada",
    description: "Alex completed 4 out of 5 lessons this week. Just one more to reach the weekly goal!",
    descriptionEs: "Alex completó 4 de 5 lecciones esta semana. ¡Solo una más para alcanzar la meta semanal!",
    time: "3 days ago",
    timeEs: "Hace 3 días",
    read: true,
  },
  {
    id: "5",
    type: "warning",
    category: "progress",
    title: "Missed assignment",
    titleEs: "Tarea pendiente",
    description: "The vocabulary practice for \"The Little Prince\" hasn't been completed yet.",
    descriptionEs: "La práctica de vocabulario de \"El Principito\" aún no se ha completado.",
    time: "4 days ago",
    timeEs: "Hace 4 días",
    read: true,
    subject: "ELA",
  },
  {
    id: "6",
    type: "success",
    category: "achievement",
    title: "7-day streak achieved!",
    titleEs: "¡Racha de 7 días lograda!",
    description: "Alex has been learning consistently for a whole week. Amazing dedication!",
    descriptionEs: "Alex ha estado aprendiendo consistentemente por una semana entera. ¡Increíble dedicación!",
    time: "5 days ago",
    timeEs: "Hace 5 días",
    read: true,
  },
];

export default function ParentNotificationsPage() {
  const { t, language } = useLanguage();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState("all");

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !n.read;
    return n.category === activeTab;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return AlertTriangle;
      case "success":
        return CheckCircle2;
      default:
        return Info;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{t("parent.notifications")}</h1>
          <p className="mt-1 text-muted-foreground">
            {language === "en"
              ? `You have ${unreadCount} unread notifications`
              : `Tienes ${unreadCount} notificaciones sin leer`}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            {language === "en" ? "Mark all as read" : "Marcar todo como leído"}
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="all" className="gap-2">
            <Bell className="h-4 w-4" />
            {language === "en" ? "All" : "Todas"}
          </TabsTrigger>
          <TabsTrigger value="unread" className="gap-2">
            {unreadCount > 0 && (
              <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 text-xs">
                {unreadCount}
              </Badge>
            )}
            {language === "en" ? "Unread" : "Sin leer"}
          </TabsTrigger>
          <TabsTrigger value="progress">
            {language === "en" ? "Progress" : "Progreso"}
          </TabsTrigger>
          <TabsTrigger value="achievement">
            {language === "en" ? "Achievements" : "Logros"}
          </TabsTrigger>
          <TabsTrigger value="reminder">
            {language === "en" ? "Reminders" : "Recordatorios"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  {language === "en" ? "No notifications to show" : "No hay notificaciones para mostrar"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => {
                const Icon = getIcon(notification.type);
                return (
                  <Card
                    key={notification.id}
                    className={cn(
                      "transition-colors",
                      !notification.read && "border-primary/30 bg-primary/5"
                    )}
                  >
                    <CardContent className="flex gap-4 p-4">
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                          notification.type === "warning" && "bg-destructive/20 text-destructive",
                          notification.type === "success" && "bg-accent/20 text-accent",
                          notification.type === "info" && "bg-primary/20 text-primary"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <h3 className={cn("font-medium", !notification.read && "font-semibold")}>
                              {language === "en" ? notification.title : notification.titleEs}
                            </h3>
                            {notification.subject && (
                              <Badge variant="outline" className="gap-1">
                                {notification.subject === "Math" ? (
                                  <Calculator className="h-3 w-3" />
                                ) : (
                                  <BookOpen className="h-3 w-3" />
                                )}
                                {notification.subject}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <div className="h-2 w-2 rounded-full bg-primary" />
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {language === "en" ? notification.description : notification.descriptionEs}
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {language === "en" ? notification.time : notification.timeEs}
                          </span>
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0 text-xs text-primary hover:bg-transparent"
                              onClick={() => markAsRead(notification.id)}
                            >
                              {language === "en" ? "Mark as read" : "Marcar como leído"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
