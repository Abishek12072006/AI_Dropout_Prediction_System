export interface Student {
  id: string;
  name: string;
  registerNumber: string;
  department: string;
  year: number;
  email: string;
  attendance: number;
  internalMarks: number[];
  assignmentCompletion: number;
  engagementScore: number;
  familyIncomeRange: string;
  commuteDistance: number;
  internetAccess: boolean;
  riskScore: number;
  riskCategory: "Low" | "Medium" | "High";
  riskFactors: string[];
  riskExplanation: string;
  interventions: Intervention[];
}

export interface Intervention {
  id: string;
  type: "Counseling" | "Financial Aid" | "Academic Support" | "Mentor Assignment";
  description: string;
  status: "Suggested" | "In Progress" | "Resolved";
  assignedTo?: string;
  date: string;
}

function calculateRiskScore(s: Omit<Student, 'riskScore' | 'riskCategory' | 'riskFactors' | 'riskExplanation' | 'interventions'>): {
  score: number;
  factors: string[];
  explanation: string;
} {
  let score = 0;
  const factors: string[] = [];

  // Attendance (max 30 points)
  if (s.attendance < 50) { score += 30; factors.push("Very low attendance (<50%)"); }
  else if (s.attendance < 65) { score += 22; factors.push("Low attendance (<65%)"); }
  else if (s.attendance < 75) { score += 12; factors.push("Below average attendance (<75%)"); }
  else if (s.attendance < 85) { score += 5; }

  // Marks trend (max 25 points) — check if declining
  const marks = s.internalMarks;
  const avgMark = marks.reduce((a, b) => a + b, 0) / marks.length;
  const declining = marks.length >= 2 && marks[marks.length - 1] < marks[0] - 5;
  if (avgMark < 35) { score += 25; factors.push("Very low academic performance"); }
  else if (avgMark < 50) { score += 18; factors.push("Below average marks"); }
  else if (avgMark < 60) { score += 10; factors.push("Moderate academic performance"); }
  if (declining) { score += 8; factors.push("Declining marks trend"); }

  // Assignment completion (max 15 points)
  if (s.assignmentCompletion < 40) { score += 15; factors.push("Very low assignment completion"); }
  else if (s.assignmentCompletion < 60) { score += 10; factors.push("Low assignment completion"); }
  else if (s.assignmentCompletion < 75) { score += 5; factors.push("Moderate assignment completion"); }

  // Engagement (max 15 points)
  if (s.engagementScore < 30) { score += 15; factors.push("Very low engagement"); }
  else if (s.engagementScore < 50) { score += 10; factors.push("Low engagement"); }
  else if (s.engagementScore < 65) { score += 5; factors.push("Below average engagement"); }

  // Socioeconomic factors (max 15 points)
  if (s.familyIncomeRange === "Below ₹1L") { score += 8; factors.push("Low family income"); }
  else if (s.familyIncomeRange === "₹1L - ₹3L") { score += 4; factors.push("Moderate family income constraints"); }
  if (s.commuteDistance > 30) { score += 5; factors.push("Long commute distance (>30km)"); }
  else if (s.commuteDistance > 15) { score += 2; }
  if (!s.internetAccess) { score += 5; factors.push("No internet access at home"); }

  score = Math.min(100, Math.max(0, score));

  const explanation = factors.length > 0
    ? factors.slice(0, 3).join(", ") + (score >= 71 ? " — indicating high dropout probability." : score >= 41 ? " — suggesting moderate dropout risk." : " — overall low risk profile.")
    : "Student shows a healthy academic and engagement profile.";

  return { score, factors, explanation };
}

function getRiskCategory(score: number): "Low" | "Medium" | "High" {
  if (score <= 40) return "Low";
  if (score <= 70) return "Medium";
  return "High";
}

function generateInterventions(category: "Low" | "Medium" | "High", factors: string[]): Intervention[] {
  const interventions: Intervention[] = [];
  const today = new Date().toISOString().split("T")[0];

  if (category === "High" || category === "Medium") {
    interventions.push({
      id: crypto.randomUUID(),
      type: "Counseling",
      description: "Schedule a one-on-one counseling session to understand personal challenges",
      status: "Suggested",
      date: today,
    });
  }
  if (factors.some(f => f.includes("income") || f.includes("internet"))) {
    interventions.push({
      id: crypto.randomUUID(),
      type: "Financial Aid",
      description: "Evaluate eligibility for scholarship or fee waiver programs",
      status: "Suggested",
      date: today,
    });
  }
  if (factors.some(f => f.includes("marks") || f.includes("academic") || f.includes("assignment"))) {
    interventions.push({
      id: crypto.randomUUID(),
      type: "Academic Support",
      description: "Assign to peer tutoring group and remedial classes",
      status: "Suggested",
      date: today,
    });
  }
  if (category === "High") {
    interventions.push({
      id: crypto.randomUUID(),
      type: "Mentor Assignment",
      description: "Assign a faculty mentor for weekly check-ins and guidance",
      status: "Suggested",
      date: today,
    });
  }

  return interventions;
}

