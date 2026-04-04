"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/user-context";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { MobileHeader } from "@/components/mobile-header";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { isOnboarded, role } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isOnboarded || role !== "student") {
      router.push("/onboarding");
    }
  }, [isOnboarded, role, router]);

  if (!isOnboarded || role !== "student") {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <MobileHeader />
      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
