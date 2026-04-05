"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Role = "student" | "parent" | null;
type GradeLevel = "3rd" | "5th" | "8th" | "middle" | "high" | "college" | null;

interface UserContextType {
  role: Role;
  setRole: (role: Role) => void;
  gradeLevel: GradeLevel;
  setGradeLevel: (grade: GradeLevel) => void;
  studentName: string;
  setStudentName: (name: string) => void;
  isOnboarded: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>(null);
  const [gradeLevel, setGradeLevelState] = useState<GradeLevel>(null);
  const [studentName, setStudentNameState] = useState<string>("Alex");
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole") as Role;
    const savedGrade = localStorage.getItem("gradeLevel") as GradeLevel;
    const savedName = localStorage.getItem("studentName");
    const savedOnboarded = localStorage.getItem("isOnboarded");

    if (savedRole) setRoleState(savedRole);
    if (savedGrade) setGradeLevelState(savedGrade);
    if (savedName) setStudentNameState(savedName);
    if (savedOnboarded === "true") setIsOnboarded(true);
    setIsHydrated(true);
  }, []);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (isHydrated && newRole) localStorage.setItem("userRole", newRole);
  };

  const setGradeLevel = (grade: GradeLevel) => {
    setGradeLevelState(grade);
    if (isHydrated && grade) localStorage.setItem("gradeLevel", grade);
  };

  const setStudentName = (name: string) => {
    setStudentNameState(name);
    if (isHydrated) localStorage.setItem("studentName", name);
  };

  const completeOnboarding = () => {
    setIsOnboarded(true);
    if (isHydrated) localStorage.setItem("isOnboarded", "true");
  };

  const resetOnboarding = () => {
    setIsOnboarded(false);
    setRoleState(null);
    setGradeLevelState(null);
    if (isHydrated) {
      localStorage.removeItem("userRole");
      localStorage.removeItem("gradeLevel");
      localStorage.removeItem("isOnboarded");
    }
  };

  return (
    <UserContext.Provider
      value={{
        role,
        setRole,
        gradeLevel,
        setGradeLevel,
        studentName,
        setStudentName,
        isOnboarded,
        completeOnboarding,
        resetOnboarding,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
