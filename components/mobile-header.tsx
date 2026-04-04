"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { useUser } from "@/lib/user-context";
import { LanguageSelector } from "@/components/language-selector";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Menu,
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

export function MobileHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  const { role, resetOnboarding, studentName } = useUser();

  const navItems = role === "parent" ? parentNavItems : studentNavItems;

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:hidden">
      <div className="flex items-center gap-2">
        <GraduationCap className="h-7 w-7 text-primary" />
        <span className="text-lg font-bold">EduPath</span>
      </div>

      <div className="flex items-center gap-2">
        <LanguageSelector />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                EduPath
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground hover:bg-accent/50"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {t(item.key)}
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="mb-4 flex items-center gap-3 rounded-lg bg-muted px-3 py-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex-1 truncate">
                  <p className="text-sm font-medium">{studentName}</p>
                  <p className="text-xs text-muted-foreground capitalize">{role}</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => {
                  resetOnboarding();
                  setOpen(false);
                }}
              >
                <LogOut className="h-4 w-4" />
                {t("nav.logout")}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
