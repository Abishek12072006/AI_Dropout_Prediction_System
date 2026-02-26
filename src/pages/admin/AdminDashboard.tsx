import { useData } from "@/contexts/DataContext";
import StatCard from "@/components/StatCard";
import RiskBadge from "@/components/RiskBadge";
import { Users, AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const AdminDashboard = () => {
  const { students } = useData();

  const high = students.filter(s => s.riskCategory === "High").length;
  const medium = students.filter(s => s.riskCategory === "Medium").length;
  const low = students.filter(s => s.riskCategory === "Low").length;

  const pieData = [
    { name: "Low Risk", value: low, color: "hsl(152, 60%, 48%)" },
    { name: "Medium Risk", value: medium, color: "hsl(38, 92%, 55%)" },
    { name: "High Risk", value: high, color: "hsl(0, 72%, 55%)" },
  ];

  const deptData = Array.from(
    students.reduce((acc, s) => {
      if (!acc.has(s.department)) acc.set(s.department, { dept: s.department, high: 0, medium: 0, low: 0 });
      const d = acc.get(s.department)!;
      if (s.riskCategory === "High") d.high++;
      else if (s.riskCategory === "Medium") d.medium++;
      else d.low++;
      return acc;
    }, new Map<string, { dept: string; high: number; medium: number; low: number }>())
  ).map(([, v]) => v);

  const topRisk = [...students].sort((a, b) => b.riskScore - a.riskScore).slice(0, 5);

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold font-display">Proactive Guard</h1>
        <p className="text-sm text-muted-foreground">Admin analytics overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={students.length} icon={<Users className="h-5 w-5" />} variant="primary" />
        <StatCard title="High Risk" value={high} subtitle="Immediate attention needed" icon={<AlertTriangle className="h-5 w-5" />} variant="risk-high" />
        <StatCard title="Medium Risk" value={medium} subtitle="Monitor closely" icon={<AlertCircle className="h-5 w-5" />} variant="risk-medium" />
        <StatCard title="Low Risk" value={low} subtitle="On track" icon={<CheckCircle className="h-5 w-5" />} variant="risk-low" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm animate-fade-in">
          <h3 className="text-sm font-semibold mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={3}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(228, 24%, 12%)", border: "1px solid hsl(228, 18%, 18%)", borderRadius: "8px", color: "hsl(220, 20%, 92%)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                {d.name} ({d.value})
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm animate-fade-in">
          <h3 className="text-sm font-semibold mb-4">Risk by Department</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={deptData}>
              <XAxis dataKey="dept" tick={{ fontSize: 11, fill: "hsl(220, 12%, 55%)" }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "hsl(220, 12%, 55%)" }} />
              <Tooltip contentStyle={{ background: "hsl(228, 24%, 12%)", border: "1px solid hsl(228, 18%, 18%)", borderRadius: "8px", color: "hsl(220, 20%, 92%)" }} />
              <Bar dataKey="low" stackId="a" fill="hsl(152, 60%, 48%)" name="Low" />
              <Bar dataKey="medium" stackId="a" fill="hsl(38, 92%, 55%)" name="Medium" />
              <Bar dataKey="high" stackId="a" fill="hsl(0, 72%, 55%)" radius={[4, 4, 0, 0]} name="High" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top at-risk students */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm animate-fade-in">
        <h3 className="text-sm font-semibold mb-4">Top At-Risk Students</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Department</th>
                <th className="pb-2 font-medium">Attendance</th>
                <th className="pb-2 font-medium">Library</th>
                <th className="pb-2 font-medium">Risk Score</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {topRisk.map(s => (
                <tr key={s.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="py-3 font-medium">{s.name}</td>
                  <td className="py-3 text-muted-foreground">{s.department}</td>
                  <td className="py-3">{s.attendance}%</td>
                  <td className="py-3 text-muted-foreground">{s.libraryUsage}/mo</td>
                  <td className="py-3 font-semibold">{s.riskScore}</td>
                  <td className="py-3"><RiskBadge level={s.riskCategory} size="sm" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
