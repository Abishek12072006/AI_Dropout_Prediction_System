import React, { createContext, useContext, useState, ReactNode } from "react";

type Role = "admin" | "student" | null;

interface AuthState {
  isAuthenticated: boolean;
  role: Role;
  studentId: string | null;
  login: (role: "admin" | "student", studentId?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>(null);
  const [studentId, setStudentId] = useState<string | null>(null);

  const login = (r: "admin" | "student", sid?: string) => {
    setRole(r);
    setStudentId(sid || null);
  };
  const logout = () => { setRole(null); setStudentId(null); };

  return (
    <AuthContext.Provider value={{ isAuthenticated: role !== null, role, studentId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
