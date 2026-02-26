import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import RiskBadge from "@/components/RiskBadge";
import { AlertTriangle, TrendingDown, BookOpen, Wallet, UserCheck, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const interventionIcons = {
  "Counseling": MessageCircle,
  "Financial Aid": Wallet,
  "Academic Support": BookOpen,
  "Mentor Assignment": UserCheck,
};

const StudentRisk = () => {
  const { studentId } = useAuth();
  const { students } = useData();
  const student = students.find(s => s.id === studentId);

  if (!student) return <div className="text-center py-20 text-muted-foreground">Student not found</div>;

  return (
    <div className="space-y-6 max-w-3xl animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Risk Analysis</h1>
          <p className="text-sm text-muted-foreground">AI-powered dropout risk assessment</p>
        </div>
        <RiskBadge level={student.riskCategory} score={student.riskScore} size="lg" />
      </div>

      {/* Score bar */}
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-semibold mb-3">Risk Score: {student.riskScore} / 100</h3>
        <div className="h-5 rounded-full bg-muted overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000",
              student.riskCategory === "Low" && "bg-risk-low",
              student.riskCategory === "Medium" && "bg-risk-medium",
              student.riskCategory === "High" && "bg-risk-high",
            )}
            style={{ width: `${student.riskScore}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
          <span>0 — Low Risk</span><span>40</span><span>70</span><span>100 — High Risk</span>
        </div>
      </div>

      {/* Explanation */}
      <div className="rounded-xl border bg-card p-5 shadow-sm border-l-4 border-l-primary">
        <div className="flex items-start gap-3">
          <AlertTriangle className={cn(
            "h-5 w-5 mt-0.5 shrink-0",
            student.riskCategory === "High" && "text-risk-high",
            student.riskCategory === "Medium" && "text-risk-medium",
            student.riskCategory === "Low" && "text-risk-low",
          )} />
          <div>
            <h3 className="text-sm font-semibold mb-1">Why this risk level?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{student.riskExplanation}</p>
          </div>
        </div>
      </div>

      {/* Contributing factors */}
      {student.riskFactors.length > 0 && (
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
            Contributing Factors
          </h3>
          <div className="space-y-2">
            {student.riskFactors.map((f, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">{i + 1}</span>
                <span className="text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Interventions */}
      {student.interventions.length > 0 && (
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-3">AI-Suggested Interventions</h3>
          <div className="space-y-3">
            {student.interventions.map(intervention => {
              const Icon = interventionIcons[intervention.type];
              return (
                <div key={intervention.id} className="flex items-start gap-3 rounded-lg border p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{intervention.type}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{intervention.description}</p>
                    <span className={cn(
                      "inline-block mt-2 rounded-full px-2 py-0.5 text-[10px] font-medium",
                      intervention.status === "Suggested" && "bg-muted text-muted-foreground",
                      intervention.status === "In Progress" && "bg-risk-medium-bg text-risk-medium",
                      intervention.status === "Resolved" && "bg-risk-low-bg text-risk-low",
                    )}>
                      {intervention.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRisk;