const rawStudents: Omit<Student, 'riskScore' | 'riskCategory' | 'riskFactors' | 'riskExplanation' | 'interventions'>[] = [
  {
    id: "STU001", name: "Aarav Sharma", registerNumber: "2024CS001", department: "Computer Science",
    year: 2, email: "aarav@college.edu", attendance: 92, internalMarks: [78, 82, 85],
    assignmentCompletion: 95, engagementScore: 88, familyIncomeRange: "₹5L - ₹10L",
    commuteDistance: 5, internetAccess: true,
  },
  {
    id: "STU002", name: "Priya Patel", registerNumber: "2024EC002", department: "Electronics",
    year: 3, email: "priya@college.edu", attendance: 45, internalMarks: [55, 42, 35],
    assignmentCompletion: 30, engagementScore: 25, familyIncomeRange: "Below ₹1L",
    commuteDistance: 35, internetAccess: false,
  },
  {
    id: "STU003", name: "Rahul Verma", registerNumber: "2024ME003", department: "Mechanical",
    year: 1, email: "rahul@college.edu", attendance: 68, internalMarks: [60, 55, 48],
    assignmentCompletion: 55, engagementScore: 45, familyIncomeRange: "₹1L - ₹3L",
    commuteDistance: 20, internetAccess: true,
  },
  {
    id: "STU004", name: "Sneha Iyer", registerNumber: "2024CS004", department: "Computer Science",
    year: 2, email: "sneha@college.edu", attendance: 88, internalMarks: [72, 75, 78],
    assignmentCompletion: 85, engagementScore: 80, familyIncomeRange: "₹3L - ₹5L",
    commuteDistance: 8, internetAccess: true,
  },
  {
    id: "STU005", name: "Mohammed Faiz", registerNumber: "2024CV005", department: "Civil",
    year: 3, email: "faiz@college.edu", attendance: 52, internalMarks: [40, 38, 30],
    assignmentCompletion: 35, engagementScore: 28, familyIncomeRange: "Below ₹1L",
    commuteDistance: 40, internetAccess: false,
  },
  {
    id: "STU006", name: "Ananya Reddy", registerNumber: "2024EC006", department: "Electronics",
    year: 1, email: "ananya@college.edu", attendance: 75, internalMarks: [65, 62, 58],
    assignmentCompletion: 70, engagementScore: 60, familyIncomeRange: "₹3L - ₹5L",
    commuteDistance: 12, internetAccess: true,
  },
  {
    id: "STU007", name: "Vikram Singh", registerNumber: "2024ME007", department: "Mechanical",
    year: 2, email: "vikram@college.edu", attendance: 58, internalMarks: [50, 45, 38],
    assignmentCompletion: 40, engagementScore: 35, familyIncomeRange: "₹1L - ₹3L",
    commuteDistance: 25, internetAccess: true,
  },
  {
    id: "STU008", name: "Kavya Nair", registerNumber: "2024CS008", department: "Computer Science",
    year: 3, email: "kavya@college.edu", attendance: 82, internalMarks: [70, 68, 72],
    assignmentCompletion: 78, engagementScore: 72, familyIncomeRange: "₹5L - ₹10L",
    commuteDistance: 10, internetAccess: true,
  },
  {
    id: "STU009", name: "Arjun Das", registerNumber: "2024CV009", department: "Civil",
    year: 1, email: "arjun@college.edu", attendance: 40, internalMarks: [32, 28, 25],
    assignmentCompletion: 20, engagementScore: 18, familyIncomeRange: "Below ₹1L",
    commuteDistance: 45, internetAccess: false,
  },
  {
    id: "STU010", name: "Divya Menon", registerNumber: "2024EC010", department: "Electronics",
    year: 2, email: "divya@college.edu", attendance: 72, internalMarks: [58, 60, 55],
    assignmentCompletion: 65, engagementScore: 55, familyIncomeRange: "₹3L - ₹5L",
    commuteDistance: 18, internetAccess: true,
  },
];

export const seedStudents: Student[] = rawStudents.map(s => {
  const { score, factors, explanation } = calculateRiskScore(s);
  const category = getRiskCategory(score);
  return {
    ...s,
    riskScore: score,
    riskCategory: category,
    riskFactors: factors,
    riskExplanation: explanation,
    interventions: generateInterventions(category, factors),
  };
});

// Credentials
export const CREDENTIALS = {
  admin: { username: "admin", password: "admin123" },
  students: seedStudents.map(s => ({ id: s.id, username: s.email.split("@")[0], password: "student123" })),
};
