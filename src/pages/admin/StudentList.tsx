import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { useNavigate } from "react-router-dom";
import RiskBadge from "@/components/RiskBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const StudentList = () => {
  const { students } = useData();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterRisk, setFilterRisk] = useState<"All" | "Low" | "Medium" | "High">("All");

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.registerNumber.toLowerCase().includes(search.toLowerCase());
    const matchRisk = filterRisk === "All" || s.riskCategory === filterRisk;
    return matchSearch && matchRisk;
  });

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold font-display">Student Directory</h1>
        <p className="text-sm text-muted-foreground">Browse and filter students by risk level</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or register number..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {(["All", "High", "Medium", "Low"] as const).map(level => (
            <Button
              key={level}
              variant={filterRisk === level ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterRisk(level)}
              className={cn(
                filterRisk === level && level === "High" && "bg-risk-high hover:bg-risk-high/90",
                filterRisk === level && level === "Medium" && "bg-risk-medium hover:bg-risk-medium/90",
                filterRisk === level && level === "Low" && "bg-risk-low hover:bg-risk-low/90",
                filterRisk === level && level !== "All" && "text-primary-foreground border-transparent",
              )}
            >
              {level}
            </Button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-left text-muted-foreground">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Register No.</th>
                <th className="px-5 py-3 font-medium">Department</th>
                <th className="px-5 py-3 font-medium">Year</th>
                <th className="px-5 py-3 font-medium">Attendance</th>
                <th className="px-5 py-3 font-medium">Risk Score</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((s, i) => (
                <tr key={s.id} className="hover:bg-muted/30 transition-colors" style={{ animationDelay: `${i * 50}ms` }}>
                  <td className="px-5 py-3.5 font-medium">{s.name}</td>
                  <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">{s.registerNumber}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{s.department}</td>
                  <td className="px-5 py-3.5">{s.year}</td>
                  <td className="px-5 py-3.5">{s.attendance}%</td>
                  <td className="px-5 py-3.5 font-semibold">{s.riskScore}</td>
                  <td className="px-5 py-3.5"><RiskBadge level={s.riskCategory} size="sm" /></td>
                  <td className="px-5 py-3.5">
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/admin/students/${s.id}`)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-5 py-8 text-center text-muted-foreground">No students found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
