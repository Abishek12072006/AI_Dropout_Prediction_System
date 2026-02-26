import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Landmark, ExternalLink, IndianRupee, GraduationCap, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface Scheme {
  id: string;
  name: string;
  provider: string;
  eligibility: string[];
  casteEligibility: ("General" | "OBC" | "SC" | "ST")[];
  incomeLimit?: string;
  amount: string;
  description: string;
  category: "Scholarship" | "Financial Aid" | "Fee Waiver" | "Stipend";
}

const schemes: Scheme[] = [
  {
    id: "1", name: "Post-Matric Scholarship for SC Students",
    provider: "Ministry of Social Justice & Empowerment",
    eligibility: ["Full-time students", "Annual family income < ₹2.5L"],
    casteEligibility: ["SC"], incomeLimit: "₹2.5L",
    amount: "Up to ₹1,200/month + tuition fees",
    description: "Covers tuition fees, maintenance allowance, and other non-refundable charges for SC students pursuing post-matric education.",
    category: "Scholarship",
  },
  {
    id: "2", name: "Post-Matric Scholarship for ST Students",
    provider: "Ministry of Tribal Affairs",
    eligibility: ["Full-time students", "Annual family income < ₹2.5L"],
    casteEligibility: ["ST"], incomeLimit: "₹2.5L",
    amount: "Up to ₹1,200/month + tuition fees",
    description: "Financial assistance for ST students for post-matric studies including professional and technical courses.",
    category: "Scholarship",
  },
  {
    id: "3", name: "Post-Matric Scholarship for OBC Students",
    provider: "Ministry of Social Justice & Empowerment",
    eligibility: ["Full-time students", "Annual family income < ₹1L"],
    casteEligibility: ["OBC"], incomeLimit: "₹1L",
    amount: "Up to ₹750/month + tuition fees",
    description: "Financial support for OBC students whose family income falls within the specified limit.",
    category: "Scholarship",
  },
  {
    id: "4", name: "Central Sector Scheme of Scholarships",
    provider: "Ministry of Education (MHRD)",
    eligibility: ["Top 20 percentile of board exams", "Family income < ₹8L"],
    casteEligibility: ["General", "OBC", "SC", "ST"], incomeLimit: "₹8L",
    amount: "₹10,000 - ₹20,000/year",
    description: "Merit-based scholarship for students from economically weaker sections who have scored above 80th percentile in board exams.",
    category: "Scholarship",
  },
  {
    id: "5", name: "Pragati Scholarship (for Girls)",
    provider: "AICTE",
    eligibility: ["Female students in technical education", "Family income < ₹8L"],
    casteEligibility: ["General", "OBC", "SC", "ST"], incomeLimit: "₹8L",
    amount: "₹50,000/year",
    description: "Encourages girl students to pursue technical education with a one-time grant of ₹50,000 per year.",
    category: "Scholarship",
  },
  {
    id: "6", name: "National Means-cum-Merit Scholarship",
    provider: "Ministry of Education",
    eligibility: ["Students from economically weaker sections", "Family income < ₹3.5L"],
    casteEligibility: ["General", "OBC", "SC", "ST"], incomeLimit: "₹3.5L",
    amount: "₹12,000/year",
    description: "To arrest dropout rates at secondary level and encourage meritorious students to continue studies.",
    category: "Stipend",
  },
  {
    id: "7", name: "State Government Fee Waiver",
    provider: "State Government",
    eligibility: ["Domicile of state", "Family income < ₹1L"],
    casteEligibility: ["SC", "ST"], incomeLimit: "₹1L",
    amount: "Full tuition fee waiver",
    description: "Complete waiver of tuition and examination fees for SC/ST students in state government colleges.",
    category: "Fee Waiver",
  },
  {
    id: "8", name: "Free Laptop / Tablet Scheme",
    provider: "State Government",
    eligibility: ["Students in technical courses", "Family income < ₹2L"],
    casteEligibility: ["SC", "ST", "OBC"], incomeLimit: "₹2L",
    amount: "₹25,000 (device subsidy)",
    description: "Provides laptops or tablets to meritorious students from economically weaker backgrounds to bridge the digital divide.",
    category: "Financial Aid",
  },
  {
    id: "9", name: "Prime Minister's Special Scholarship Scheme",
    provider: "Government of India",
    eligibility: ["Students from specific regions", "Merit-based"],
    casteEligibility: ["General", "OBC", "SC", "ST"],
    amount: "₹30,000 - ₹75,000/year",
    description: "Special scholarship for students from J&K and NE states pursuing higher education in other states.",
    category: "Scholarship",
  },
  {
    id: "10", name: "Indira Gandhi Single Girl Child Scholarship",
    provider: "UGC",
    eligibility: ["Single girl child", "Pursuing PG"],
    casteEligibility: ["General", "OBC", "SC", "ST"],
    amount: "₹36,200/year for 2 years",
    description: "Scholarship for single girl children who are pursuing postgraduate programs in any stream.",
    category: "Scholarship",
  },
];

const categoryColors: Record<string, string> = {
  Scholarship: "text-primary bg-primary/10",
  "Financial Aid": "text-accent bg-accent/10",
  "Fee Waiver": "text-risk-low bg-risk-low-bg",
  Stipend: "text-risk-medium bg-risk-medium-bg",
};

const GovernmentSchemes = () => {
  const { studentId } = useAuth();
  const { students } = useData();
  const student = students.find(s => s.id === studentId);

  const eligible = student
    ? schemes.filter(sc => sc.casteEligibility.includes(student.caste))
    : schemes;

  const others = student
    ? schemes.filter(sc => !sc.casteEligibility.includes(student.caste))
    : [];

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold font-display">Government Schemes & Scholarships</h1>
        <p className="text-sm text-muted-foreground">
          {student ? `Showing schemes matching your category: ${student.caste}` : "Browse available schemes"}
        </p>
      </div>

      {student && (
        <div className="glass-card rounded-xl p-4 flex items-center gap-3 border border-primary/20">
          <IndianRupee className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-semibold">Your Profile: {student.caste} category · {student.familyIncomeRange}</p>
            <p className="text-xs text-muted-foreground">{eligible.length} schemes are eligible for you</p>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Eligible Schemes ({eligible.length})
        </h2>
        <div className="space-y-3">
          {eligible.map(sc => (
            <div key={sc.id} className="rounded-xl border border-border bg-card p-5 shadow-sm hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="text-sm font-bold">{sc.name}</h3>
                  <p className="text-xs text-muted-foreground">{sc.provider}</p>
                </div>
                <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-semibold", categoryColors[sc.category])}>
                  {sc.category}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{sc.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="rounded-md bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium">{sc.amount}</span>
                {sc.incomeLimit && (
                  <span className="rounded-md bg-secondary text-muted-foreground px-2 py-0.5 text-xs">Income limit: {sc.incomeLimit}</span>
                )}
                {sc.casteEligibility.map(c => (
                  <span key={c} className="rounded-md bg-secondary text-muted-foreground px-2 py-0.5 text-xs">{c}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {sc.eligibility.map((e, i) => (
                  <span key={i} className="text-[11px] text-muted-foreground">• {e}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {others.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            Other Schemes ({others.length})
          </h2>
          <div className="space-y-3 opacity-60">
            {others.map(sc => (
              <div key={sc.id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold">{sc.name}</h3>
                    <p className="text-xs text-muted-foreground">{sc.provider} · {sc.amount}</p>
                  </div>
                  <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", categoryColors[sc.category])}>
                    {sc.category}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Eligible for: {sc.casteEligibility.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GovernmentSchemes;
