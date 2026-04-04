"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { useUser } from "@/lib/user-context";
import { LanguageSelectorCompact } from "@/components/language-selector";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Calendar,
  User,
  LogOut,
  GraduationCap,
  Users,
  Bell,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const studentNavItems = [
  { key: "nav.dashboard", href: "/student", icon: LayoutDashboard },
  { key: "nav.learning", href: "/student/learning", icon: BookOpen },
  { key: "nav.progress", href: "/student/progress", icon: BarChart3 },
  { key: "nav.calendar", href: "/student/calendar", icon: Calendar },
];

const parentNavItems = [
  { key: "nav.dashboard", href: "/parent", icon: LayoutDashboard },
  { key: "parent.overview", href: "/parent/overview", icon: Users },
  { key: "parent.guidance", href: "/parent/guidance", icon: Lightbulb },
  { key: "parent.notifications", href: "/parent/notifications", icon: Bell },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { role, resetOnboarding, studentName } = useUser();

  const navItems = role === "parent" ? parentNavItems : studentNavItems;

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <GraduationCap className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold text-sidebar-foreground">EduPath</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className="h-5 w-5" />
              {t(item.key)}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="mb-4 flex items-center gap-3 rounded-lg bg-sidebar-accent/50 px-3 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-5 w-5" />
          </div>
          <div className="flex-1 truncate">
            <p className="text-sm font-medium text-sidebar-foreground">{studentName}</p>
            <p className="text-xs text-muted-foreground capitalize">{role}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <LanguageSelectorCompact />
          <Button
            variant="ghost"
            size="sm"
            onClick={resetOnboarding}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
            <span className="sr-only">{t("nav.logout")}</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
