import React, { createContext, useContext, useState, ReactNode } from "react";
import { Student, Intervention, seedStudents } from "@/data/students";

interface DataState {
  students: Student[];
  updateIntervention: (studentId: string, interventionId: string, updates: Partial<Intervention>) => void;
}

const DataContext = createContext<DataState | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>(seedStudents);

  const updateIntervention = (studentId: string, interventionId: string, updates: Partial<Intervention>) => {
    setStudents(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      return {
        ...s,
        interventions: s.interventions.map(i =>
          i.id === interventionId ? { ...i, ...updates } : i
        ),
      };
    }));
  };

  return (
    <DataContext.Provider value={{ students, updateIntervention }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};
