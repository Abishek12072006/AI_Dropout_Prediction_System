import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import StatCard from "@/components/StatCard";
import RiskBadge from "@/components/RiskBadge";
import { BookOpen, CalendarCheck, ClipboardCheck, Zap, AlertTriangle, Library } from "lucide-react";

const StudentDashboard = () => {
  const { studentId } = useAuth();
  const { students } = useData();
  const student = students.find(s => s.id === studentId);

  if (!student) return <div className="text-center py-20 text-muted-foreground">Student not found</div>;

  const avgMarks = Math.round(student.internalMarks.reduce((a, b) => a + b, 0) / student.internalMarks.length);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-display">Welcome, {student.name.split(" ")[0]}</h1>
          <p className="text-sm text-muted-foreground">{student.department} · Year {student.year}</p>
        </div>
        <RiskBadge level={student.riskCategory} score={student.riskScore} size="lg" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Attendance" value={`${student.attendance}%`} icon={<CalendarCheck className="h-5 w-5" />} variant={student.attendance < 65 ? "risk-high" : student.attendance < 80 ? "risk-medium" : "risk-low"} />
        <StatCard title="Avg Marks" value={avgMarks} icon={<BookOpen className="h-5 w-5" />} variant={avgMarks < 40 ? "risk-high" : avgMarks < 60 ? "risk-medium" : "risk-low"} />
        <StatCard title="Assignments" value={`${student.assignmentCompletion}%`} icon={<ClipboardCheck className="h-5 w-5" />} variant={student.assignmentCompletion < 50 ? "risk-high" : student.assignmentCompletion < 70 ? "risk-medium" : "risk-low"} />
        <StatCard title="Engagement" value={`${student.engagementScore}/100`} icon={<Zap className="h-5 w-5" />} variant={student.engagementScore < 40 ? "risk-high" : student.engagementScore < 60 ? "risk-medium" : "risk-low"} />
        <StatCard title="Library Usage" value={`${student.libraryUsage}/mo`} icon={<Library className="h-5 w-5" />} variant={student.libraryUsage < 2 ? "risk-high" : student.libraryUsage < 5 ? "risk-medium" : "risk-low"} />
        <StatCard title="Orientation" value={`${student.orientationAttendance}%`} icon={<CalendarCheck className="h-5 w-5" />} variant={student.orientationAttendance < 40 ? "risk-high" : student.orientationAttendance < 60 ? "risk-medium" : "risk-low"} />
      </div>

      {/* AI Risk explanation */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm border-l-4 border-l-primary animate-fade-in">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-semibold mb-1">AI Risk Analysis</h3>
            <p className="text-sm text-muted-foreground">{student.riskExplanation}</p>
          </div>
        </div>
      </div>

      {/* Marks history */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm animate-fade-in">
        <h3 className="text-sm font-semibold mb-3">Internal Marks Trend</h3>
        <div className="flex items-end gap-4 h-28">
          {student.internalMarks.map((m, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-sm font-bold">{m}</span>
              <div className="w-full rounded-t-md bg-primary/60 transition-all" style={{ height: `${(m / 100) * 100}px` }} />
              <span className="text-xs text-muted-foreground">Test {i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interventions */}
      {student.interventions.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm animate-fade-in">
          <h3 className="text-sm font-semibold mb-3">Recommended Interventions</h3>
          <div className="space-y-2">
            {student.interventions.map(i => (
              <div key={i.id} className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary text-xs font-bold">
                  {i.type[0]}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{i.type}</p>
                  <p className="text-xs text-muted-foreground">{i.description}</p>
                </div>
                <span className="text-xs font-medium text-muted-foreground">{i.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
