import { useParams, useNavigate } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import RiskBadge from "@/components/RiskBadge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, BookOpen, Wallet, UserCheck, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const interventionIcons = {
  "Counseling": MessageCircle,
  "Financial Aid": Wallet,
  "Academic Support": BookOpen,
  "Mentor Assignment": UserCheck,
};

const StudentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { students, updateIntervention } = useData();
  const navigate = useNavigate();
  const student = students.find(s => s.id === id);

  if (!student) {
    return <div className="text-center py-20 text-muted-foreground">Student not found</div>;
  }

  const avgMarks = Math.round(student.internalMarks.reduce((a, b) => a + b, 0) / student.internalMarks.length);

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display">{student.name}</h1>
          <p className="text-sm text-muted-foreground">{student.registerNumber} · {student.department} · Year {student.year}</p>
        </div>
        <RiskBadge level={student.riskCategory} score={student.riskScore} size="lg" />
      </div>

      {/* Risk Score Bar */}
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-semibold mb-3">Risk Score</h3>
        <div className="h-4 rounded-full bg-muted overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-700",
              student.riskCategory === "Low" && "bg-risk-low",
              student.riskCategory === "Medium" && "bg-risk-medium",
              student.riskCategory === "High" && "bg-risk-high",
            )}
            style={{ width: `${student.riskScore}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>0 — Low</span><span>50 — Medium</span><span>100 — High</span>
        </div>
      </div>

      {/* AI Explanation */}
      <div className="rounded-xl border bg-card p-5 shadow-sm border-l-4 border-l-primary">
        <div className="flex items-start gap-3">
          <AlertTriangle className={cn(
            "h-5 w-5 mt-0.5 shrink-0",
            student.riskCategory === "High" && "text-risk-high",
            student.riskCategory === "Medium" && "text-risk-medium",
            student.riskCategory === "Low" && "text-risk-low",
          )} />
          <div>
            <h3 className="text-sm font-semibold mb-1">AI Risk Explanation</h3>
            <p className="text-sm text-muted-foreground">{student.riskExplanation}</p>
            {student.riskFactors.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {student.riskFactors.map((f, i) => (
                  <span key={i} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{f}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Attendance", value: `${student.attendance}%` },
          { label: "Avg Marks", value: avgMarks },
          { label: "Assignments", value: `${student.assignmentCompletion}%` },
          { label: "Engagement", value: `${student.engagementScore}/100` },
          { label: "Income Range", value: student.familyIncomeRange },
          { label: "Commute", value: `${student.commuteDistance} km` },
          { label: "Internet", value: student.internetAccess ? "Yes" : "No" },
          { label: "Year", value: student.year },
        ].map(item => (
          <div key={item.label} className="rounded-lg border bg-card p-3.5 shadow-sm">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-lg font-semibold mt-0.5">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Marks History */}
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-semibold mb-3">Internal Marks History</h3>
        <div className="flex items-end gap-3 h-24">
          {student.internalMarks.map((m, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-xs font-semibold">{m}</span>
              <div
                className="w-full rounded-t-md bg-primary/80 transition-all"
                style={{ height: `${(m / 100) * 80}px` }}
              />
              <span className="text-[10px] text-muted-foreground">Test {i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interventions */}
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <h3 className="text-sm font-semibold mb-4">Intervention Management</h3>
        <div className="space-y-3">
          {student.interventions.map(intervention => {
            const Icon = interventionIcons[intervention.type];
            return (
              <div key={intervention.id} className="flex items-start gap-3 rounded-lg border p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold">{intervention.type}</span>
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-medium",
                      intervention.status === "Suggested" && "bg-muted text-muted-foreground",
                      intervention.status === "In Progress" && "bg-risk-medium-bg text-risk-medium",
                      intervention.status === "Resolved" && "bg-risk-low-bg text-risk-low",
                    )}>
                      {intervention.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{intervention.description}</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  {intervention.status !== "In Progress" && (
                    <Button size="sm" variant="outline" onClick={() => updateIntervention(student.id, intervention.id, { status: "In Progress" })}>
                      Start
                    </Button>
                  )}
                  {intervention.status !== "Resolved" && (
                    <Button size="sm" variant="outline" onClick={() => updateIntervention(student.id, intervention.id, { status: "Resolved" })}>
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
          {student.interventions.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No interventions required</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
